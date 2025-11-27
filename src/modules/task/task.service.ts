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
import { midpoint } from "@/common/utils";

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  async create(userId: string, dto: CreateTaskDto) {
    const { projectId, sectionId } = dto;
    const section = await this.db.section.findFirst({
      where: {
        id: sectionId,
        projectId,
        project: {
          members: { some: { userId } },
        },
      },
      include: {
        tasks: {
          orderBy: { position: 'asc' },
        },
        
      }
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
    const currentPos: string[] = section.tasks.map(t => t.position);
    let newTaskPosition;
    if (dto.insertAt !== undefined) {
      if(dto.insertAt > 0 && dto.insertAt < section.tasks.length) { // insert in middle
        newTaskPosition = midpoint(
          currentPos[dto.insertAt - 1],
          currentPos[dto.insertAt]
        );
      } else if (dto.insertAt <= 0) { // insert at beginning
        newTaskPosition = midpoint(null, currentPos[0]);
      }
    } else { // no insertAt provided or insertAt === currentPos.length, add to end
      newTaskPosition = midpoint(currentPos[currentPos.length - 1], null);
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
        originalProjectId: projectId,
        subtasks: {
          create: dto.subtasks.map((sub) => ({
            title: sub.title,
            description: sub.description,
            status: dto.status,
            priority: dto.priority,
            estimate: sub.estimate,
            deadline: dto.deadline,
            supervisorId: dto.supervisorId,
            originalProjectId: projectId,
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
        sections: {
          create: {
            sectionId: section.id,
            position: newTaskPosition,
          },
        },
      },
      ...buildGetTaskQuery(),
    });
    return new TaskResponseDto(task, "Task created successfully");
  }

  async getById(userId: string, taskId: string) {
    // TODO: user can share task in future
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        sections: {
          some: {
            section: {
              project: { members: { some: { userId } } },
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
    const { sectionId } = dto;
    const task = await this.db.task.findFirst({
      where: {
        id: taskId,
        sections: {
          some: {
            section: {
              id: sectionId,
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

    if (!task) throw new ForbiddenException("Task not found or you do not have permission.");
    
    const tasks = await this.db.taskSection.findMany({
      where: { sectionId },
      orderBy: { position: 'asc' },
    })
    
    let newTaskPosition : string | undefined = undefined;
    if (dto.moveTo !== undefined) {
      if(dto.moveTo > 0 && dto.moveTo < tasks.length) { // move in middle
        newTaskPosition = midpoint(
          tasks[dto.moveTo - 1].position,
          tasks[dto.moveTo].position
        );
      } else if (dto.moveTo <= 0) { // move to beginning
        newTaskPosition = midpoint(null, tasks[0].position);
      } else { // move to end
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
            where: { taskId_sectionId: { taskId, sectionId } },
            data: {
              position: newTaskPosition,
            }
          }
        }
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
        sections: {
          some: {
            section: {
              project: { members: { some: { userId } } },
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
        sections: {
          some: {
            section: {
              project: { members: { some: { userId } } },
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
    if (!task) throw new ForbiddenException("Task not found or you do not have permission.");
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
          orderBy: { position: 'asc' },
        },
      }
    });
    if (!fromSection || !toSection || fromSection.projectId !== toSection.projectId) {
      throw new BadRequestException("Invalid source or target section");
    }

    // Calculate new position in target section
    const currentPosToSection: string[] = toSection.tasks.map(t => t.position);
    let newTaskPosition;
    if (insertAt > 0 && insertAt < currentPosToSection.length) {
      newTaskPosition = midpoint(
        currentPosToSection[insertAt - 1],
        currentPosToSection[insertAt]
      );
    } else if (insertAt <= 0) {
      newTaskPosition = midpoint(null, currentPosToSection[0]);
    } else {
      newTaskPosition = midpoint(currentPosToSection[currentPosToSection.length - 1], null);
    }
    // Transaction: update TaskSection join table
    await this.db.$transaction([
      // Remove old relation
      this.db.taskSection.delete({
        where: {
          taskId_sectionId: {
            taskId,
            sectionId: fromSectionId,
          },
        },
      }),
      // Create new relation
      this.db.taskSection.create({
        data: {
          taskId,
          sectionId: toSectionId,
          position: newTaskPosition,
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
        sections: {
          some: {
            section: {
              projectId: fromProjectId,
              project: {
                members: { some: { userId } },
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
          ownerId: userId,
        },
      },
      include: {
        project: true,
        tasks: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!targetSection) {
      throw new ForbiddenException("Target section not found or you do not have permission");
    }

    if (targetSection.projectId === fromProjectId) {
      throw new BadRequestException("Cannot import task to the same project. Use move instead");
    }

    const existingRelation = await this.db.taskSection.findUnique({
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

    // Calculate new position in target section
    const currentPosTargetSection: string[] = targetSection.tasks.map(t => t.position);
    let newTaskPosition;
    if (insertAt > 0 && insertAt < currentPosTargetSection.length) {
      newTaskPosition = midpoint(
        currentPosTargetSection[insertAt - 1],
        currentPosTargetSection[insertAt]
      );
    } else if (insertAt <= 0) {
      newTaskPosition = midpoint(null, currentPosTargetSection[0]);
    } else {
      newTaskPosition = midpoint(currentPosTargetSection[currentPosTargetSection.length - 1], null);
    }

    // Thêm task vào target section
    await this.db.taskSection.create({
      data: {
        taskId,
        sectionId: toSectionId,
        position: newTaskPosition,
      },
    });
    
    return new MessageResponseDto("Task imported successfully");
  }

  async remove(userId: string, taskId: string, dto: DeleteTaskDto) {
    const { projectId } = dto;
    const task = await this.db.task.findUnique({
      where: {
        id: taskId,
        sections: {
          some: {
            section: {
              projectId,
              project: {
                members: { some: { userId } },
              },
            },
          },
        },
      },
      include: {
        sections: {
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
    const sections = task.sections.map((tos) => tos.section);
    if (sections.length === 0) throw new BadRequestException("Task does not belong to this project");
    const project = sections.find((sec) => sec.project.id === projectId)!.project;

    if (project.isPersonal) {
      // Personal project: chỉ xóa khỏi TaskSection
      const sectionProject = sections.filter((sec) => sec.project.id === projectId);
      
      const deleteRelations = sectionProject.map((section) =>
        this.db.taskSection.delete({
          where: {
            taskId_sectionId: {
              taskId,
              sectionId: section.id,
            },
          },
        }),
      );
      await this.db.$transaction([ ...deleteRelations]);
    } else {
      // Non-personal project: xóa task hoàn toàn khỏi tất cả project
      await this.db.$transaction([this.db.task.delete({ where: { id: taskId } })]);
    }
    return new MessageResponseDto("Task deleted successfully");
  }
}
