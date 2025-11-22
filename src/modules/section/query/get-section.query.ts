import { Prisma } from "prisma/client";
import { buildGetTaskQuery } from "@/modules/task/query/get-task.query";

interface BuildGetSectionQueryOptions {
  getArchivedTasks?: boolean;
}

export function buildGetSectionQuery({ getArchivedTasks }: BuildGetSectionQueryOptions = {}) {
  return {
    include: {
      tasksOfSection: {
        where: getArchivedTasks
          ? {}
          : {
              task: {
                status: { not: "ARCHIVED" },
              },
            },
        include: {
          task: {
            ...buildGetTaskQuery(),
          },
        },
      },
    },
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export type GetSectionQueryResult = Prisma.SectionGetPayload<ReturnType<typeof buildGetSectionQuery>>;
