import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectResponseDto, CreateProjectDto, UpdateProjectDto, DetailedProjectResponseDto } from "./dto";
import { DatabaseService } from "../database/database.service";
import { SectionService } from "../section/section.service";
import { Project, Section } from "prisma/client";
@Injectable()
export class ProjectService {
  constructor(
    private readonly db: DatabaseService,
    private readonly sectionService: SectionService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<DetailedProjectResponseDto> {
    const newProject = await this.db.project.create({
      data: { ...createProjectDto, ownerId: userId },
    });
    return { // returning empty sections and taskCount as 0 for newly created project
      ...newProject,
      sections: [],
      taskCount: 0,
    };
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.db.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException("Project not found");
    this.db.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });

    return {
      success: true,
      message: "Project updated successfully",
    }
  }

  async remove(projectId: string, userId: string) {
    const project = await this.db.project.findUnique({
      where: { id: projectId },
      include: {
        sections: true,
      },
    });

    if (!project) throw new NotFoundException("Project not found");
    if (project.isPersonal === true) throw new Error("Cannot delete personal project");
    if (project.sections.length > 0) throw new Error("Cannot delete project with existing sections");

    return this.db.project.delete({
      where: { id: projectId },
    });
  }

  // For project listing page - not done yet
  async getAllProjects(userId: string): Promise<ProjectResponseDto[]> {
    const projects = await this.db.project.findMany({
      where: {
        isPersonal: false,
        memberships: {
          some: { userId: userId }, // user is a member of the project
        },
      },
      include: {
        _count: {
          select: { sections: true, memberships: true }, // number of sections
        },
        sections: {
          select: { _count: { select: { tasksOfSection: true } } }, // number of tasks in each section
        },
        owner: {
          select: { id: true, email: true, fullname: true, avatarUrl: true },
        },
      }
    });

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      logoUrl: project.logoUrl,
      createdAt: project.createdAt,
      owner: project.owner,
      sectionCount: project._count.sections,
      taskCount: project.sections.reduce((total, section) => total + section._count.tasksOfSection, 0),
      memberCount: project._count.memberships,
    }));
  }

  // FE: my-tasks page
  // Get user's personal project
  async getPersonalProject(userId: string): Promise<DetailedProjectResponseDto> {
    let project = await this.db.project.findFirst({
      where: { ownerId: userId, isPersonal: true },
      include: {
        sections: true
      }
    });

    if (!project) {
      throw new NotFoundException("Personal project not found");
    }

    const sections = await this.sectionService.getDetailedSectionsByProject(project.id, userId);

    return {
      ...project,
      listOfSection: project.listOfSection,
      sections: sections,
      taskCount: sections.reduce((total, section) => total + section.tasks.length, 0),
    };
  }

  // For project detail page (includes sections + tasks)
  async getDetailedProject(projectId: string, userId: string): Promise<DetailedProjectResponseDto> {
    const project = await this.db.project.findUnique({
      where: { id: projectId },
      include: {
        sections: true
      },
    });

    if (!project) throw new NotFoundException("Project not found");

    // Get sections with tasks using existing section service
    const sections = await this.sectionService.getDetailedSectionsByProject(project.id, userId);

    return {
      ...project,
      listOfSection: project.listOfSection,
      sections: sections,
      taskCount: sections.reduce((total, section) => total + section.tasks.length, 0),
    };
  }
  async createPersonalProjectForUser(
    userId: string,
  ): Promise<{ project: Project; defaultSection: Section }> {
    const prisma = this.db;

    const project = await prisma.project.create({
      data: {
        name: "My Workspace",
        isPersonal: true,
        ownerId: userId,
        listOfSection: JSON.stringify([]),
      },
    });

    const defaultSection = await prisma.section.create({
      data: {
        name: "Default",
        projectId: project.id,
        listOfTask: JSON.stringify([]),
      },
    });

    await prisma.project.update({
      where: { id: project.id },
      data: {
        listOfSection: JSON.stringify([defaultSection.id]),
      },
    });

    return { project, defaultSection };
  }
}
