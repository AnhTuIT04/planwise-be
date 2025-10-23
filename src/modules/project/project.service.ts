import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectResponseDto, CreateProjectDto, UpdateProjectDto, DetailedProjectResponseDto } from "./dto";
import { DatabaseService } from "../database/database.service";
import { SectionService } from "../section/section.service";

@Injectable()
export class ProjectService {
  constructor(
    private readonly db: DatabaseService,
    private readonly sectionService: SectionService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const newProject = await this.db.project.create({
      data: { ...createProjectDto, owner: userId },
    });
    return newProject;
  }

  update(projectId: string, updateProjectDto: UpdateProjectDto) {
    return this.db.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });
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

  // FE: my-tasks page
  // Get user's personal project (create if doesn't exist)
  async getPersonalProject(userId: string): Promise<DetailedProjectResponseDto> {
    let project = await this.db.project.findFirst({
      where: { owner: userId, isPersonal: true },
    });

    if (!project) {
      // Auto-create personal project with section
      project = await this.db.project.create({
        data: {
          name: "My Tasks",
          isPersonal: true,
          owner: userId,
          sections: {
            create: {
              name: "Default",
            },
          },
        },
      });
    }

    // Get sections with tasks using existing section service
    const sections = await this.sectionService.getDetailedSectionsByProject(project.id, userId);

    return {
      ...project,
      listOfSection: project.listOfSection,
      sections: sections,
      taskCount: sections.reduce((total, section) => total + section.tasks.length, 0),
    };
  }

  // For project listing page - not done yet
  async getAllProjects(userId: string): Promise<ProjectResponseDto[]> {
    const projects = await this.db.project.findMany({
      where: { owner: userId },
      include: {
        _count: {
          select: {
            sections: true,
            tasks: true,
          },
        },
      },
    });

    return projects.map((project) => ({
      ...project,
      listOfSection: project.listOfSection,
      sectionCount: project._count.sections,
      taskCount: project._count.tasks,
    }));
  }

  // For project detail page (includes sections + tasks)
  async getDetailedProject(projectId: string, userId: string): Promise<DetailedProjectResponseDto> {
    const project = await this.db.project.findUnique({
      where: { id: projectId },
      include: {
        own: {
          select: { id: true, email: true, name: true, avatarUrl: true },
        },
      },
    });

    if (!project) throw new NotFoundException("Project not found");

    // Get sections with tasks using existing section service
    const sections = await this.sectionService.getDetailedSectionsByProject(projectId, userId);

    return {
      ...project,
      listOfSection: project.listOfSection,
      sections: sections,
      taskCount: sections.reduce((total, section) => total + section.tasks.length, 0),
    };
  }
}
