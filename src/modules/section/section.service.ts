import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { DetailedSectionResponseDto, CreateSectionDto, UpdateSectionDto, DeleteSectionDto } from "./dto";
import { TaskService } from "../task/task.service";

@Injectable()
export class SectionService {
  constructor(
    private db: DatabaseService,
    private taskService: TaskService,
  ) {}

  async create(userId: string, dto: CreateSectionDto) {
    const { name, projectId } = dto;

    await this.ensureUserCanAccessProject(projectId, userId);

    const section = await this.db.section.create({
      data: {
        name,
        projectId,
        listOfTask: "[]",
      },
    });

    const project = await this.db.project.findUnique({ where: { id: projectId } });
    if(!project){
      throw new NotFoundException("Project not found");
    }
    const currentList = project.listOfSection ? JSON.parse(project.listOfSection) : [];
    currentList.push(section.id);

    await this.db.project.update({
      where: { id: projectId },
      data: { listOfSection: JSON.stringify(currentList) },
    });

    return section;
  }

  async update(sectionId: string, dto: UpdateSectionDto, userId: string) {
    const { name, listOfTask, projectId } = dto;

    await this.ensureUserCanAccessProject(projectId, userId);

    const section = await this.db.section.findUnique({
      where: { id: sectionId, projectId },
    });

    if (!section) {
      throw new NotFoundException("Section not found or does not belong to the project");
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (listOfTask !== undefined) updateData.listOfTask = JSON.stringify(listOfTask);

    return this.db.section.update({
      where: { id: sectionId },
      data: updateData,
    });
  }

  async remove(sectionId: string, dto: DeleteSectionDto, userId: string) {
    const { projectId } = dto;

    const project = await this.ensureUserCanAccessProject(projectId, userId);

    const section = await this.db.section.findUnique({
      where: { id: sectionId, projectId },
    });

    if (!section) {
      throw new NotFoundException("Section not found");
    }
    const taskInSection = await this.db.taskOfSection.findFirst({
      where: { sectionId },
    });

    if (taskInSection) {
      throw new Error("Cannot delete section with existing tasks");
    }

    if (project.isPersonal && section.name === "Default") {
      throw new Error("Cannot delete default section in your workspace");
    }

    await this.db.section.delete({ where: { id: sectionId } });

    const currentList = project.listOfSection ? JSON.parse(project.listOfSection) : [];
    const updatedList = currentList.filter((id: string) => id !== sectionId);

    await this.db.project.update({
      where: { id: projectId },
      data: { listOfSection: JSON.stringify(updatedList) },
    });

    return { success: true };
  }

  async getDetailedSectionsByProject(projectId: string, userId: string) {
    await this.ensureUserCanAccessProject(projectId, userId);

    const project = await this.db.project.findUnique({
      where: { id: projectId },
      select: { listOfSection: true },
    });
    if (!project) throw new NotFoundException("Project not found");

    const sectionOrder = project.listOfSection ? JSON.parse(project.listOfSection) : [];

    const sections = await this.db.section.findMany({
      where: { projectId },
      select: { id: true, name: true, listOfTask: true, createdAt: true },
    });

    const orderedSections = sectionOrder
      .map((id: string) => sections.find((s) => s.id === id))
      .filter(Boolean);
    const remaining = sections.filter((s) => !sectionOrder.includes(s.id));
    const finalSections = [...orderedSections, ...remaining];

    const taskOfSections = await this.db.taskOfSection.findMany({
      where: { section: { projectId } },
      include: {
        task: {
          include: {
            assignees: {
              include: { user: { select: { email: true, fullname: true, avatarUrl: true } } },
            },
            subtasks: { 
              include: {
                assignees: {
                  include: { user: { select: { email: true, fullname: true, avatarUrl: true } } },
                },
              },
            },
          },
        },
      },
    });

    const taskMap = new Map<string, any>();
    taskOfSections.forEach((tos) => {
      const task = tos.task;
      taskMap.set(task.id, task);
    });

    const result = finalSections.map((section) => {
      const taskIds = section.listOfTask ? JSON.parse(section.listOfTask) : [];

      const parentTasks = taskIds
        .map((id: string) => taskMap.get(id))
        .filter(Boolean);

      return {
        ...section,
        listOfTask: taskIds,
        tasks: parentTasks,
      };
    });

    return result;
  }
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

    if (!project) {
      throw new NotFoundException("Project not found or you don't have access");
    }

    return project;
  }
}
