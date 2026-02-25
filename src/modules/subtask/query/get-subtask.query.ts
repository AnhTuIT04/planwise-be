import { Prisma } from "prisma/client/pg";

export function buildGetSubtaskQuery() {
  return {
    include: {
      assignees: {
        select: {
          user: true,
        },
      },
      supervisor: true,
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export type GetSubtaskQueryResult = Prisma.TaskGetPayload<ReturnType<typeof buildGetSubtaskQuery>>;
