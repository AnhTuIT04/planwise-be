import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { ImportTaskDto } from "./dto/request/import-task.dto";
import { CreateTaskDto } from "./dto/request/create-task.dto";
import { UpdateTaskDto } from "./dto/request/update-task.dto";
import { UpdateTaskStatusDto } from "./dto/request/update-task-status.dto";
import { MoveTaskDto } from "./dto/request/move-task.dto";
import { DeleteTaskDto } from "./dto/request/delete-task.dto";
import { TaskResponseDto } from "./dto/response/task-response.dto";
import { buildGetTaskQuery, buildGetTaskStatsQuery } from "./query/get-task.query";
import { changeStatus } from "./utils/change-status";
import { UpdateTaskAssigneesDto } from "./dto/request/update-task-assignees.dto";

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  async create(userId: string, dto: CreateTaskDto) {
    const { projectId, sectionId } = dto;

    const section = await this.db.section.findUnique({
      where: {
        id: sectionId,
        projectId,
        project: {
          memberships: { some: { userId } },
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    // Calculate timeEstimate of parent task
    // If subtasks are provided, timeEstimate will be the sum of subtasks' time estimates
    // Otherwise, timeEstimate will be taken from the dto
    let timeEstimate = dto.timeEstimate;
    if (dto.subtasks.length > 0) {
      timeEstimate = dto.subtasks.reduce((sum, sub) => sum + (sub.timeEstimate || 20), 0);
    }

    const task = await this.db.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        timeEstimate: timeEstimate,
        deadline: dto.deadline,
        supervisorId: dto.supervisorId,

        subtasks: {
          create: dto.subtasks.map((sub) => ({
            title: sub.title,
            description: sub.description,
            status: dto.status,
            priority: dto.priority,
            timeEstimate: sub.timeEstimate,
            deadline: dto.deadline,
            supervisorId: dto.supervisorId,

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

        tasksOfSection: {
          create: {
            sectionId: section.id,
          },
        },
      },
      ...buildGetTaskQuery(),
    });

    const currentList = JSON.parse(section.listOfTask);
    if (dto.insertAt !== undefined && dto.insertAt >= 0 && dto.insertAt <= currentList.length) {
      currentList.splice(dto.insertAt, 0, task.id);
    } else {
      currentList.push(task.id);
    }

    await this.db.section.update({
      where: { id: sectionId },
      data: { listOfTask: JSON.stringify(currentList) },
    });

    return new TaskResponseDto(task, "Task created successfully");
  }

  async getById(userId: string, taskId: string) {
    // TODO: user can share task in future
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              project: { memberships: { some: { userId } } },
            },
          },
        },
      },
      ...buildGetTaskQuery(),
    });

    if (!task) throw new ForbiddenException("Task not found or you do not have permission.");

    return new TaskResponseDto(task, "Task retrieved successfully");
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    const { projectId, sectionId } = dto;

    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              id: sectionId,
              projectId,
              project: {
                memberships: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        subtasks: true,
      },
    });

    if (!task) throw new ForbiddenException("Task not found or you do not have permission.");

    // Execute update
    const updated = await this.db.task.update({
      where: { id: taskId },
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        timeEstimate: task.subtasks.length > 0 ? task.timeEstimate : dto.timeEstimate,
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
      },
      ...buildGetTaskQuery(),
    });

    return new TaskResponseDto(updated, "Task updated successfully");
  }

  async updateStatus(userId: string, taskId: string, dto: UpdateTaskStatusDto) {
    const { status } = dto;

    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              project: { memberships: { some: { userId } } },
            },
          },
        },
      },
      ...buildGetTaskStatsQuery(),
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission.");
    }

    if (task.status === status) {
      throw new BadRequestException("Task is already in the requested status");
    }

    const updatedTask = await changeStatus(task.status, status, this.db, task);
    return new TaskResponseDto(updatedTask, "Task status updated successfully");
  }

  async updateAssignees(userId: string, taskId: string, dto: UpdateTaskAssigneesDto) {
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              project: { memberships: { some: { userId } } },
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

    for (const sub of task.subtasks) {
      const newAssignees = [...new Set([...sub.assignees.map((a) => a.userId), ...dto.assigneeIds])];

      await this.db.task.update({
        where: { id: sub.id },
        data: {
          assignees: {
            deleteMany: {},
            create: newAssignees.map((uid) => ({ userId: uid })),
          },
        },
      });
    }

    const updatedTask = await this.db.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          deleteMany: {},
          create: dto.assigneeIds.map((uid) => ({ userId: uid })),
        },
      },
      ...buildGetTaskQuery(),
    });

    return new TaskResponseDto(updatedTask, "Task assignees updated successfully");
  }

  async moveTask(userId: string, taskId: string, dto: MoveTaskDto) {
    const { fromSectionId, toSectionId, insertAt } = dto;

    if (fromSectionId === toSectionId) {
      throw new BadRequestException("Source and target sections are the same");
    }

    const task = await this.db.task.findUnique({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              id: fromSectionId,
              project: {
                memberships: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        tasksOfSection: {
          select: {
            section: true,
          },
        },
      },
    });

    if (!task) throw new ForbiddenException("Task not found or you do not have permission.");

    const fromSection = task.tasksOfSection[0]?.section;
    const toSection = await this.db.section.findUnique({
      where: {
        id: toSectionId,
        project: {
          memberships: { some: { userId } },
        },
      },
    });

    if (!fromSection || !toSection || fromSection.projectId !== toSection.projectId) {
      throw new BadRequestException("Invalid source or target section");
    }

    // Update listOfTask for fromSection and toSection
    const fromList: string[] = JSON.parse(fromSection.listOfTask);
    const toList: string[] = JSON.parse(toSection.listOfTask);

    // Remove from old section
    const newFromList = fromList.filter((id) => id !== taskId);

    // Insert to new section
    const newToList = [...toList];
    if (insertAt >= 0 && insertAt <= newToList.length) {
      newToList.splice(insertAt, 0, taskId);
    } else {
      newToList.push(taskId);
    }

    // Transaction: update 2 sections + update TaskOfSection join table
    await this.db.$transaction([
      // Update JSON list order
      this.db.section.update({
        where: { id: fromSectionId },
        data: { listOfTask: JSON.stringify(newFromList) },
      }),
      this.db.section.update({
        where: { id: toSectionId },
        data: { listOfTask: JSON.stringify(newToList) },
      }),

      // Remove old relation
      this.db.taskOfSection.delete({
        where: {
          taskId_sectionId: {
            taskId,
            sectionId: fromSectionId,
          },
        },
      }),

      // Create new relation
      this.db.taskOfSection.create({
        data: {
          taskId,
          sectionId: toSectionId,
        },
      }),
    ]);

    return new MessageResponseDto("Task moved successfully");
  }

  async importTask(userId: string, taskId: string, dto: ImportTaskDto) {
    const { fromProjectId, toSectionId, insertAt } = dto;

    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              projectId: fromProjectId,
              project: {
                memberships: { some: { userId } },
              },
            },
          },
        },
      },
    });

    if (!task) throw new ForbiddenException("Task not found or you do not have permission to access it");

    const targetSection = await this.db.section.findFirst({
      where: {
        id: toSectionId,
        project: {
          isPersonal: true,
          memberships: { some: { userId } },
        },
      },
      include: {
        project: true,
      },
    });

    if (!targetSection) {
      throw new ForbiddenException("Target section not found or you do not have permission");
    }

    if (targetSection.projectId === fromProjectId) {
      throw new BadRequestException("Cannot import task to the same project. Use move instead");
    }

    const existingRelation = await this.db.taskOfSection.findUnique({
      where: {
        taskId_sectionId: {
          taskId,
          sectionId: toSectionId,
        },
      },
    });

    if (existingRelation) {
      throw new BadRequestException("Task already exists in this section");
    }

    // Thêm task vào target section
    await this.db.taskOfSection.create({
      data: {
        taskId,
        sectionId: toSectionId,
      },
    });

    // Cập nhật listOfTask của target section
    const currentList: string[] = JSON.parse(targetSection.listOfTask);
    if (insertAt !== undefined && insertAt >= 0 && insertAt <= currentList.length) {
      currentList.splice(insertAt, 0, taskId);
    } else {
      currentList.push(taskId);
    }

    await this.db.section.update({
      where: { id: toSectionId },
      data: { listOfTask: JSON.stringify(currentList) },
    });

    return new MessageResponseDto("Task imported successfully");
  }

  async remove(userId: string, taskId: string, dto: DeleteTaskDto) {
    const { projectId } = dto;

    const task = await this.db.task.findUnique({
      where: {
        id: taskId,
        tasksOfSection: {
          some: {
            section: {
              projectId,
              project: {
                memberships: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        tasksOfSection: {
          include: {
            section: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });

    if (!task) throw new NotFoundException("Task not found");

    const sections = task.tasksOfSection.map((tos) => tos.section);
    if (sections.length === 0) throw new BadRequestException("Task does not belong to this project");

    const project = sections.find((sec) => sec.project.id === projectId)!.project;
    if (project.isPersonal) {
      // Personal project: chỉ xóa khỏi TaskOfSection và cập nhật listOfTask
      const sectionOfProject = sections.filter((sec) => sec.project.id === projectId);
      const sectionUpdates = sectionOfProject.map((section) => {
        const currentList: string[] = JSON.parse(section.listOfTask);
        const updatedList = currentList.filter((id) => id !== taskId);
        return this.db.section.update({
          where: {
            id: section.id,
            projectId: project.id,
          },
          data: {
            listOfTask: JSON.stringify(updatedList),
          },
        });
      });

      const deleteRelations = sectionOfProject.map((section) =>
        this.db.taskOfSection.delete({
          where: {
            taskId_sectionId: {
              taskId,
              sectionId: section.id,
            },
          },
        }),
      );

      await this.db.$transaction([...sectionUpdates, ...deleteRelations]);
    } else {
      // Non-personal project: xóa task hoàn toàn khỏi tất cả project
      const sectionUpdates = sections.map((section) => {
        const currentList: string[] = JSON.parse(section.listOfTask);
        const updatedList = currentList.filter((id) => id !== taskId);
        return this.db.section.update({
          where: { id: section.id },
          data: { listOfTask: JSON.stringify(updatedList) },
        });
      });

      await this.db.$transaction([...sectionUpdates, this.db.task.delete({ where: { id: taskId } })]);
    }

    return new MessageResponseDto("Task deleted successfully");
  }
}
