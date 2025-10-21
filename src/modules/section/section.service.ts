import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { DetailedSectionResponseDto, CreateSectionDto, UpdateSectionDto } from "./dto";
import { TaskService } from "../task/task.service";

@Injectable()
export class SectionService {
  constructor(
    private db: DatabaseService,
    private taskService: TaskService
  ) {}

  create(userId: string, createSectionDto: CreateSectionDto) {
    console.log("Creating section with data:", createSectionDto);
    return this.db.section.create({
      data: createSectionDto
    });
  }

  update(sectionId: string, updateSectionDto: UpdateSectionDto, userId: string) {
    return this.db.section.update({
      where: { id: sectionId },
      data: updateSectionDto
    });
  }

  async remove(sectionId: string, userId: string) {
    const numberOfTasks = await this.db.task.count({
      where: { sectionId: sectionId }
    });

    if (numberOfTasks > 0) {
      throw new Error("Cannot delete section with existing tasks");
    }

    return this.db.section.delete({
      where: { id: sectionId }
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
          tasks: tasks
        };
      })
    );

    return sectionsWithTasks;
  }
}
