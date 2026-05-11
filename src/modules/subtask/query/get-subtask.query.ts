import { type Prisma } from "prisma/client/pg";
import { buildGetTaskQuery } from "~/task/query/get-task.query";

export function buildGetSubtaskQuery() {
  return {
    include: {
      parentTask: buildGetTaskQuery(),
      assignees: {
        include: {
          user: true,
        },
      },
    },
  } as const satisfies Omit<Prisma.SubtaskFindUniqueArgs, "where">;
}

export type GetSubtaskQueryResult = Prisma.SubtaskGetPayload<ReturnType<typeof buildGetSubtaskQuery>>;
