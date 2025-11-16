import { ForbiddenException, Injectable } from "@nestjs/common";

import { Prisma } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { SectionResponseDto, SectionsListResponseDto } from "./dto/response/section-response.dto";

@Injectable()
export class SectionService {
  constructor(private db: DatabaseService) {}

  async create(userId: string, dto: CreateSectionDto) {
    const { name, projectId, insertAt } = dto;

    const project = await this.ensureUserCanAccessProject(projectId, userId);
    const section = await this.db.section.create({
      data: { name, projectId },
    });

    const currentList = JSON.parse(project.listOfSection);
    if (insertAt !== undefined && insertAt >= 0 && insertAt <= currentList.length) {
      currentList.splice(insertAt, 0, section.id);
    } else {
      currentList.push(section.id);
    }

    await this.db.project.update({
      where: { id: projectId },
      data: { listOfSection: JSON.stringify(currentList) },
    });

    return new SectionResponseDto({ ...section, tasksOfSection: [] }, "Section created successfully");
  }

  async getAllSectionsInProject(userId: string, projectId: string) {
    const project = await this.ensureUserCanAccessProject(projectId, userId);

    const sections = await this.db.section.findMany({
      where: {
        projectId,
      },
      include: {
        tasksOfSection: {
          include: {
            task: {
              include: {
                assignees: {
                  include: {
                    user: true,
                  },
                },
                supervisor: true,
                subtasks: {
                  include: {
                    assignees: {
                      include: {
                        user: true,
                      },
                    },
                    supervisor: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const sectionMap = new Map(sections.map((section) => [section.id, section]));
    const sectionIds = JSON.parse(project.listOfSection) as string[];
    const orderedSections = sectionIds.map((id) => sectionMap.get(id)).filter((task) => task !== undefined);

    return new SectionsListResponseDto(
      orderedSections,
      0,
      sections.length,
      sections.length,
      "Sections retrieved successfully",
    );
  }

  async update(userId: string, sectionId: string, dto: UpdateSectionDto) {
    const section = await this.db.section.findUnique({
      where: {
        id: sectionId,
        projectId: dto.projectId,
        project: {
          OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
        },
      },
    });

    if (!section) {
      throw new ForbiddenException("Section not found or does not belong to the project");
    }

    const updatedProject = await this.db.section.update({
      where: { id: sectionId },
      data: {
        name: dto.name,
      },
      include: {
        tasksOfSection: {
          include: {
            task: {
              include: {
                assignees: {
                  include: {
                    user: true,
                  },
                },
                supervisor: true,
                subtasks: {
                  include: {
                    assignees: {
                      include: {
                        user: true,
                      },
                    },
                    supervisor: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return new SectionResponseDto(updatedProject, "Section updated successfully");
  }

  async remove(userId: string, projectId: string, sectionId: string) {
    const section = await this.db.section.findUnique({
      where: {
        id: sectionId,
        projectId,
        project: {
          OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
        },
      },
    });

    if (!section) {
      throw new ForbiddenException("Section not found or does not belong to the project");
    }

    await this.db.section.delete({
      where: { id: sectionId },
    });

    return new MessageResponseDto("Section deleted successfully");
  }

  private async ensureUserCanAccessProject(projectId: string, userId: string, select?: Prisma.ProjectSelect) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
      },
      select: {
        id: true,
        listOfSection: true,
        ...select,
      },
    });

    if (!project) throw new ForbiddenException("Project not found or you don't have access");

    return project;
  }
}
