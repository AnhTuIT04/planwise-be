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
    const section = await this.db.section.findUnique({
      where: { id: data.sectionId },
    });

    if (!section) throw new NotFoundException("Section not found");

    const newTask = await this.db.task.create({
      data,
    });

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

    // Build update data dynamically - only include provided fields
    const updateData: any = {};

    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.priority !== undefined) updateData.priority = dto.priority;
    if (dto.startDate !== undefined) updateData.startDate = dto.startDate ? new Date(dto.startDate) : null;
    if (dto.dueDate !== undefined) updateData.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    if (dto.sectionId !== undefined) updateData.sectionId = dto.sectionId;
    if (dto.supervisorId !== undefined) updateData.supervisorId = dto.supervisorId;

    // Validate parentTaskId if provided
    if (dto.parentTaskId !== undefined) {
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
      },
    });

    if (!task || task.belongsToProject.owner !== userId || !task.belongsToProject.isPersonal) {
      throw new ForbiddenException("You are not allowed to delete this task");
    }

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
}
