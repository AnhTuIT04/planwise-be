import { BadRequestException, Injectable } from "@nestjs/common";

import { TaskStatus } from "prisma/client/pg";
import { midpoint } from "@/common/utils/positioning.utils";
import { PgService } from "~/database/pg.service";
import { buildGetTaskQuery, GetTaskQueryResult } from "~/task/query/get-task.query";
import { UpdateTaskStatusDto } from "~/task/dto/request/update-task-status.dto";
import { TaskResponse } from "~/task/dto/response/task-response.dto";
import { buildGetSubtaskQuery } from "./query/get-subtask.query";
import { changeSubtaskStatus } from "./utils/change-status";
import { CreateSubtaskDto } from "./dto/request/create-subtask.dto";
import { UpdateSubtaskDto } from "./dto/request/update-subtask.dto";
import { MoveSubtaskDto } from "./dto/request/move-subtask.dto";
import { UpdateSubtaskAssigneesDto } from "./dto/request/update-subtask-assignees.dto";

@Injectable()
export class SubtaskService {
  constructor(private pg: PgService) {}

  private async queryTaskHelper(userId: string, task: Omit<GetTaskQueryResult, "canImport" | "isImported">) {
    const taskInWorkspace = await this.pg.taskProject.findFirst({
      where: {
        taskId: task.id,
        project: {
          ownerId: userId,
          isPersonal: true,
        },
      },
    });

    const originalProject = task.originalProject;
    const canImport =
      !task.originalProject?.isPersonal &&
      (task.supervisorId === userId || task.assignees.some((a) => a.user.id === userId));
    const isImported = !!taskInWorkspace;
    return { originalProject, canImport, isImported };
  }

  async create(userId: string, createSubtaskDto: CreateSubtaskDto) {
    const { parentTaskId, ...data } = createSubtaskDto;
    const parentTask = await this.pg.task.findFirst({
      where: {
        id: parentTaskId,
        projects: {
          some: {
            project: {
              members: { some: { userId } },
            },
          },
        },
      },
      include: {
        assignees: true,
        subtasks: {
          include: { assignees: true },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!parentTask) {
      throw new Error("Parent task not found or you do not have permission to access it");
    }

    // Calculate position in section
    const positions: string[] = parentTask.subtasks.map((t) => t.position);
    let position: string;
    if (positions.length === 0) {
      position = midpoint(null, null);
    } else if (data.insertAt === undefined || data.insertAt >= positions.length) {
      position = midpoint(positions[positions.length - 1], null);
    } else if (data.insertAt === 0) {
      position = midpoint(null, positions[0]);
    } else {
      position = midpoint(positions[data.insertAt - 1], positions[data.insertAt]);
    }

    const subtaskAssigneeIds = new Set(data.assigneeIds);
    const currentParentAssigneeIds =
      parentTask.subtasks.length === 0
        ? subtaskAssigneeIds
        : parentTask.subtasks.reduce((acc, sub) => {
            sub.assignees.forEach((assignee) => acc.add(assignee.userId));
            return acc;
          }, new Set<string>());

    const task = await this.pg.$transaction(
      async (tx) => {
        await tx.subtask.create({
          data: {
            parentTaskId: parentTask.id,
            position,
            title: data.title,
            estimate: data.estimate,
            assignees: {
              create: Array.from(subtaskAssigneeIds).map((userId) => ({ userId })),
            },
          },
        });

        return tx.task.update({
          where: { id: parentTask.id },
          data: {
            status: parentTask.status === TaskStatus.DONE ? TaskStatus.TODO : parentTask.status,
            estimate: parentTask.subtasks.reduce((acc, st) => acc + st.estimate, data.estimate || 1200000),
            assignees: {
              deleteMany: {},
              create: Array.from(new Set([...currentParentAssigneeIds, ...subtaskAssigneeIds])).map((userId) => ({
                userId,
              })),
            },
          },
          ...buildGetTaskQuery(),
        });
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );

    const taskExtras = await this.queryTaskHelper(userId, task);
    return new TaskResponse({ ...task, ...taskExtras }, "Subtask created successfully");
  }

  async update(userId: string, subtaskId: string, updateSubtaskDto: UpdateSubtaskDto) {
    const subtask = await this.pg.subtask.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          projects: {
            some: {
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        parentTask: {
          include: { assignees: true },
        },
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }

    const updatedSubtask = await this.pg.subtask.update({
      where: { id: subtaskId },
      data: {
        title: updateSubtaskDto.title,
        estimate: updateSubtaskDto.estimate,
        parentTask: {
          update: updateSubtaskDto.estimate
            ? {
                estimate: subtask.parentTask.estimate + updateSubtaskDto.estimate - subtask.estimate,
              }
            : {},
        },
      },
      ...buildGetSubtaskQuery(),
    });

    const taskExtras = await this.queryTaskHelper(userId, updatedSubtask.parentTask);
    return new TaskResponse({ ...updatedSubtask.parentTask, ...taskExtras }, "Subtask updated successfully");
  }

  async changeStatus(userId: string, subtaskId: string, dto: UpdateTaskStatusDto) {
    const subtask = await this.pg.subtask.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          projects: {
            some: {
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      ...buildGetSubtaskQuery(),
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }

    if (subtask.status === dto.status) {
      throw new BadRequestException("Subtask is already in the requested status");
    }

    const task = await changeSubtaskStatus(
      subtask.status,
      dto.status,
      this.pg,
      dto.sectionId,
      subtask,
      subtask.parentTask,
    );

    const taskExtras = await this.queryTaskHelper(userId, task);
    return new TaskResponse({ ...task, ...taskExtras }, "Subtask status updated successfully");
  }

  async moveSubtask(userId: string, subtaskId: string, moveSubtaskDto: MoveSubtaskDto) {
    const subtask = await this.pg.subtask.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          projects: {
            some: {
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        parentTask: {
          select: { subtasks: { orderBy: { position: "asc" }, select: { id: true, position: true } } },
        },
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }

    const subtasks = subtask.parentTask.subtasks.filter((st) => st.id !== subtaskId);

    let newPosition: string;
    if (subtasks.length === 0) {
      newPosition = midpoint(null, null);
    } else if (moveSubtaskDto.moveTo === 0) {
      newPosition = midpoint(null, subtasks[0].position);
    } else if (moveSubtaskDto.moveTo >= subtasks.length) {
      newPosition = midpoint(subtasks[subtasks.length - 1].position, null);
    } else {
      newPosition = midpoint(subtasks[moveSubtaskDto.moveTo - 1].position, subtasks[moveSubtaskDto.moveTo].position);
    }

    const updatedSubtask = await this.pg.subtask.update({
      where: { id: subtaskId },
      data: {
        position: newPosition,
      },
      ...buildGetSubtaskQuery(),
    });

    const taskExtras = await this.queryTaskHelper(userId, updatedSubtask.parentTask);
    return new TaskResponse({ ...updatedSubtask.parentTask, ...taskExtras }, "Subtask moved successfully");
  }

  async updateAssignees(userId: string, subtaskId: string, dto: UpdateSubtaskAssigneesDto) {
    const subtask = await this.pg.subtask.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          projects: {
            some: {
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        assignees: true,
        parentTask: {
          select: {
            assignees: true,
            subtasks: {
              include: { assignees: true },
            },
          },
        },
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }

    const subtaskAssigneeIds = new Set(dto.assigneeIds);
    const parentAssigneeIds =
      subtask.parentTask.subtasks.length === 0
        ? subtaskAssigneeIds
        : subtask.parentTask.subtasks.reduce((acc, sub) => {
            if (sub.id === subtaskId) {
              subtaskAssigneeIds.forEach((userId) => acc.add(userId));
              return acc;
            }

            sub.assignees.forEach((assignee) => acc.add(assignee.userId));
            return acc;
          }, new Set<string>());

    const task = await this.pg.$transaction(
      async (tx) => {
        await tx.subtask.update({
          where: { id: subtaskId },
          data: {
            assignees: {
              create: Array.from(subtaskAssigneeIds).map((userId) => ({ userId })),
            },
          },
        });

        return tx.task.update({
          where: { id: subtask.parentTaskId },
          data: {
            assignees: {
              deleteMany: {},
              create: Array.from(parentAssigneeIds).map((userId) => ({
                userId,
              })),
            },
          },
          ...buildGetTaskQuery(),
        });
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );

    const taskExtras = await this.queryTaskHelper(userId, task);
    return new TaskResponse({ ...task, ...taskExtras }, "Subtask assignees updated successfully");
  }

  async remove(userId: string, subtaskId: string) {
    const subtask = await this.pg.subtask.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          projects: {
            some: {
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        parentTask: true,
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }

    const updatedTask = await this.pg.$transaction(
      async (tx) => {
        await this.pg.subtask.delete({
          where: { id: subtaskId },
        });

        return tx.task.update({
          where: { id: subtask.parentTask.id },
          data: {
            estimate: subtask.parentTask.estimate - subtask.estimate,
          },
          ...buildGetTaskQuery(),
        });
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );

    const taskExtras = await this.queryTaskHelper(userId, updatedTask);
    return new TaskResponse({ ...updatedTask, ...taskExtras }, "Subtask deleted successfully");
  }
}
