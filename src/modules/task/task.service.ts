// tasks.service.ts
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  create(data: CreateTaskDto) {
    // return this.db.task.create({
    //   data: {
    //     title: data.title,
    //     description: data.description,
    //     startDate: data.startDate ? new Date(data.startDate) : undefined,
    //     dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    //     priority: data.priority,
    //     section: data.sectionId ? { connect: { id: data.sectionId } } : undefined,
    //   },
    // });
  }

  findBySection(sectionId: string, userId: string) {
    // return this.db.task.findMany({
    //   where: { sectionId, section: { userId } },
    //   include: { section: true },
    // });
  }

  async findOne(id: string, userId: string) {
    // const task = await this.db.task.findUnique({
    //   where: { id, section: { userId } },
    //   include: { section: true },
    // });
    // if (!task) throw new NotFoundException("Task not found");
    // return task;
  }

  async update(id: string, dto: UpdateTaskDto, userId: string) {
    // Check if the task exists and belongs to the user
    // const existingTask = await this.db.task.findUnique({
    //   where: { id },
    //   include: { section: true },
    // });
    // if (!existingTask || existingTask.section?.userId !== userId) {
    //   throw new ForbiddenException("You are not allowed to update this task");
    // }
    // return this.db.task.update({
    //   where: { id },
    //   data: {
    //     title: dto.title,
    //     description: dto.description,
    //     statusId: dto.statusId,
    //     priority: dto.priority,
    //     startDate: dto.startDate ? new Date(dto.startDate) : undefined,
    //     dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    //     section: dto.sectionId ? { connect: { id: dto.sectionId } } : undefined,
    //   },
    //   include: { section: true },
    // });
  }

  async remove(id: string, userId: string) {
    // const task = await this.db.task.findUnique({
    //   where: { id },
    //   include: { section: true },
    // });
    // if (!task || task.section?.userId !== userId) {
    //   throw new ForbiddenException("You are not allowed to delete this task");
    // }
    // return this.db.task.delete({
    //   where: { id },
    // });
  }
}
