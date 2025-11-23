import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { SectionsListResponseDto } from "@/modules/section/dto/response/section-response.dto";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { ProjectResponseDto, ProjectsListResponseDto } from "./dto/response/project-response.dto";
import { buildGetProjectQuery } from "./query/get-project.query";

@Injectable()
export class ProjectService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const project = await this.db.$transaction(async (tx) => {
      const newProject = await this.db.project.create({
        data: {
          ownerId: userId,
          ...createProjectDto,
          roles: {
            create: [
              {
                name: DefaultRole.OWNER,
                isDefault: true,
                listOfPermission: JSON.stringify(["ALL"]),
              },
              {
                name: DefaultRole.MEMBER,
                isDefault: true,
                listOfPermission: JSON.stringify(["ALL"]),
              },
            ],
          },
        },
        select: {
          id: true,
          sections: true,
          roles: true,
        },
      });

      return await this.db.project.update({
        where: { id: newProject.id },
        data: {
          memberships: {
            create: {
              userId,
              roleId: newProject.roles.find((role) => role.name === DefaultRole.OWNER)!.id,
            },
          },
        },
        ...buildGetProjectQuery({
          getArchivedTasks: false,
        }),
      });
    });

    return new ProjectResponseDto(project, "Project created successfully");
  }

  // For project listing page - not done yet
  async getAllProjects(userId: string) {
    const projects = await this.db.project.findMany({
      where: {
        isPersonal: false,
        memberships: { some: { userId } },
      },
      ...buildGetProjectQuery({
        getArchivedTasks: false,
      }),
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
      ...buildGetProjectQuery({
        getArchivedTasks: false,
      }),
    });

    if (!project) {
      project = await this.createPersonalProjectForUser(userId);
    }

    return new ProjectResponseDto(project, "Personal project retrieved successfully");
  }

  async getPersonalProjectSections(userId: string) {
    let project = await this.db.project.findFirst({
      where: { ownerId: userId, isPersonal: true },
      ...buildGetProjectQuery({
        getArchivedTasks: false,
      }),
    });

    if (!project) {
      project = await this.createPersonalProjectForUser(userId);
    }

    return new SectionsListResponseDto(
      project.sections,
      0,
      project.sections.length,
      project.sections.length,
      "Sections of personal project retrieved successfully",
    );
  }

  // For project detail page (includes sections + tasks)
  async getDetailedProject(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        memberships: { some: { userId } },
      },
      ...buildGetProjectQuery({
        getArchivedTasks: false,
      }),
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new ProjectResponseDto(project, "Detailed project retrieved successfully");
  }

  async getProjectSections(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        memberships: { some: { userId } },
      },
      ...buildGetProjectQuery({
        getArchivedTasks: false,
      }),
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new SectionsListResponseDto(
      project.sections,
      0,
      project.sections.length,
      project.sections.length,
      "Sections of the project retrieved successfully",
    );
  }

  async update(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        memberships: { some: { userId: userId } },
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
      ...buildGetProjectQuery({
        getArchivedTasks: false,
      }),
    });

    return new ProjectResponseDto(updatedProject, "Project updated successfully");
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

  private async createPersonalProjectForUser(userId: string) {
    return this.db.$transaction(async (tx) => {
      const newProject = await this.db.project.create({
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
          roles: {
            create: [
              {
                name: DefaultRole.OWNER,
                isDefault: true,
                listOfPermission: JSON.stringify(["ALL"]),
              },
              {
                name: DefaultRole.MEMBER,
                isDefault: true,
                listOfPermission: JSON.stringify(["ALL"]),
              },
            ],
          },
        },
        select: {
          id: true,
          sections: true,
          roles: true,
        },
      });

      return await this.db.project.update({
        where: { id: newProject.id },
        data: {
          listOfSection: JSON.stringify(newProject.sections.map((section) => section.id)),
          memberships: {
            create: {
              userId,
              roleId: newProject.roles.find((role) => role.name === DefaultRole.OWNER)!.id,
            },
          },
        },
        ...buildGetProjectQuery({
          getArchivedTasks: false,
        }),
      });
    });
  }
}
