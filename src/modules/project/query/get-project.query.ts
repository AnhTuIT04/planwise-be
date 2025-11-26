import { Prisma } from "prisma/client";

interface BuildGetProjectQueryOptions {
  getArchivedTasks?: boolean;
}

export function buildGetProjectQuery({ getArchivedTasks }: BuildGetProjectQueryOptions = {}) {
  return {
    include: {
      owner: true,
      _count: {
        select: {
          members: true,
          sections: true,
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
  } as const satisfies Omit<Prisma.ProjectFindUniqueArgs, "where">;
}

export type GetProjectQueryResult = Prisma.ProjectGetPayload<ReturnType<typeof buildGetProjectQuery>>;
