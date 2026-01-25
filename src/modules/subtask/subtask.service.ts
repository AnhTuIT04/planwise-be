import { BadRequestException, Injectable } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { CreateSubtaskDto } from "./dto/request/create-subtask.dto";
import { UpdateSubtaskDto } from "./dto/request/update-subtask.dto";
import { TaskStatus } from "prisma/client";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { UpdateTaskStatusDto } from "../task/dto/request/update-task-status.dto";
import { changeStatus } from "./utils/change-status";
import { buildGetSubtaskStatusQuery } from "./query/get-subtask-status.query";
import { UpdateSubtaskAssigneesDto } from "./dto/request/update-subtask-assignees.dto";
import { SubtaskResponseDto } from "./dto/response/subtask-response.dto";
import { buildGetSubtaskQuery, GetSubtaskQueryResult } from "./query/get-subtask.query";
import { PermissionChecker } from '@/middleware/permission-checker.service';
import { Permission } from '@/common/enum/permission.enum';
@Injectable()
export class SubtaskService {
  constructor(
    private db: DatabaseService,
    private readonly permissionChecker: PermissionChecker
  ) {}

  async create(userId: string, createSubtaskDto: CreateSubtaskDto) {
    const { parentTaskId, ...data } = createSubtaskDto;
    const parentTask = await this.db.task.findFirst({
      where: {
        id: parentTaskId,
        sections: {
          some: {
            section: {
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: { assignees: true },
    });

    if (!parentTask) {
      throw new Error("Parent task not found or you do not have permission to access it");
    }
    await this.permissionChecker.requirePermission(
      { userId, projectId: parentTask.originalProjectId },
      Permission.SUBTASK_CREATE,
    );
    const newSubtask: GetSubtaskQueryResult = await this.db.$transaction(
      async (tx) => {
        if (data.status && data.status === TaskStatus.TODO && parentTask.status === TaskStatus.DONE) {
          await tx.task.update({
            where: { id: parentTask.id },
            data: {
              status: TaskStatus.TODO,
              estimate: parentTask.estimate + (data.estimate ?? 1200),
            },
          });
        }

        return tx.task.create({
          data: {
            parentTaskId: parentTask.id,
            title: data.title,
            description: data.description,
            estimate: data.estimate,
            priority: parentTask.priority,
            deadline: parentTask.deadline,
            status: data.status,
            originalProjectId: parentTask.originalProjectId,
            assignees: {
              create: Array.from(
                new Set([...parentTask.assignees.map((assignee) => assignee.userId), ...data.assigneeIds]),
              ).map((userId) => ({
                userId,
              })),
            },
          },
          ...buildGetSubtaskQuery(),
        });
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );

    return new SubtaskResponseDto(newSubtask, "Subtask created successfully");
  }

  async update(userId: string, subtaskId: string, updateSubtaskDto: UpdateSubtaskDto) {
    const subtask = await this.db.task.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          sections: {
            some: {
              section: {
                project: {
                  members: { some: { userId } },
                },
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
    await this.permissionChecker.requirePermission(
      { userId, projectId: subtask.originalProjectId },
      Permission.SUBTASK_UPDATE,
    );
    const updatedSubtask : GetSubtaskQueryResult = await this.db.task.update({
      where: { id: subtaskId },
      data: {
        title: updateSubtaskDto.title,
        description: updateSubtaskDto.description,
        estimate: updateSubtaskDto.estimate,
        parentTask: {
          update: updateSubtaskDto.estimate
            ? {
                estimate: subtask.parentTask!.estimate + updateSubtaskDto.estimate - subtask.estimate,
              }
            : {},
        },
      },
      ...buildGetSubtaskQuery(),
    });

    return new SubtaskResponseDto(updatedSubtask, "Subtask updated successfully");
  }

  async changeStatus(userId: string, subtaskId: string, dto: UpdateTaskStatusDto) {
    const subtask = await this.db.task.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          sections: {
            some: {
              section: {
                project: {
                  members: { some: { userId } },
                },
              },
            },
          },
        },
      },
      ...buildGetSubtaskStatusQuery(),
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }
    await this.permissionChecker.requirePermission(
      { userId, projectId: subtask.originalProjectId },
      Permission.SUBTASK_UPDATE,
    );

    if (subtask.status === dto.status) {
      throw new BadRequestException("Subtask is already in the requested status");
    }

    const updatedSubtask : GetSubtaskQueryResult = await changeStatus(subtask.status, dto.status, this.db, subtask, dto.sectionId);
    return new SubtaskResponseDto(updatedSubtask, "Subtask status updated successfully");
  }

  async updateAssignees(userId: string, subtaskId: string, dto: UpdateSubtaskAssigneesDto) {
    const subtask = await this.db.task.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          sections: {
            some: {
              section: {
                project: {
                  members: { some: { userId } },
                },
              },
            },
          },
        },
      },
      include: {
        parentTask: {
          select: { assignees: true },
        },
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }
    await this.permissionChecker.requirePermission(
      { userId, projectId: subtask.originalProjectId },
      Permission.TASK_ASSIGN,
    );
    const updatedSubtask : GetSubtaskQueryResult = await this.db.task.update({
      where: { id: subtaskId },
      data: {
        assignees: {
          deleteMany: {},
          create: Array.from(
            new Set([...subtask.parentTask!.assignees.map((assignee) => assignee.userId), ...dto.assigneeIds]),
          ).map((userId) => ({
            userId,
          })),
        },
      },
      ...buildGetSubtaskQuery(),
    });

    return new SubtaskResponseDto(updatedSubtask, "Subtask assignees updated successfully");
  }

  async remove(userId: string, subtaskId: string) {
    const subtask = await this.db.task.findFirst({
      where: {
        id: subtaskId,
        parentTask: {
          sections: {
            some: {
              section: {
                project: {
                  members: { some: { userId } },
                },
              },
            },
          },
        },
      },
    });

    if (!subtask) {
      throw new Error("Subtask not found or you do not have permission to access it");
    }
    await this.permissionChecker.requirePermission(
      { userId, projectId: subtask.originalProjectId },
      Permission.SUBTASK_DELETE,
    );
    await this.db.task.delete({
      where: { id: subtaskId },
    });

    return new MessageResponseDto("Subtask deleted successfully");
  }
}
