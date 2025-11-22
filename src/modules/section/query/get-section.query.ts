import { Prisma } from "prisma/client";
import { buildGetTaskQuery } from "@/modules/task/query/get-task.query";

export function buildGetSectionQuery() {
  return {
    include: {
      tasksOfSection: {
        include: {
          task: buildGetTaskQuery(),
        },
      },
    },
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export type GetSectionQueryResult = Prisma.SectionGetPayload<ReturnType<typeof buildGetSectionQuery>>;
