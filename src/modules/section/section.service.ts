import { ForbiddenException, Injectable } from "@nestjs/common";

import { midpoint } from "@/common/utils";
import { PgService } from "@/modules/database/pg.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { GetProjectTasksQueryDto } from "@/modules/project/dto/request/query/get-project-tasks-query.dto";
import { TasksListResponseDto } from "@/modules/task/dto/response/task-response.dto";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { MoveSectionDto } from "./dto/request/move-section.dto";
import { buildGetSectionQuery } from "./query/get-section.query";
import { buildGetTaskQuery, GetTaskQueryResult } from "../task/query/get-task.query";
import { SectionResponseDto } from "./dto/response/section-response.dto";
import { PermissionChecker } from "@/middleware/permission-checker.service";
import { Permission } from "@/common/enum/permission.enum";

@Injectable()
export class SectionService {
  constructor(
    private pg: PgService,
    private readonly permissionChecker: PermissionChecker,
  ) {}

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
    await this.permissionChecker.requirePermission({ userId, projectId: dto.projectId }, Permission.SECTION_CREATE);
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

    return new SectionResponseDto(section, "Section created successfully");
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
    await this.permissionChecker.requirePermission({ userId, projectId: section.projectId }, Permission.SECTION_UPDATE);
    const updatedProject = await this.pg.section.update({
      where: { id: sectionId },
      data: {
        name: dto.name,
      },
      ...buildGetSectionQuery(),
    });

    return new SectionResponseDto(updatedProject, "Section updated successfully");
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

    return new SectionResponseDto(movedSection, "Section moved successfully");
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
    await this.permissionChecker.requirePermission({ userId, projectId: section.projectId }, Permission.SECTION_DELETE);

    await this.pg.section.delete({
      where: { id: sectionId },
    });

    return new MessageResponseDto("Section deleted successfully");
  }

  async getSectionTasks(userId: string, sectionId: string, dto: GetProjectTasksQueryDto) {
    const section = await this.pg.section.findFirst({
      where: {
        id: sectionId,
        project: {
          members: { some: { userId } },
        },
      },
      select: {
        projectId: true,
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    await this.permissionChecker.requirePermission({ userId, projectId: section.projectId }, Permission.TASK_READ);

    const tasks = await this.pg.taskSection.findMany({
      where: {
        sectionId,
        task: {
          ...(dto.deadlineFrom && { deadline: { gte: dto.deadlineFrom } }),
          ...(dto.deadlineTo && { deadline: { lte: dto.deadlineTo } }),
          ...(dto.sections && dto.sections.length > 0 && { sectionId: { in: dto.sections } }),
          ...(dto.statuses && dto.statuses.length > 0 && { status: { in: dto.statuses } }),
          ...(dto.priorities && dto.priorities.length > 0 && { priority: { in: dto.priorities } }),
          ...(dto.q && {
            OR: [
              { title: { contains: dto.q, mode: "insensitive" } },
              { description: { contains: dto.q, mode: "insensitive" } },
            ],
          }),
        },
      },
      orderBy: { position: "asc" },
      include: {
        task: buildGetTaskQuery(),
      },
    });

    const tasksInWorkspace = await this.pg.taskProject.findMany({
      where: {
        project: {
          ownerId: userId,
          isPersonal: true,
        },
      },
      select: { taskId: true },
    });

    const projectId = section.projectId;
    const taskIdsInWorkspace = tasksInWorkspace.map((tp) => tp.taskId);

    const tasksInSection: GetTaskQueryResult[] = tasks.map((task) => {
      const originalProject = task.task.originalProjectId === projectId ? null : task.task.originalProject;
      const canImport =
        !task.task.originalProject.isPersonal &&
        (task.task.supervisorId === userId || task.task.assignees.some((a) => a.user.id === userId));
      const isImported = taskIdsInWorkspace.includes(task.task.id);
      return { ...task.task, originalProject, canImport, isImported };
    });

    return new TasksListResponseDto(
      tasksInSection,
      0,
      tasks.length,
      tasks.length,
      "Tasks in the section retrieved successfully",
    );
  }
}
