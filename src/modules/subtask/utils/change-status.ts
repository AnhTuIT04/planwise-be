import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { moveToFirstPosition } from "@/modules/task/utils/change-position";
import { GetSubtaskStatusQueryResult } from "../query/get-subtask-status.query";
import { buildGetSubtaskQuery } from "../query/get-subtask.query";

function getDurationInSecondsFrom(time: Date = new Date()): number {
  const durationInMilliseconds = new Date().getTime() - time.getTime();
  return Math.floor(durationInMilliseconds / 1000);
}

async function changeStatusFrom_TODO_To_RUNNING(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  const runningSubtask = task.parentTask!.subtasks.find((st) => st.status === TaskStatus.RUNNING);
  if (runningSubtask) {
    return db.$transaction(
      async (tx) => {
        await tx.task.update({
          where: { id: runningSubtask.id },
          data: {
            status: TaskStatus.DONE,
            spent: getDurationInSecondsFrom(runningSubtask.lastStarted ?? undefined) + runningSubtask.spent,
          },
        });

        return tx.task.update({
          where: { id: task.id },
          data: {
            status: TaskStatus.RUNNING,
            lastStarted: new Date(),
          },
          ...buildGetSubtaskQuery(),
        });
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );
  }

  return await db.$transaction(
    async (tx) => {
      await moveToFirstPosition(tx, task.parentTaskId!, sectionId);
      return tx.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.RUNNING,
          lastStarted: new Date(),
          parentTask: {
            update: {
              status: TaskStatus.RUNNING,
              lastStarted: new Date(),
            },
          },
        },
        ...buildGetSubtaskQuery(),
      });
    },
    {
      maxWait: 5000,
      timeout: 20000,
    },
  );
}

async function changeStatusFrom_TODO_To_DONE(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
    },
    ...buildGetSubtaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_TODO(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
      spent: getDurationInSecondsFrom(task.lastStarted ?? undefined) + task.spent,
      parentTask: {
        update: {
          status: TaskStatus.TODO,
          spent: getDurationInSecondsFrom(task.parentTask!.lastStarted ?? undefined) + task.parentTask!.spent,
        },
      },
    },
    ...buildGetSubtaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_DONE(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
      spent: getDurationInSecondsFrom(task.lastStarted ?? undefined) + task.spent,
      parentTask: {
        update: {
          status: TaskStatus.TODO,
          spent: getDurationInSecondsFrom(task.parentTask!.lastStarted ?? undefined) + task.parentTask!.spent,
        },
      },
    },
    ...buildGetSubtaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_TODO(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  if (task.parentTask!.status === TaskStatus.DONE) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.TODO,
        parentTask: {
          update: {
            status: TaskStatus.TODO,
          },
        },
      },
      ...buildGetSubtaskQuery(),
    });
  }

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetSubtaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_RUNNING(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

async function changeStatusFrom_TODO_To_ARCHIVED(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Only parentTask tasks can be archived.");
}

async function changeStatusFrom_DONE_To_ARCHIVED(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Only parentTask tasks can be archived.");
}

async function changeStatusFrom_RUNNING_To_ARCHIVED(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

async function changeStatusFrom_ARCHIVED_To_TODO(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Only parentTask tasks can be unarchived.");
}

async function changeStatusFrom_ARCHIVED_To_RUNNING(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

async function changeStatusFrom_ARCHIVED_To_DONE(
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
  sectionId: string,
) {
  const handlers: Record<string, Function> = {
    changeStatusFrom_TODO_To_RUNNING: changeStatusFrom_TODO_To_RUNNING,
    changeStatusFrom_TODO_To_DONE: changeStatusFrom_TODO_To_DONE,
    changeStatusFrom_TODO_To_ARCHIVED: changeStatusFrom_TODO_To_ARCHIVED,

    changeStatusFrom_RUNNING_To_TODO: changeStatusFrom_RUNNING_To_TODO,
    changeStatusFrom_RUNNING_To_DONE: changeStatusFrom_RUNNING_To_DONE,
    changeStatusFrom_RUNNING_To_ARCHIVED: changeStatusFrom_RUNNING_To_ARCHIVED,

    changeStatusFrom_DONE_To_TODO: changeStatusFrom_DONE_To_TODO,
    changeStatusFrom_DONE_To_RUNNING: changeStatusFrom_DONE_To_RUNNING,
    changeStatusFrom_DONE_To_ARCHIVED: changeStatusFrom_DONE_To_ARCHIVED,

    changeStatusFrom_ARCHIVED_To_TODO: changeStatusFrom_ARCHIVED_To_TODO,
    changeStatusFrom_ARCHIVED_To_RUNNING: changeStatusFrom_ARCHIVED_To_RUNNING,
    changeStatusFrom_ARCHIVED_To_DONE: changeStatusFrom_ARCHIVED_To_DONE,
  };

  const handler = handlers[`changeStatusFrom_${fromStatus}_To_${toStatus}`];
  return await handler(db, task, sectionId);
}
