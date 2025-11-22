import { Prisma } from "prisma/client";

export function buildGetTaskQuery() {
  return {
    include: {
      assignees: {
        select: {
          user: true,
        },
      },
      supervisor: true,
      subtasks: {
        include: {
          assignees: {
            select: {
              user: true,
            },
          },
          supervisor: true,
        },
      },
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export type GetTaskQueryResult = Prisma.TaskGetPayload<ReturnType<typeof buildGetTaskQuery>>;

export function buildGetTaskStatsQuery() {
  return {
    include: {
      subtasks: true,
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export type GetTaskStatsQueryResult = Prisma.TaskGetPayload<ReturnType<typeof buildGetTaskStatsQuery>>;
