import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { TaskStatus, PriorityLevel, Prisma } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { ImportTaskDto } from "./dto/import-task.dto";
import { CreateTaskDto } from "./dto/request/create-task.dto";
import { UpdateTaskDto } from "./dto/request/update-task.dto";
import { MoveTaskDto } from "./dto/request/move-task.dto";
import { TaskResponseDto } from "./dto/response/task-response.dto";

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
          OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
        },
      },
    });

    if (!section) throw new ForbiddenException("Section not found or does not belong to the project");

    // add user assigned in task into subtasks too
    for (const sub of dto.subtasks) {
      if (!sub.assigneeIds.includes(userId)) {
        sub.assigneeIds.push(userId);
      }
    }

    const task = await this.db.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        timeEstimate: dto.timeEstimate,
        deadline: dto.deadline,
        supervisorId: dto.supervisorId,

        subtasks: {
          create: dto.subtasks.map((sub) => ({
            title: sub.title,
            description: sub.description,
            status: dto.status,
            priority: dto.priority,
            timeEstimate: dto.timeEstimate,
            deadline: dto.deadline,
            supervisorId: dto.supervisorId,

            assignees: {
              create: sub.assigneeIds.map((userId) => ({ userId })),
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
      include: {
        assignees: {
          include: {
            user: true,
          },
        },
        supervisor: true,
        subtasks: {
          include: {
            assignees: {
              include: {
                user: true,
              },
            },
            supervisor: true,
          },
        },
      },
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
              OR: [{ project: { ownerId: userId } }, { project: { memberships: { some: { userId } } } }],
            },
          },
        },
      },
      include: {
        assignees: {
          include: {
            user: true,
          },
        },
        supervisor: true,
        subtasks: {
          include: {
            assignees: {
              include: {
                user: true,
              },
            },
            supervisor: true,
          },
        },
      },
    });

    if (!task) throw new NotFoundException("Task not found");

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
                OR: [{ ownerId: userId }, { memberships: { some: { userId } } }],
              },
            },
          },
        },
      },
      include: {
        subtasks: true,
        assignees: true,
      },
    });

    if (!task) {
      throw new ForbiddenException("Task not found or you do not have permission.");
    }

    if (task.parentTaskId) {
      throw new BadRequestException("Cannot update a subtask using this endpoint.");
    }

    // Build update data
    const updateData: any = dto;

    // TODO: Update status with rules
    // if (dto.status) {
    //   if (dto.status === TaskStatus.TODO) {

    //   }
    // }

    //  Update assignees
    if (dto.assigneeIds) {
      updateData.assignees = {
        deleteMany: {}, // Clear all old assignees
        create: dto.assigneeIds.map((uid) => ({ userId: uid })),
      };
    }

    // Update subtasks
    if (dto.subtasks) {
      const existingSubIds = task.subtasks.map((s) => s.id);
      const incomingSubIds = dto.subtasks.filter((s) => s.id).map((s) => s.id);

      // Delete subtasks that are removed
      const toDelete = existingSubIds.filter((id) => !incomingSubIds.includes(id));

      updateData.subtasks = {
        deleteMany: toDelete.length ? { id: { in: toDelete } } : undefined,
        upsert: dto.subtasks.map((sub) => ({
          where: { id: sub.id ?? "___invalid___" }, // Prisma trick
          create: {
            title: sub.title,
            description: sub.description,
            status: sub.status || dto.status,
            priority: dto.priority,
            timeEstimate: dto.timeEstimate,
            deadline: dto.deadline,
            supervisorId: dto.supervisorId,
            assignees: {
              create: sub.assigneeIds?.map((uid) => ({ userId: uid })) ?? [],
            },
          },
          update: {
            title: sub.title,
            description: sub.description,
            status: sub.status || dto.status,
            priority: dto.priority,
            timeEstimate: dto.timeEstimate,
            deadline: dto.deadline,
            supervisorId: dto.supervisorId,
            assignees: sub.assigneeIds
              ? {
                  deleteMany: {},
                  create: sub.assigneeIds.map((uid) => ({ userId: uid })),
                }
              : undefined,
          },
        })),
      };
    }

    // Execute update
    const updated = await this.db.task.update({
      where: { id: taskId },
      data: updateData,
      include: {
        assignees: { include: { user: true } },
        supervisor: true,
        subtasks: {
          include: {
            assignees: { include: { user: true } },
            supervisor: true,
          },
        },
      },
    });

    return new TaskResponseDto(updated, "Task updated successfully");
  }

  async moveTask(userId: string, taskId: string, dto: MoveTaskDto) {
    const { fromSectionId, toSectionId, insertAt } = dto;

    const task = await this.db.task.findUnique({
      where: { id: taskId },
      include: {
        tasksOfSection: true,
      },
    });

    if (!task) throw new NotFoundException("Task not found");
    if (task.parentTaskId) {
      throw new BadRequestException("Cannot move a subtask using this endpoint.");
    }

    const sections = await this.db.section.findMany({
      where: { id: { in: [fromSectionId, toSectionId] } },
      include: {
        project: {
          include: { memberships: true },
        },
      },
    });

    const fromSection = sections.find((s) => s.id === fromSectionId);
    const toSection = sections.find((s) => s.id === toSectionId);

    if (!fromSection || !toSection || fromSection.projectId !== toSection.projectId) {
      throw new BadRequestException("Invalid source or target section");
    }

    // Check permission (user must belong to project)
    const project = fromSection.project;
    const isOwner = project.ownerId === userId;
    const isMember = project.memberships.some((m) => m.userId === userId);

    if (!isOwner && !isMember) {
      throw new ForbiddenException("You do not have permission to move task");
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

  async remove(userId: string, taskId: string, isPersonal: boolean = false) {
    const task = await this.db.task.findUnique({
      where: { id: taskId },
      include: {
        tasksOfSection: {
          include: {
            section: {
              include: { project: true },
            },
          },
        },
      },
    });

    if (!task) throw new NotFoundException("Task not found");

    const sections = task.tasksOfSection.map((tos) => tos.section);
    if (sections.length === 0) throw new BadRequestException("Task does not belong to any project");

    // Check permission: owner or member of any project containing the task
    const projectIds = sections.map((s) => s.project.id);
    const membership = await this.db.userInProject.findFirst({
      where: {
        userId,
        projectId: { in: projectIds },
      },
    });

    const isOwner = sections.some((s) => s.project.ownerId === userId);

    if (!membership && !isOwner) {
      throw new ForbiddenException("You do not have permission to delete this task");
    }

    // Delete task and remove from section lists using transaction
    const sectionUpdates = sections.map((section) => {
      const currentList: string[] = JSON.parse(section.listOfTask);
      const updatedList = currentList.filter((id) => id !== taskId);
      return this.db.section.update({
        where: { id: section.id },
        data: { listOfTask: JSON.stringify(updatedList) },
      });
    });

    await this.db.$transaction([...sectionUpdates, this.db.task.delete({ where: { id: taskId } })]);

    return new MessageResponseDto("Task deleted successfully");
  }

  // async importTask(taskId: string, dto: ImportTaskDto, userId: string) {
  //   const { toSectionId, projectId } = dto;

  //   const task = await this.db.task.findUnique({
  //     where: { id: taskId },
  //     include: { tasksOfSection: true },
  //   });
  //   if (!task) throw new NotFoundException("Task not found");

  //   const sourceSection = task.tasksOfSection[0];
  //   if (!sourceSection) throw new NotFoundException("Source task not in section");

  //   // await this.ensureUserCanAccessProject(sourceSection.section.projectId, userId);
  //   await this.ensureUserCanAccessProject(projectId, userId);

  //   const targetSection = await this.db.section.findUnique({
  //     where: { id: toSectionId, projectId },
  //   });
  //   if (!targetSection) throw new NotFoundException("Target section not found");

  //   const newTask = await this.db.task.create({
  //     data: {
  //       title: task.title,
  //       description: task.description,
  //       status: task.status,
  //       priority: task.priority,
  //       startDate: task.startDate,
  //       dueDate: task.dueDate,
  //       parentTaskId: null,
  //       supervisorId: task.supervisorId,
  //     },
  //   });

  //   await this.db.taskOfSection.create({
  //     data: { taskId: newTask.id, sectionId: toSectionId },
  //   });

  //   const currentList = this.parseTaskList(targetSection.listOfTask);
  //   await this.updateSectionTaskOrder(toSectionId, [...currentList, newTask.id]);

  //   const assignees = await this.db.taskOfUser.findMany({
  //     where: { taskId },
  //     select: { userId: true },
  //   });
  //   if (assignees.length > 0) {
  //     await this.assignTaskToUsers(
  //       newTask.id,
  //       assignees.map((a) => a.userId),
  //     );
  //   }

  //   return newTask;
  // }

  // HELPER: Quyền project
  private updateTaskStatus() {}
}
