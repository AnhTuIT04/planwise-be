import { Prisma } from "prisma/client";
import { buildGetSectionQuery } from "@/modules/section/query/get-section.query";

interface BuildGetProjectQueryOptions {
  getArchivedTasks?: boolean;
}

export function buildGetProjectQuery({ getArchivedTasks }: BuildGetProjectQueryOptions = {}) {
  return {
    include: {
      memberships: {
        select: {
          role: true,
          user: true,
        },
      },
      roles: true,
      sections: buildGetSectionQuery({ getArchivedTasks }),
    },
  } as const satisfies Omit<Prisma.ProjectFindUniqueArgs, "where">;
}

export type GetProjectQueryResult = Prisma.ProjectGetPayload<ReturnType<typeof buildGetProjectQuery>>;
