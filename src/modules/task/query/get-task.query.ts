import { Prisma, Project } from "prisma/client";

export function buildGetTaskQuery() {
  return {
    include: {
      assignees: {
        select: {
          user: true,
        },
      },
      supervisor: true,
      subtasks: {
        include: {
          assignees: {
            select: {
              user: true,
            },
          },
          supervisor: true,
        },
      },
      originalProject: true,
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export interface GetTaskQueryResult
  extends Omit<Prisma.TaskGetPayload<ReturnType<typeof buildGetTaskQuery>>, "originalProject"> {
  originalProject: Project | null;
  canImport: boolean;
  isImported: boolean;
}
