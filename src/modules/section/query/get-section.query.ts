import { Prisma } from "prisma/client";

interface BuildGetSectionQueryOptions {
  getArchivedTasks?: boolean;
}

export function buildGetSectionQuery({ getArchivedTasks }: BuildGetSectionQueryOptions = {}) {
  return {
    include: {
      _count: {
        select: {
          tasks: {
            where: getArchivedTasks
              ? {}
              : {
                  task: {
                    status: {
                      not: "ARCHIVED",
                    },
                  },
                },
          },
        },
      },
    },
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export type GetSectionQueryResult = Prisma.SectionGetPayload<ReturnType<typeof buildGetSectionQuery>>;
