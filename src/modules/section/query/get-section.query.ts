import { Prisma, TaskStatus } from "prisma/client";

interface BuildGetSectionQueryOptions {
  qStatuses?: TaskStatus[];
}

export function buildGetSectionQuery(
  { qStatuses }: BuildGetSectionQueryOptions = { qStatuses: [TaskStatus.TODO, TaskStatus.RUNNING, TaskStatus.DONE] },
) {
  return {
    include: {
      _count: {
        select: {
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
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export type GetSectionQueryResult = Prisma.SectionGetPayload<ReturnType<typeof buildGetSectionQuery>>;
