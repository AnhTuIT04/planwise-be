import { Prisma } from "prisma/client";
import { buildGetTaskQuery, GetTaskQueryResult } from "./get-task.query";

interface BuildGetTasksInProjectQueryOptions {
  getArchivedTasks?: boolean;
}

export function buildGetTasksInProjectQuery({ getArchivedTasks }: BuildGetTasksInProjectQueryOptions = {}) {
  return {
    include: {
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
        include: {
          task: buildGetTaskQuery(),
        },
        orderBy: { position: "asc" },
      },
    },
  } as const satisfies Omit<Prisma.SectionFindUniqueArgs, "where">;
}

export interface GetTasksInProjectQueryResult
  extends Omit<Prisma.SectionGetPayload<ReturnType<typeof buildGetTasksInProjectQuery>>, "tasks"> {
  tasks: {
    task: GetTaskQueryResult;
  }[];
}
