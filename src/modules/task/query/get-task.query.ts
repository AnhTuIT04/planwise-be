import { type Prisma, type Project } from "prisma/client/pg";

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
        },
        orderBy: { position: "asc" },
      },
      originalProject: true,
    },
  } as const satisfies Omit<Prisma.TaskFindUniqueArgs, "where">;
}

export interface GetTaskQueryResult extends Omit<
  Prisma.TaskGetPayload<ReturnType<typeof buildGetTaskQuery>>,
  "originalProject"
> {
  originalProject: Project | null;
  canImport: boolean;
  isImported: boolean;
  gmailBodyHtml: string | null;
  gmailMessageId: string | null;
  calendarEventId: string | null;
}
