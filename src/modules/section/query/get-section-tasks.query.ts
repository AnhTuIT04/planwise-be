import { type PriorityLevel, type Prisma, TaskStatus } from "prisma/client/pg";
import { buildGetTaskQuery, type GetTaskQueryResult } from "~/task/query/get-task.query";

interface BuildGetSectionTasksQueryOptions {
  page?: number;
  limit?: number;
  qDeadlineFrom?: Date;
  qDeadlineTo?: Date;
  qSections?: string[];
  qStatuses?: TaskStatus[];
  qPriorities?: PriorityLevel[];
  searchQuery?: string;
}

export function buildGetSectionTasksFilter(
  options: Omit<BuildGetSectionTasksQueryOptions, "page" | "limit" | "qSections">,
) {
  const { qDeadlineFrom, qDeadlineTo, qStatuses, qPriorities, searchQuery } = options;

  return {
    ...((qDeadlineFrom || qDeadlineTo) && {
      deadline: {
        ...(qDeadlineFrom && { gte: qDeadlineFrom }),
        ...(qDeadlineTo && { lte: qDeadlineTo }),
      },
    }),
    ...(qStatuses?.length && { status: { in: qStatuses } }),
    ...(qPriorities?.length && { priority: { in: qPriorities } }),
    ...(searchQuery && {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    }),
  } as const satisfies Prisma.TaskWhereInput;
}

export function buildGetSectionTasksQuery(
  { page = 1, limit = 20, qSections, ...options }: BuildGetSectionTasksQueryOptions = {
    qStatuses: [TaskStatus.TODO, TaskStatus.RUNNING, TaskStatus.DONE],
  },
) {
  const taskFilter = buildGetSectionTasksFilter(options);
  const taskSectionWhere: Prisma.TaskSectionWhereInput = {
    ...(qSections?.length && { sectionId: { in: qSections } }),
    task: taskFilter,
  };

  return {
    include: {
      _count: {
        select: {
          tasks: {
            where: taskSectionWhere,
          },
        },
      },
      tasks: {
        skip: (page - 1) * limit,
        take: limit,
        where: taskSectionWhere,
        include: {
          task: buildGetTaskQuery(),
        },
        orderBy: { position: "asc" },
      },
    },
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export interface GetSectionTasksQueryResult extends Omit<
  Prisma.SectionGetPayload<ReturnType<typeof buildGetSectionTasksQuery>>,
  "tasks"
> {
  tasks: {
    data: GetTaskQueryResult[];
    pagination: {
      page: number;
      limit: number;
    };
  };
}
