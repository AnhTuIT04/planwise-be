import { ForbiddenException, Injectable } from "@nestjs/common";

import { midpoint } from "@/common/utils/positioning.utils";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PgService } from "~/database/pg.service";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { MoveSectionDto } from "./dto/request/move-section.dto";
import { buildGetSectionQuery } from "./query/get-section.query";
import { buildGetSectionTasksFilter, GetSectionTasksQueryResult } from "./query/get-section-tasks.query";
import { buildGetTaskQuery, GetTaskQueryResult } from "../task/query/get-task.query";
import { GetSectionTasksQueryDto } from "./dto/request/get-section-tasks-query.dto";
import { SectionResponse } from "./dto/response/section-response.dto";
import { SectionTasksResponse } from "./dto/response/section-tasks-response.dto";

@Injectable()
export class SectionService {
  constructor(private pg: PgService) {}

  async create(userId: string, dto: CreateSectionDto) {
    const project = await this.pg.project.findFirst({
      where: {
        id: dto.projectId,
        members: { some: { userId } },
      },
      select: {
        sections: {
          orderBy: { position: "asc" },
          select: { id: true, position: true },
        },
      },
    });

    if (!project) throw new ForbiddenException("Project not found or you do not have access");

    let position: string;
    if (project.sections.length === 0) {
      position = midpoint(null, null);
    } else if (dto.insertAt === undefined || dto.insertAt >= project.sections.length) {
      position = midpoint(project.sections[project.sections.length - 1].position, null);
    } else if (dto.insertAt === 0) {
      position = midpoint(null, project.sections[0].position);
    } else {
      position = midpoint(project.sections[dto.insertAt - 1].position, project.sections[dto.insertAt].position);
    }

    const section = await this.pg.section.create({
      data: {
        name: dto.name,
        projectId: dto.projectId,
        position,
      },
      ...buildGetSectionQuery(),
    });

    return new SectionResponse(section, "Section created successfully");
  }

  async getSectionTasks(userId: string, sectionId: string, dto: GetSectionTasksQueryDto) {
    const section = await this.pg.section.findFirst({
      where: {
        id: sectionId,
        project: {
          members: { some: { userId } },
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    const filter = buildGetSectionTasksFilter({
      qDeadlineFrom: dto.deadlineFrom,
      qDeadlineTo: dto.deadlineTo,
      qStatuses: dto.statuses,
      qPriorities: dto.priorities,
      searchQuery: dto.q,
    });

    const [tasks, totalItems] = await this.pg.$transaction([
      this.pg.taskSection.findMany({
        where: {
          sectionId,
          task: filter,
        },
        orderBy: { position: "asc" },
        include: {
          task: buildGetTaskQuery(),
        },
        skip: (dto.page - 1) * dto.limit,
        take: dto.limit,
      }),
      this.pg.taskSection.count({
        where: {
          sectionId,
          task: filter,
        },
      }),
    ]);

    const tasksInWorkspace = await this.pg.taskProject.findMany({
      where: {
        project: {
          ownerId: userId,
          isPersonal: true,
        },
      },
      select: { taskId: true },
    });

    const taskIdsInWorkspace = tasksInWorkspace.map((tp) => tp.taskId);

    const tasksInSection: GetTaskQueryResult[] = tasks.map((task) => {
      const originalProject = task.task.originalProject;
      const canImport =
        !task.task.originalProject.isPersonal &&
        (task.task.supervisorId === userId || task.task.assignees.some((a) => a.user.id === userId));
      const isImported = taskIdsInWorkspace.includes(task.task.id);
      return { ...task.task, originalProject, canImport, isImported };
    });

    const sectionWithTasks: GetSectionTasksQueryResult = {
      ...section,
      _count: {
        tasks: totalItems,
      },
      tasks: {
        data: tasksInSection,
        pagination: {
          page: 1,
          limit: tasksInSection.length,
        },
      },
    };

    return new SectionTasksResponse(sectionWithTasks, "Section tasks retrieved successfully");
  }

  async update(userId: string, sectionId: string, dto: UpdateSectionDto) {
    const section = await this.pg.section.findFirst({
      where: {
        id: sectionId,
        project: {
          members: { some: { userId } },
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    const updatedProject = await this.pg.section.update({
      where: { id: sectionId },
      data: {
        name: dto.name,
      },
      ...buildGetSectionQuery(),
    });

    return new SectionResponse(updatedProject, "Section updated successfully");
  }

  async moveSection(userId: string, sectionId: string, dto: MoveSectionDto) {
    const section = await this.pg.section.findFirst({
      where: {
        id: sectionId,
        project: {
          members: { some: { userId } },
        },
      },
      select: {
        project: {
          select: {
            sections: {
              orderBy: { position: "asc" },
              select: { id: true, position: true },
            },
          },
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    const sections = section.project.sections.filter((sec) => sec.id !== sectionId);

    let newPosition: string;
    if (sections.length === 0) {
      newPosition = midpoint(null, null);
    } else if (dto.moveTo === 0) {
      newPosition = midpoint(null, sections[0].position);
    } else if (dto.moveTo >= sections.length) {
      newPosition = midpoint(sections[sections.length - 1].position, null);
    } else {
      newPosition = midpoint(sections[dto.moveTo - 1].position, sections[dto.moveTo].position);
    }

    const movedSection = await this.pg.section.update({
      where: { id: sectionId },
      data: {
        position: newPosition,
      },
      ...buildGetSectionQuery(),
    });

    return new SectionResponse(movedSection, "Section moved successfully");
  }

  async remove(userId: string, sectionId: string) {
    const section = await this.pg.section.findUnique({
      where: {
        id: sectionId,
        project: {
          members: { some: { userId } },
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    await this.pg.section.delete({
      where: { id: sectionId },
    });

    return new MessageOnlyResponse("Section deleted successfully");
  }
}
