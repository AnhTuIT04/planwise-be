import { Prisma } from "prisma/client";

export function buildGetTaskStatusQuery() {
  return {
    include: {
      subtasks: true,
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export type GetTaskStatusQueryResult = Prisma.TaskGetPayload<ReturnType<typeof buildGetTaskStatusQuery>>;
