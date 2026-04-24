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

export function buildGetSectionTasksFilter(options: Omit<BuildGetSectionTasksQueryOptions, "page" | "limit">) {
  const { qDeadlineFrom, qDeadlineTo, qSections, qStatuses, qPriorities, searchQuery } = options;

  return {
    ...(qDeadlineFrom && { deadline: { gte: qDeadlineFrom } }),
    ...(qDeadlineTo && { deadline: { lte: qDeadlineTo } }),
    ...(qSections && qSections.length > 0 && { sectionId: { in: qSections } }),
    ...(qStatuses && qStatuses.length > 0 && { status: { in: qStatuses } }),
    ...(qPriorities && qPriorities.length > 0 && { priority: { in: qPriorities } }),
    ...(searchQuery && {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    }),
  } as const satisfies Prisma.TaskWhereInput;
}

export function buildGetSectionTasksQuery(
  { page = 1, limit = 20, ...options }: BuildGetSectionTasksQueryOptions = {
    qStatuses: [TaskStatus.TODO, TaskStatus.RUNNING, TaskStatus.DONE],
  },
) {
  const filter = buildGetSectionTasksFilter(options);

  return {
    include: {
      _count: {
        select: {
          tasks: {
            where: {
              task: filter,
            },
          },
        },
      },
      tasks: {
        skip: (page - 1) * limit,
        take: limit,
        where: {
          task: filter,
        },
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
