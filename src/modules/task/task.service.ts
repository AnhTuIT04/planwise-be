import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { midpoint } from "@/common/utils";
import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { changeStatus } from "./utils/change-status";
import { ImportTaskDto } from "./dto/request/import-task.dto";
import { CreateTaskDto } from "./dto/request/create-task.dto";
import { UpdateTaskDto } from "./dto/request/update-task.dto";
import { UpdateTaskStatusDto } from "./dto/request/update-task-status.dto";
import { MoveTaskDto } from "./dto/request/move-task.dto";
import { DeleteTaskDto } from "./dto/request/delete-task.dto";
import { UpdateTaskAssigneesDto } from "./dto/request/update-task-assignees.dto";
import { buildGetTaskQuery, GetTaskQueryResult } from "./query/get-task.query";
import { buildGetTaskStatusQuery } from "./query/get-task-status.query";
import { TaskResponseDto } from "./dto/response/task-response.dto";

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  private async queryTaskHelper(
    userId: string,
    projectId: string,
    task: Omit<GetTaskQueryResult, "canImport" | "isImported">,
  ) {
    const taskInWorkspace = await this.db.taskProject.findFirst({
      where: {
        taskId: task.id,
        project: {
          ownerId: userId,
          isPersonal: true,
        },
      },
    });

    const originalProject = task.originalProjectId === projectId ? null : task.originalProject;
    const canImport =
      !originalProject && (task.supervisorId === userId || task.assignees.some((a) => a.user.id === userId));
    const isImported = !!taskInWorkspace;
    return { originalProject, canImport, isImported };
  }

  async create(userId: string, dto: CreateTaskDto) {
    const section = await this.db.section.findFirst({
      where: {
        id: dto.sectionId,
        project: {
          members: { some: { userId } },
        },
      },
      include: {
        tasks: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    // Calculate timeEstimate of parent task
    // If subtasks are provided, timeEstimate will be the sum of subtasks' time estimates
    // Otherwise, timeEstimate will be taken from the dto
    let estimate = dto.estimate;
    if (dto.subtasks.length > 0) {
      estimate = dto.subtasks.reduce((sum, sub) => sum + (sub.estimate || 1200), 0);
    }

    // Calculate position in section
    const positions: string[] = section.tasks.map((t) => t.position);
    let position: string;
    if (positions.length === 0) {
      position = midpoint(null, null);
    } else if (dto.insertAt === undefined || dto.insertAt >= positions.length) {
      position = midpoint(positions[positions.length - 1], null);
    } else if (dto.insertAt === 0) {
      position = midpoint(null, positions[0]);
    } else {
      position = midpoint(positions[dto.insertAt - 1], positions[dto.insertAt]);
    }

    const task = await this.db.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        estimate: estimate,
        deadline: dto.deadline,
        supervisorId: dto.supervisorId,
        originalProjectId: section.projectId,
        subtasks: {
          create: dto.subtasks.map((sub) => ({
            title: sub.title,
            description: sub.description,
            status: dto.status,
            priority: dto.priority,
            estimate: sub.estimate,
            deadline: dto.deadline,
            supervisorId: dto.supervisorId,
            originalProjectId: section.projectId,
            assignees: {
              create: Array.from(new Set([...dto.assigneeIds, ...sub.assigneeIds])).map((userId) => ({
                userId,
              })),
            },
          })),
        },
        assignees: {
          create: dto.assigneeIds.map((userId) => ({ userId })),
        },
        projects: {
          create: {
            projectId: section.projectId,
          },
        },
        sections: {
          create: {
            position,
            sectionId: section.id,
          },
        },
      },
      ...buildGetTaskQuery(),
    });

    const taskExtras = await this.queryTaskHelper(userId, section.projectId, task);
    return new TaskResponseDto({ ...task, ...taskExtras }, "Task created successfully");
  }

  async getById(userId: string, taskId: string) {
    // TODO: user can share task in future
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        projects: {
          some: {
            project: {
              members: { some: { userId } },
            },
          },
        },
      },
      ...buildGetTaskQuery(),
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission.");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot get subtask by using this endpoint");
    }

    const taskExtras = await this.queryTaskHelper(userId, task.originalProjectId, task);
    return new TaskResponseDto({ ...task, ...taskExtras }, "Task retrieved successfully");
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        sections: {
          some: {
            section: {
              id: dto.sectionId,
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        subtasks: true,
      },
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission.");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot update subtask by using this endpoint");
    }

    const tasks = await this.db.taskSection.findMany({
      where: { sectionId: dto.sectionId },
      orderBy: { position: "asc" },
    });

    let newTaskPosition: string | undefined = undefined;
    if (dto.moveTo !== undefined) {
      if (dto.moveTo > 0 && dto.moveTo < tasks.length) {
        // move in middle
        newTaskPosition = midpoint(tasks[dto.moveTo - 1].position, tasks[dto.moveTo].position);
      } else if (dto.moveTo <= 0) {
        // move to beginning
        newTaskPosition = midpoint(null, tasks[0].position);
      } else {
        // move to end
        newTaskPosition = midpoint(tasks[tasks.length - 1].position, null);
      }
    }

    // Execute update
    const updated = await this.db.task.update({
      where: { id: taskId },
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        estimate: task.subtasks.length > 0 ? task.estimate : dto.estimate,
        deadline: dto.deadline,
        supervisorId: dto.supervisorId,
        subtasks: {
          updateMany: task.subtasks.map((subtask) => ({
            where: { id: subtask.id },
            data: {
              priority: dto.priority,
              deadline: dto.deadline,
            },
          })),
        },
        sections: {
          update: {
            where: { taskId_sectionId: { taskId, sectionId: dto.sectionId } },
            data: {
              position: newTaskPosition,
            },
          },
        },
      },
      ...buildGetTaskQuery(),
    });

    const taskExtras = await this.queryTaskHelper(userId, updated.originalProjectId, updated);
    return new TaskResponseDto({ ...updated, ...taskExtras }, "Task updated successfully");
  }

  async updateStatus(userId: string, taskId: string, dto: UpdateTaskStatusDto) {
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        projects: {
          some: {
            project: {
              members: { some: { userId } },
            },
          },
        },
      },
      ...buildGetTaskStatusQuery(),
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission.");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot update subtask status by using this endpoint");
    }

    if (task.status === dto.status) {
      throw new BadRequestException("Task is already in the requested status");
    }

    const updatedTask = await changeStatus(task.status, dto.status, this.db, task);
    const taskExtras = await this.queryTaskHelper(userId, updatedTask.originalProjectId, updatedTask);
    return new TaskResponseDto({ ...updatedTask, ...taskExtras }, "Task status updated successfully");
  }

  async updateAssignees(userId: string, taskId: string, dto: UpdateTaskAssigneesDto) {
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
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
          include: {
            assignees: true,
          },
        },
      },
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission to access it");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot update assignees of a subtask using this endpoint");
    }

    const updatedTask = await this.db.$transaction(async (tx) => {
      const updateAssignees = task.subtasks.map((sub) => {
        const newAssignees = [...new Set([...sub.assignees.map((a) => a.userId), ...dto.assigneeIds])];

        return tx.task.update({
          where: { id: sub.id },
          data: {
            assignees: {
              deleteMany: {},
              create: newAssignees.map((uid) => ({ userId: uid })),
            },
          },
        });
      });

      await Promise.all(updateAssignees);

      return tx.task.update({
        where: { id: taskId },
        data: {
          assignees: {
            deleteMany: {},
            create: dto.assigneeIds.map((uid) => ({ userId: uid })),
          },
        },
        ...buildGetTaskQuery(),
      });
    });

    const taskExtras = await this.queryTaskHelper(userId, updatedTask.originalProjectId, updatedTask);
    return new TaskResponseDto({ ...updatedTask, ...taskExtras }, "Task assignees updated successfully");
  }

  async moveTask(userId: string, taskId: string, dto: MoveTaskDto) {
    const { fromSectionId, toSectionId, insertAt } = dto;

    if (fromSectionId === toSectionId) {
      throw new BadRequestException("Source and target sections are the same");
    }

    const task = await this.db.task.findUnique({
      where: {
        id: taskId,
        sections: {
          some: {
            section: {
              id: fromSectionId,
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        sections: {
          select: {
            section: true,
          },
        },
      },
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission.");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot move subtask by using this endpoint");
    }

    const fromSection = task.sections[0]?.section;
    const toSection = await this.db.section.findUnique({
      where: {
        id: toSectionId,
        project: {
          members: { some: { userId } },
        },
      },
      include: {
        tasks: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!fromSection || !toSection || fromSection.projectId !== toSection.projectId) {
      throw new BadRequestException("Invalid source or target section");
    }

    // Calculate new position in target section
    const positions: string[] = toSection.tasks.map((t) => t.position);
    let position: string;
    if (insertAt > 0 && insertAt < positions.length) {
      position = midpoint(positions[insertAt - 1], positions[insertAt]);
    } else if (insertAt <= 0) {
      position = midpoint(null, positions[0]);
    } else {
      position = midpoint(positions[positions.length - 1], null);
    }

    // Transaction: update TaskSection join table
    await this.db.$transaction(async (tx) => {
      await Promise.all([
        // Remove old relation
        tx.taskSection.delete({
          where: {
            taskId_sectionId: {
              taskId,
              sectionId: fromSectionId,
            },
          },
        }),

        // Create new relation
        tx.taskSection.create({
          data: {
            taskId,
            position,
            sectionId: toSectionId,
          },
        }),
      ]);
    });

    return new MessageResponseDto("Task moved successfully");
  }

  async importTask(userId: string, taskId: string, dto: ImportTaskDto) {
    const { fromProjectId, toSectionId } = dto;
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        originalProjectId: fromProjectId,
      },
      include: {
        originalProject: true,
        assignees: true,
      },
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission to access it");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot import subtask by using this endpoint");
    }

    if (task.originalProject.isPersonal) {
      throw new BadRequestException("Cannot import task from a personal project");
    }

    if (task.supervisorId !== userId && !task.assignees.some((a) => a.userId === userId)) {
      throw new ForbiddenException("You do not have permission to import this task");
    }

    const targetSection = await this.db.section.findFirst({
      where: {
        id: toSectionId,
        project: {
          isPersonal: true,
          ownerId: userId,
        },
      },
      include: {
        project: {
          select: {
            tasks: true,
          },
        },
        tasks: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!targetSection) {
      throw new ForbiddenException("Target section not found or you do not have permission");
    }

    if (targetSection.project.tasks.some((t) => t.taskId === taskId)) {
      throw new BadRequestException("Task already exists in your personal project");
    }

    // Calculate new position in target section
    const positions: string[] = targetSection.tasks.map((t) => t.position);
    let position: string;
    if (positions.length === 0) {
      position = midpoint(null, null);
    } else if (dto.insertAt === undefined || dto.insertAt >= positions.length) {
      position = midpoint(positions[positions.length - 1], null);
    } else if (dto.insertAt === 0) {
      position = midpoint(null, positions[0]);
    } else {
      position = midpoint(positions[dto.insertAt - 1], positions[dto.insertAt]);
    }

    // Thêm task vào target section
    await this.db.task.update({
      where: { id: taskId },
      data: {
        sections: {
          create: {
            sectionId: toSectionId,
            position,
          },
        },
        projects: {
          create: {
            projectId: targetSection.projectId,
          },
        },
      },
    });

    return new MessageResponseDto("Task imported successfully");
  }

  async remove(userId: string, taskId: string, dto: DeleteTaskDto) {
    const { projectId } = dto;
    const task = await this.db.task.findUnique({
      where: {
        id: taskId,
        projects: {
          some: {
            projectId,
            project: {
              members: { some: { userId } },
            },
          },
        },
      },
      include: {
        projects: {
          where: { projectId },
          include: {
            project: {
              include: {
                sections: true,
                tasks: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException("Task not found or you do not have permission to access it");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot delete subtask by using this endpoint");
    }

    const project = task.projects.find((p) => p.project.id === projectId)!.project;
    if (project.isPersonal) {
      // Delete relations only
      await this.db.$transaction(async (tx) => {
        await Promise.all([
          tx.taskSection.deleteMany({
            where: {
              taskId,
              section: { projectId },
            },
          }),
          tx.taskProject.deleteMany({
            where: {
              taskId,
              projectId,
            },
          }),
        ]);
      });
    } else {
      // Delete task entire
      await this.db.task.delete({ where: { id: taskId } });
    }

    return new MessageResponseDto("Task deleted successfully");
  }
}
