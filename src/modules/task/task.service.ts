// task.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ImportTaskDto } from "./dto/import-task.dto";
import { DatabaseService } from "../database/database.service";
import { TaskStatus, PriorityLevel } from "prisma/client";

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  // CREATE TASK
  // task.service.ts (chỉ phần create)
  async create(dto: CreateTaskDto, userId: string) {
    const {
      projectId,
      sectionId,
      title,
      description,
      status = TaskStatus.TODO,
      priority,
      startDate,
      dueDate,
      parentTaskId,
      supervisorId,
      assigneeIds = [],
      subTask = [],
    } = dto;

    // 1. Kiểm tra quyền project
    await this.ensureUserCanAccessProject(projectId, userId);

    // 2. Kiểm tra section
    const section = await this.db.section.findUnique({
      where: { id: sectionId, projectId },
    });
    if (!section) throw new NotFoundException("Section not found");


    const task = await this.db.task.create({
      data: {
        title,
        description: description ?? null,
        status,
        priority: priority ?? null,
        startDate: startDate ? new Date(startDate) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        parentTaskId: parentTaskId ?? null,
        supervisorId: supervisorId ?? null,
      },
    });

    await this.db.taskOfSection.create({
      data: { taskId: task.id, sectionId },
    });
    const currentList = this.parseTaskList(section.listOfTask);
    await this.updateSectionTaskOrder(sectionId, [...currentList, task.id]);

    if (assigneeIds.length > 0) {
      await this.assignTaskToUsers(task.id, assigneeIds);
    }

    // task.service.ts (chỉ phần tạo subtask)

    if (subTask.length > 0) {
      for (const sub of subTask) {
        // Dùng giá trị từ task cha nếu subtask để null/undefined
        const subPriority = sub.priority ?? priority;
        const subStartDate = sub.startDate ?? startDate;
        const subDueDate = sub.dueDate ?? dueDate;

        const subTaskCreated = await this.db.task.create({
          data: {
            title: sub.title,
            description: sub.description ?? null,
            status: sub.status ?? TaskStatus.TODO,
            priority: subPriority, // Kế thừa nếu null
            startDate: subStartDate ? new Date(subStartDate) : null,
            dueDate: subDueDate ? new Date(subDueDate) : null,
            parentTaskId: task.id,
            supervisorId: null, // subtask không có supervisor
          },
        });

        // Gán subtask vào CÙNG section với task cha
        await this.db.taskOfSection.create({
          data: { taskId: subTaskCreated.id, sectionId },
        });

        // Cập nhật listOfTask trong section (thêm subtask)
        const currentSection = await this.db.section.findUnique({ where: { id: sectionId } });
        const currentList = this.parseTaskList(currentSection!.listOfTask);
        if (!currentList.includes(subTaskCreated.id)) {
          await this.updateSectionTaskOrder(sectionId, [...currentList, subTaskCreated.id]);
        }

        // Gán assignee cho subtask
        if (sub.assigneeIds?.length) {
          await this.assignTaskToUsers(subTaskCreated.id, sub.assigneeIds);
        }
      }
    }

    return task;
  }

  // UPDATE TASK
  async update(taskId: string, dto: UpdateTaskDto, userId: string) {
    const task = await this.db.task.findUnique({
      where: { id: taskId },
      include: {
        tasksOfSection: true, // Sửa: dùng tasksOfSection
      },
    });

    if (!task) throw new NotFoundException("Task not found");

    // Lấy projectId từ TaskOfSection
    const taskSection = task.tasksOfSection[0];
    if (!taskSection) throw new NotFoundException("Task not in any section");

    // await this.ensureUserCanAccessProject(taskSection.section.projectId, userId);

    const updateData: any = { ...dto };

    // Xử lý đổi section
    if (dto.sectionId && dto.sectionId !== taskSection.sectionId) {
      const newSection = await this.db.section.findUnique({
        where: { id: dto.sectionId },
      });
      if (!newSection) throw new NotFoundException("New section not found");

      // Xóa khỏi section cũ
      await this.db.taskOfSection.delete({
        where: {
          taskId_sectionId: { taskId, sectionId: taskSection.sectionId },
        },
      });
      await this.removeTaskFromSectionList(taskSection.sectionId, taskId);

      // Thêm vào section mới
      await this.db.taskOfSection.create({
        data: { taskId, sectionId: dto.sectionId },
      });
      await this.updateSectionTaskOrder(dto.sectionId, [
        ...this.parseTaskList(newSection.listOfTask),
        taskId,
      ]);
    }

    // Cập nhật assignee
    if (dto.assigneeIds !== undefined) {
      await this.db.taskOfUser.deleteMany({ where: { taskId } });
      if (dto.assigneeIds.length > 0) {
        await this.assignTaskToUsers(taskId, dto.assigneeIds);
      }
    }

    return this.db.task.update({
      where: { id: taskId },
      data: updateData,
    });
  }

  // DELETE TASK
  async remove(taskId: string, userId: string, isPersonal: boolean = false) {
    const task = await this.db.task.findUnique({
      where: { id: taskId },
      include: {
        tasksOfSection: true,
        subtasks: true,
        assignees: true,
      },
    });

    if (!task) throw new NotFoundException("Task not found");

    const taskSection = task.tasksOfSection[0];
    if (!taskSection) throw new NotFoundException("Task not in any section");

    // const project = await this.db.project.findUnique({
    //   where: { id: taskSection.section.projectId },
    // });
    // if (!project) throw new NotFoundException("Project not found");

    // Kiểm tra quyền
    // if (isPersonal) {
    //   if (!project.isPersonal || project.ownerId !== userId) {
    //     throw new ForbiddenException("Not allowed in personal project");
    //   }
    // } else {
    //   await this.ensureUserCanAccessProject(project.id, userId);
    // }

    if (task.subtasks.length > 0) {
      throw new ForbiddenException("Cannot delete task with subtasks");
    }

    // Xóa TaskOfSection → cập nhật listOfTask
    await this.db.taskOfSection.delete({
      where: {
        taskId_sectionId: { taskId, sectionId: taskSection.sectionId },
      },
    });
    await this.removeTaskFromSectionList(taskSection.sectionId, taskId);

    // Xóa assignees
    await this.db.taskOfUser.deleteMany({ where: { taskId } });

    // Xóa task
    return this.db.task.delete({ where: { id: taskId } });
  }

  // IMPORT TASK
  async importTask(taskId: string, dto: ImportTaskDto, userId: string) {
    const { toSectionId, projectId } = dto;

    const task = await this.db.task.findUnique({
      where: { id: taskId },
      include: { tasksOfSection: true },
    });
    if (!task) throw new NotFoundException("Task not found");

    const sourceSection = task.tasksOfSection[0];
    if (!sourceSection) throw new NotFoundException("Source task not in section");

    // await this.ensureUserCanAccessProject(sourceSection.section.projectId, userId);
    await this.ensureUserCanAccessProject(projectId, userId);

    const targetSection = await this.db.section.findUnique({
      where: { id: toSectionId, projectId },
    });
    if (!targetSection) throw new NotFoundException("Target section not found");

    // Tạo bản sao task
    const newTask = await this.db.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        dueDate: task.dueDate,
        parentTaskId: null,
        supervisorId: task.supervisorId,
      },
    });

    // Gán vào section mới
    await this.db.taskOfSection.create({
      data: { taskId: newTask.id, sectionId: toSectionId },
    });

    const currentList = this.parseTaskList(targetSection.listOfTask);
    await this.updateSectionTaskOrder(toSectionId, [...currentList, newTask.id]);

    // Copy assignees
    const assignees = await this.db.taskOfUser.findMany({
      where: { taskId },
      select: { userId: true },
    });
    if (assignees.length > 0) {
      await this.assignTaskToUsers(newTask.id, assignees.map((a) => a.userId));
    }

    return newTask;
  }

  // HELPER: Cập nhật listOfTask
  private async updateSectionTaskOrder(sectionId: string, taskIds: string[]) {
    await this.db.section.update({
      where: { id: sectionId },
      data: { listOfTask: JSON.stringify(taskIds) },
    });
  }

  private async removeTaskFromSectionList(sectionId: string, taskId: string) {
    const section = await this.db.section.findUnique({ where: { id: sectionId } });
    if (!section) return;
    const list = this.parseTaskList(section.listOfTask);
    const updated = list.filter((id: string) => id !== taskId);
    await this.updateSectionTaskOrder(sectionId, updated);
  }

  private parseTaskList(json: string): string[] {
    try {
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }

  // HELPER: Quyền project
  private async ensureUserCanAccessProject(projectId: string, userId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { ownerId: userId },
          { memberships: { some: { userId } } },
        ],
      },
    });
    if (!project) throw new ForbiddenException("Access denied");
    return project;
  }

  // Gán user
  async assignTaskToUsers(taskId: string, userIds: string[]) {
    await this.db.taskOfUser.deleteMany({ where: { taskId } });
    if (userIds.length === 0) return;
    await this.db.taskOfUser.createMany({
      data: userIds.map((userId) => ({ taskId, userId })),
    });
  }

  // Lấy task theo ID
  async getTasksByIds(taskIds: string[]) {
    if (taskIds.length === 0) return [];
    return this.db.task.findMany({
      where: { id: { in: taskIds } },
      include: {
        assignees: {
          include: { user: { select: { email: true, fullname: true, avatarUrl: true } } },
        },
      },
    });
  }
}