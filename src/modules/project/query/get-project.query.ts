import { Prisma, TaskStatus } from "prisma/client/pg";

interface BuildGetProjectQueryOptions {
  qStatuses?: TaskStatus[];
}

export function buildGetProjectQuery(
  { qStatuses }: BuildGetProjectQueryOptions = { qStatuses: [TaskStatus.TODO, TaskStatus.RUNNING, TaskStatus.DONE] },
) {
  return {
    include: {
      owner: true,
      _count: {
        select: {
          members: true,
          sections: true,
          tasks: {
            where: {
              task: {
                ...(qStatuses && qStatuses.length > 0 && { status: { in: qStatuses } }),
              },
            },
          },
        },
      },
    },
  } as const satisfies Omit<Prisma.ProjectFindUniqueArgs, "where">;
}

export type GetProjectQueryResult = Prisma.ProjectGetPayload<ReturnType<typeof buildGetProjectQuery>>;
