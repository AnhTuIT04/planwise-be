// tasks.service.ts
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DatabaseService } from "../database/database.service";
import { DetailedTaskResponseDto } from "./dto";
import { TaskWithAssigneesResponseDto } from "./dto/task-response.dto";

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}



  async getDetailedTask(id: string): Promise<DetailedTaskResponseDto | null> {
    const task = await this.db.task.findUnique({
      where: { id },
      include: {
        assignees: {
          include: {
            user: {
              select: { email: true, fullname: true, avatarUrl: true },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: { email: true, fullname: true, avatarUrl: true },
            },
          },
        },
        subtasks: true,
        supervisor: {
          select: { email: true, fullname: true, avatarUrl: true },
        },
      },
    });

    if (!task) return null;

    return {
      ...task,
      assignees: task.assignees.map((assignee) => assignee.user),
      comments: task.comments.map((comment) => ({
        ...comment,
        author: comment.author,
      })),
      supervisor: task.supervisor,
    };
  }

  update(id: string, dto: UpdateTaskDto) {}


  remove(id: string) {}

 

  async assignTaskToUsers(taskId: string, userIds: string[]) {
    return this.db.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          create: userIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
    });
  }

  async removeAllAssigneesFromTask(taskId: string) {
    return this.db.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          deleteMany: {},
        },
      },
    });
  }

  async removeSpecificAssigneeFromTask(taskId: string, userId: string) {
    return this.db.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          deleteMany: {
            userId: userId,
          },
        },
      },
    });
  }
}
