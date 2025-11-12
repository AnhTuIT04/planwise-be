import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { DetailedSectionResponseDto, CreateSectionDto, UpdateSectionDto, SectionResponseDto } from "./dto";
import { TaskService } from "../task/task.service";

@Injectable()
export class SectionService {
  constructor(
    private db: DatabaseService,
    private taskService: TaskService,
  ) {}

  create(userId: string, createSectionDto: CreateSectionDto) {
    return this.db.section.create({
      data: createSectionDto,
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

  async getDetailedSectionsByProject(sections: SectionResponseDto[], userId: string): Promise<DetailedSectionResponseDto[]> {
    const sectionIds = sections.map((s) => s.id);

    const tasks = await this.db.taskOfSection.findMany({
      where: { sectionId: { in: sectionIds } },
      select: {
        task: {
          include: {
            assignees: {
              select: {
                user: {
                  select: { email: true, fullname: true, avatarUrl: true },
                },
              }
            },
            subtasks: {
              include: {
                assignees: {
                  select: {
                    user: {
                      select: { email: true, fullname: true, avatarUrl: true },
                    },
                  }
                }
              }
            }
          }
        },
        sectionId: true,
      }
    });

    // Format subtaks by tasks by section
    const tasksBySection = tasks.reduce<Record<string, any[]>>((acc, record) => {
      const t = record.task;
      if (t.parentTaskId) return acc; // skip subtasks
      const transformed = {
        ...t,
        assignees: (t.assignees ?? []).map((ass) => ass.user),
        subtasks: (t.subtasks ?? []).map((sub) => ({
          ...sub,
          assignees: (sub.assignees ?? []).map((ass) => ass.user),
        })),
      };
      (acc[record.sectionId] ||= []).push(transformed);
      return acc;
    }, {});

    const sectionsWithTasks = sections.map((section) => {
      return {
        ...section,
        listOfTask: section.listOfTask,
        tasks: tasksBySection[section.id] ?? [],
      };
    });

    return sectionsWithTasks;
  }
}
