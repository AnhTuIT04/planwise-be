import { Prisma } from "prisma/client";

export function buildGetSubtaskStatusQuery() {
  return {
    include: {
      parent: {
        include: {
          subtasks: true,
        },
      },
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export type GetSubtaskStatusQueryResult = Prisma.TaskGetPayload<ReturnType<typeof buildGetSubtaskStatusQuery>>;
