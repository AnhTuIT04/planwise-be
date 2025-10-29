import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { DetailedSectionResponseDto, CreateSectionDto, UpdateSectionDto } from "./dto";
import { TaskService } from "../task/task.service";

@Injectable()
export class SectionService {
  constructor(
    private db: DatabaseService,
    private taskService: TaskService,
  ) {}

  async create(userId: string, createSectionDto: CreateSectionDto) {
    return this.db.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: createSectionDto.projectId },
      });
      if (!project) {
        throw new NotFoundException("Project not found");
      }

      const section = await tx.section.create({
        data: createSectionDto,
      });

      // Update listOfSection for this project
      await tx.project.update({
        data: { listOfSection: project.listOfSection ? project.listOfSection + `,${section.id}` : `${section.id}` },
        where: { id: createSectionDto.projectId },
      });

      return section;
    });
  }

  async update(sectionId: string, updateSectionDto: UpdateSectionDto, userId: string) {
    const existingSection = await this.db.section.findUnique({
      where: { id: sectionId, projectId: updateSectionDto.projectId },
    });

    if (!existingSection) {
      throw new NotFoundException("Section not found or does not belong to the specified project");
    }

    return this.db.section.update({
      where: { id: sectionId },
      data: updateSectionDto,
    });
  }

  async remove(sectionId: string, userId: string) {
    const numberOfTasks = await this.db.task.count({
      where: { sectionId: sectionId },
    });

    if (numberOfTasks > 0) {
      throw new Error("Cannot delete section with existing tasks");
    }

    const section = await this.db.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException("Section not found");
    }

    const project = await this.db.project.findUnique({
      where: { id: section.projectId },
    });

    if (project?.isPersonal && section.name === "Default") {
      throw new Error("Cannot delete default section in your workspace");
    }

    return this.db.section.delete({
      where: { id: sectionId },
    });
  }

  async getDetailedSectionsByProject(projectId: string, userId: string): Promise<DetailedSectionResponseDto[]> {
    // First get all sections for the project
    const sections = await this.db.section.findMany({
      where: {
        projectId: projectId,
      },
    });

    // Then get tasks for each section using the existing TaskService method
    const sectionsWithTasks = await Promise.all(
      sections.map(async (section) => {
        const tasks = await this.taskService.getTasksBySection(section.id);
        return {
          ...section,
          listOfTask: section.listOfTask, // Convert JSON string to array
          tasks: tasks,
        };
      }),
    );

    return sectionsWithTasks;
  }
}
