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

  async create(data: CreateTaskDto) {
    if (data.parentTaskId && data.subTask && data.subTask.length > 0) {
      throw new ForbiddenException("Cannot add subtasks to a subtask");
    }

    const section = await this.db.section.findUnique({
      where: { id: data.sectionId, projectId: data.projectId },
    });

    if (!section) throw new NotFoundException("Section not found");

    const { subTask, ...taskData } = data;

    const newTask = await this.db.task.create({
      data: taskData,
    });

    // update list of task in section if it's a top-level task
    if (!data.parentTaskId) {
      await this.db.section.update({
        where: { id: data.sectionId },
        data: {
          listOfTask: section.listOfTask ? section.listOfTask + `,"${newTask.id}"` : `${newTask.id}`,
        },
      });
    }

    const assignedUsers = data.assigneeIds;
    if (assignedUsers && assignedUsers.length > 0) {
      await this.assignTaskToUsers(newTask.id, assignedUsers);
    }

    if (subTask && subTask.length > 0) {
      for (const subTaskDto of subTask) {
        const subTask = await this.db.task.create({
          data: {
            ...subTaskDto,
            parentTaskId: newTask.id,
            sectionId: data.sectionId,
            projectId: data.projectId,
          },
        });
        const subTaskAssignees = subTaskDto.assigneeIds;
        if (subTaskAssignees && subTaskAssignees.length > 0) {
          await this.assignTaskToUsers(subTask.id, subTaskAssignees);
        }
      }
    }

    return newTask;
  }

  // called by section service
  async getTasksBySection(sectionId: string): Promise<TaskWithAssigneesResponseDto[]> {
    const tasks = await this.db.task.findMany({
      where: { sectionId },
      include: {
        assignees: {
          include: {
            user: {
              select: {
                email: true,
                fullname: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return tasks.map((task) => ({
      ...task,
      assignees: task.assignees.map((assignee) => ({
        email: assignee.user.email,
        fullname: assignee.user.fullname,
        avatarUrl: assignee.user.avatarUrl,
      })),
    }));
  }

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

  async updatePersonal(id: string, dto: UpdateTaskDto, userId: string) {
    const { subTask, ...updateDto } = dto;
    // Check if the task exists and belongs to the user's personal project
    const existingTask = await this.db.task.findUnique({
      where: { id },
      include: {
        belongsToProject: {
          select: {
            owner: true,
            isPersonal: true,
          },
        },
      },
    });

    if (!existingTask || existingTask.belongsToProject.owner !== userId || !existingTask.belongsToProject.isPersonal) {
      throw new ForbiddenException("You are not allowed to update this task");
    }

    if (existingTask.parentTaskId && subTask && subTask.length > 0) {
      throw new ForbiddenException("Cannot add subtasks to a subtask");
    }

    // Build update data dynamically - only include provided fields
    const updateData: any = {};

    if (updateDto.title !== undefined) updateData.title = updateDto.title;
    if (updateDto.description !== undefined) updateData.description = updateDto.description;
    if (updateDto.status !== undefined) updateData.status = updateDto.status;
    if (updateDto.priority !== undefined) updateData.priority = updateDto.priority;
    if (updateDto.startDate !== undefined)
      updateData.startDate = updateDto.startDate ? new Date(updateDto.startDate) : null;
    if (updateDto.dueDate !== undefined) updateData.dueDate = updateDto.dueDate ? new Date(updateDto.dueDate) : null;
    if (updateDto.sectionId !== undefined) updateData.sectionId = updateDto.sectionId;
    if (updateDto.supervisorId !== undefined) updateData.supervisorId = updateDto.supervisorId;

    // Validate parentTaskId if provided
    if (updateDto.parentTaskId !== undefined) {
      if (dto.parentTaskId === null) {
        // Allow clearing the parent task
        updateData.parentTaskId = null;
      } else {
        // Validate that parent task exists and belongs to the same project
        const parentTask = await this.db.task.findUnique({
          where: { id: dto.parentTaskId },
          select: {
            id: true,
            projectId: true,
            parentTaskId: true,
          },
        });

        if (!parentTask) {
          throw new Error("Parent task not found");
        }

        if (parentTask.projectId !== existingTask.projectId) {
          throw new Error("Parent task must be in the same project");
        }

        // Prevent circular references
        if (parentTask.id === id) {
          throw new Error("A task cannot be its own parent");
        }

        // Check if the parent task is already a child of the current task
        if (parentTask.parentTaskId === id) {
          throw new Error("Cannot create circular parent-child relationship");
        }

        updateData.parentTaskId = dto.parentTaskId;
      }
    }

    // Handle subtasks
    if (subTask && subTask.length > 0) {
      for (const subTaskDto of subTask) {
        if (subTaskDto.taskId) {
          // Update existing subtask
          await this.db.task.update({
            where: { id: subTaskDto.taskId },
            data: {
              ...subTaskDto,
              sectionId: updateDto.sectionId || existingTask.sectionId,
            },
          });
        } else {
          // Create new subtask
          await this.db.task.create({
            data: {
              ...subTaskDto,
              parentTaskId: id,
              sectionId: updateDto.sectionId || existingTask.sectionId,
              projectId: existingTask.projectId,
            },
          });
        }
      }
    }

    return this.db.task.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: string) {}

  async removePersonal(id: string, userId: string) {
    const task = await this.db.task.findUnique({
      where: { id },
      include: {
        belongsToProject: {
          select: {
            owner: true,
            isPersonal: true,
          },
        },
        subtasks: true,
      },
    });

    if (!task || task.belongsToProject.owner !== userId || !task.belongsToProject.isPersonal) {
      throw new ForbiddenException("You are not allowed to delete this task");
    }

    if (task.subtasks && task.subtasks.length > 0) {
      throw new ForbiddenException("Cannot delete a task that has subtasks");
    }

    // Clear all assignees before deleting the task (auto-unassign the owner)
    await this.db.task.update({
      where: { id },
      data: {
        assignees: {
          deleteMany: {},
        },
      },
    });

    return this.db.task.delete({
      where: { id },
    });
  }

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
