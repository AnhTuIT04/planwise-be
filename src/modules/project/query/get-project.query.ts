import { Prisma } from "prisma/client";
import { buildGetSectionQuery } from "@/modules/section/query/get-section.query";

export function buildGetProjectQuery() {
  return {
    include: {
      memberships: {
        select: {
          role: true,
          user: true,
        },
      },
      roles: true,
      sections: buildGetSectionQuery(),
    },
  } as const satisfies Omit<Prisma.ProjectFindUniqueArgs, "where">;
}

export type GetProjectQueryResult = Prisma.ProjectGetPayload<ReturnType<typeof buildGetProjectQuery>>;
