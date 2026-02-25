import { Prisma } from "prisma/client/pg";

export function buildGetSubtaskStatusQuery() {
  return {
    include: {
      parentTask: {
        include: {
          subtasks: true,
        },
      },
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export type GetSubtaskStatusQueryResult = Prisma.TaskGetPayload<ReturnType<typeof buildGetSubtaskStatusQuery>>;
