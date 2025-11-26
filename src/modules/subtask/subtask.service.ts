import { BadRequestException, Injectable } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { CreateSubtaskDto } from "./dto/request/create-subtask.dto";
import { UpdateSubtaskDto } from "./dto/request/update-subtask.dto";
import { TaskStatus } from "prisma/client";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { UpdateTaskStatusDto } from "../task/dto/request/update-task-status.dto";
import { changeStatus } from "./utils/change-status";
import { buildGetSubtaskStatusQuery } from "./query/get-subtask.query";
import { UpdateSubtaskAssigneesDto } from "./dto/request/update-subtask-assignees.dto";

@Injectable()
export class SubtaskService {
  constructor(private db: DatabaseService) {}

  async create(userId: string, createSubtaskDto: CreateSubtaskDto) {
    // const { parentTaskId, ...data } = createSubtaskDto;
    // const parentTask = await this.db.task.findFirst({
    //   where: {
    //     id: parentTaskId,
    //     tasksOfSection: {
    //       some: {
    //         section: {
    //           project: {
    //             memberships: { some: { userId } },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   include: { assignees: true },
    // });
    // if (!parentTask) {
    //   throw new Error("Parent task not found or you do not have permission to access it");
    // }
    // await this.db.$transaction(async (tx) => {
    //   if (data.status && data.status === TaskStatus.TODO && parentTask.status === TaskStatus.DONE) {
    //     await this.db.task.update({
    //       where: { id: parentTask.id },
    //       data: {
    //         status: TaskStatus.TODO,
    //         timeEstimate: parentTask.timeEstimate + (data.timeEstimate ?? 20),
    //       },
    //     });
    //   }
    //   return tx.task.create({
    //     data: {
    //       parentTaskId: parentTask.id,
    //       title: data.title,
    //       description: data.description,
    //       timeEstimate: data.timeEstimate,
    //       priority: parentTask.priority,
    //       deadline: parentTask.deadline,
    //       status: data.status,
    //       assignees: {
    //         create: Array.from(
    //           new Set([...parentTask.assignees.map((assignee) => assignee.userId), ...data.assigneeIds]),
    //         ).map((userId) => ({
    //           userId,
    //         })),
    //       },
    //     },
    //   });
    // });
    // return new MessageResponseDto("Subtask created successfully");
  }

  async update(userId: string, subtaskId: string, updateSubtaskDto: UpdateSubtaskDto) {
    // const subtask = await this.db.task.findFirst({
    //   where: {
    //     id: subtaskId,
    //     parent: {
    //       tasksOfSection: {
    //         some: {
    //           section: {
    //             project: {
    //               memberships: { some: { userId } },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     parent: {
    //       include: { assignees: true },
    //     },
    //   },
    // });
    // if (!subtask) {
    //   throw new Error("Subtask not found or you do not have permission to access it");
    // }
    // await this.db.task.update({
    //   where: { id: subtaskId },
    //   data: {
    //     title: updateSubtaskDto.title,
    //     description: updateSubtaskDto.description,
    //     timeEstimate: updateSubtaskDto.timeEstimate,
    //     parent: {
    //       update: updateSubtaskDto.timeEstimate
    //         ? {
    //             timeEstimate: subtask.parent!.timeEstimate + updateSubtaskDto.timeEstimate - subtask.timeEstimate,
    //           }
    //         : {},
    //     },
    //   },
    // });
    // return new MessageResponseDto("Subtask updated successfully");
  }

  async changeStatus(userId: string, subtaskId: string, dto: UpdateTaskStatusDto) {
    // const subtask = await this.db.task.findFirst({
    //   where: {
    //     id: subtaskId,
    //     parent: {
    //       tasksOfSection: {
    //         some: {
    //           section: {
    //             project: {
    //               memberships: { some: { userId } },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   ...buildGetSubtaskStatusQuery(),
    // });
    // if (!subtask) {
    //   throw new Error("Subtask not found or you do not have permission to access it");
    // }
    // if (subtask.status === dto.status) {
    //   throw new BadRequestException("Subtask is already in the requested status");
    // }
    // await changeStatus(subtask.status, dto.status, this.db, subtask);
    // return new MessageResponseDto("Subtask status updated successfully");
  }

  async updateAssignees(userId: string, subtaskId: string, dto: UpdateSubtaskAssigneesDto) {
    // const subtask = await this.db.task.findFirst({
    //   where: {
    //     id: subtaskId,
    //     parent: {
    //       tasksOfSection: {
    //         some: {
    //           section: {
    //             project: {
    //               memberships: { some: { userId } },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     parent: {
    //       select: { assignees: true },
    //     },
    //   },
    // });
    // if (!subtask) {
    //   throw new Error("Subtask not found or you do not have permission to access it");
    // }
    // await this.db.task.update({
    //   where: { id: subtaskId },
    //   data: {
    //     assignees: {
    //       deleteMany: {},
    //       create: Array.from(
    //         new Set([...subtask.parent!.assignees.map((assignee) => assignee.userId), ...dto.assigneeIds]),
    //       ).map((userId) => ({
    //         userId,
    //       })),
    //     },
    //   },
    // });
    // return new MessageResponseDto("Subtask assignees updated successfully");
  }

  async remove(userId: string, subtaskId: string) {
    // const subtask = await this.db.task.findFirst({
    //   where: {
    //     id: subtaskId,
    //     parent: {
    //       tasksOfSection: {
    //         some: {
    //           section: {
    //             project: {
    //               memberships: { some: { userId } },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    // if (!subtask) {
    //   throw new Error("Subtask not found or you do not have permission to access it");
    // }
    // await this.db.task.delete({
    //   where: { id: subtaskId },
    // });
    // return new MessageResponseDto("Subtask deleted successfully");
  }
}
