import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { ProjectResponseDto, ProjectsListResponseDto } from "./dto/response/project-response.dto";

@Injectable()
export class ProjectService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const newProject = await this.db.project.create({
      data: { ...createProjectDto, ownerId: userId },
      include: {
        owner: true,
      },
    });

    // TODO: fix role later
    return new ProjectResponseDto({ ...newProject, memberships: [], sections: [] }, "Project created successfully");
  }

  // For project listing page - not done yet
  async getAllProjects(userId: string) {
    const projects = await this.db.project.findMany({
      where: {
        isPersonal: false,
        OR: [
          {
            ownerId: userId,
          },
          {
            memberships: { some: { userId: userId } },
          },
        ],
      },
      include: {
        memberships: {
          include: { user: true },
        },
        owner: true,
        sections: true,
      },
    });

    // TODO: Add pagination later
    return new ProjectsListResponseDto(
      projects,
      0,
      projects.length,
      projects.length,
      "Projects retrieved successfully",
    );
  }

  // Get user's personal project
  async getPersonalProject(userId: string) {
    let project = await this.db.project.findFirst({
      where: { ownerId: userId, isPersonal: true },
      include: {
        memberships: {
          include: { user: true },
        },
        owner: true,
        sections: true,
      },
    });

    if (!project) {
      project = await this.db.project.create({
        data: {
          name: "My Workspace",
          isPersonal: true,
          ownerId: userId,
          sections: {
            create: [
              {
                name: "Default",
              },
            ],
          },
        },
        include: {
          memberships: {
            include: { user: true },
          },
          owner: true,
          sections: true,
        },
      });

      await this.db.project.update({
        where: { id: project.id },
        data: {
          listOfSection: JSON.stringify(project.sections.map((s) => s.id)),
        },
      });

      project.listOfSection = JSON.stringify(project.sections.map((s) => s.id));
    }

    return new ProjectResponseDto(project, "Personal project retrieved successfully");
  }

  // For project detail page (includes sections + tasks)
  async getDetailedProject(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        OR: [
          {
            ownerId: userId,
          },
          {
            memberships: { some: { userId: userId } },
          },
        ],
      },
      include: {
        memberships: {
          include: { user: true },
        },
        owner: true,
        sections: true,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new ProjectResponseDto(project, "Detailed project retrieved successfully");
  }

  async update(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    let project = await this.db.project.findFirst({
      where: {
        id: projectId,
        OR: [
          {
            ownerId: userId,
          },
          {
            memberships: { some: { userId: userId } },
          },
        ],
      },
      include: {
        memberships: {
          include: { user: true },
        },
        owner: true,
        sections: true,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");
    if (project.isPersonal === true) throw new ForbiddenException("Cannot update personal project");

    const updatedProject = await this.db.project.update({
      where: { id: projectId },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
        logoUrl: updateProjectDto.logoUrl,
        listOfSection: updateProjectDto.listOfSection
          ? JSON.stringify(updateProjectDto.listOfSection)
          : project.listOfSection,
      },
    });

    return new ProjectResponseDto({ ...project, ...updatedProject }, "Project updated successfully");
  }

  async remove(userId: string, projectId: string) {
    // TODO: check role later
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
      include: {
        sections: true,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");
    if (project.isPersonal === true) throw new ForbiddenException("Cannot delete personal project");
    if (project.sections.length > 0) throw new ForbiddenException("Cannot delete project with existing sections");

    await this.db.project.delete({
      where: { id: projectId },
    });

    return new MessageResponseDto("Project deleted successfully");
  }
}
