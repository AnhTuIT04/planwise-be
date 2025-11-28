import { PriorityLevel, Prisma, TaskStatus } from "prisma/client";
import { buildGetTaskQuery, GetTaskQueryResult } from "@/modules/task/query/get-task.query";

interface BuildGetProjectTasksQueryOptions {
  qDeadlineFrom?: Date;
  qDeadlineTo?: Date;
  qSections?: string[];
  qStatuses?: TaskStatus[];
  aPriorities?: PriorityLevel[];
  searchQuery?: string;
}

export function buildGetProjectTasksQuery({
  qDeadlineFrom,
  qDeadlineTo,
  qSections,
  qStatuses = [TaskStatus.TODO, TaskStatus.RUNNING, TaskStatus.DONE],
  aPriorities,
  searchQuery,
}: BuildGetProjectTasksQueryOptions = {}) {
  return {
    include: {
      tasks: {
        where: {
          task: {
            ...(qDeadlineFrom && { deadline: { gte: qDeadlineFrom } }),
            ...(qDeadlineTo && { deadline: { lte: qDeadlineTo } }),
            ...(qSections && qSections.length > 0 && { sectionId: { in: qSections } }),
            ...(qStatuses && qStatuses.length > 0 && { status: { in: qStatuses } }),
            ...(aPriorities && aPriorities.length > 0 && { priority: { in: aPriorities } }),
            ...(searchQuery && {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
              ],
            }),
          },
        },
        include: {
          task: buildGetTaskQuery(),
        },
        orderBy: { position: "asc" },
      },
    },
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export interface GetProjectTasksQueryResult
  extends Omit<Prisma.SectionGetPayload<ReturnType<typeof buildGetProjectTasksQuery>>, "tasks"> {
  tasks: {
    task: GetTaskQueryResult;
  }[];
}
