import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { buildGetTaskQuery } from "../query/get-task.query";
import { GetTaskStatusQueryResult } from "../query/get-task-status.query";
import { moveToFirstPosition, moveToLastPosition } from "./change-position";

function getDurationInMillisecondsFrom(time: Date = new Date()): number {
  const durationInMilliseconds = new Date().getTime() - time.getTime();
  return durationInMilliseconds;
}

async function changeStatusFrom_TODO_To_RUNNING(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  return await db.$transaction(
    async (tx) => {
      await moveToFirstPosition(tx, task.id, sectionId);

      return tx.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.RUNNING,
          lastStarted: new Date(),
        },
        ...buildGetTaskQuery(),
      });
    },
    {
      maxWait: 5000,
      timeout: 20000,
    },
  );
}

async function changeStatusFrom_TODO_To_DONE(db: DatabaseService, task: GetTaskStatusQueryResult, sectionId: string) {
  return await db.$transaction(
    async (tx) => {
      await moveToLastPosition(tx, task.id, sectionId);

      return tx.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.DONE,
          subtasks: {
            updateMany: {
              where: { status: { not: TaskStatus.DONE } },
              data: { status: TaskStatus.DONE },
            },
          },
        },
        ...buildGetTaskQuery(),
      });
    },
    {
      maxWait: 5000,
      timeout: 20000,
    },
  );
}

async function changeStatusFrom_RUNNING_To_TODO(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  const subtaskRunning = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
      spent: getDurationInMillisecondsFrom(task.lastStarted ?? undefined) + task.spent,
      subtasks: {
        updateMany: {
          where: { id: subtaskRunning?.id },
          data: {
            status: TaskStatus.TODO,
            spent:
              getDurationInMillisecondsFrom(subtaskRunning?.lastStarted ?? undefined) + (subtaskRunning?.spent || 0),
          },
        },
      },
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_DONE(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  const subtaskRunning = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);

  return await db.$transaction(
    async (tx) => {
      await moveToLastPosition(tx, task.id, sectionId);
      return tx.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.DONE,
          spent: getDurationInMillisecondsFrom(task.lastStarted ?? undefined) + task.spent,
          subtasks: {
            updateMany: [
              {
                where: { id: subtaskRunning?.id },
                data: {
                  status: TaskStatus.DONE,
                  spent:
                    getDurationInMillisecondsFrom(subtaskRunning?.lastStarted ?? undefined) +
                    (subtaskRunning?.spent || 0),
                },
              },
              {
                where: { status: { not: TaskStatus.DONE } },
                data: { status: TaskStatus.DONE },
              },
            ],
          },
        },
        ...buildGetTaskQuery(),
      });
    },
    {
      maxWait: 5000,
      timeout: 20000,
    },
  );
}

async function changeStatusFrom_DONE_To_TODO(db: DatabaseService, task: GetTaskStatusQueryResult, sectionId: string) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_RUNNING(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

async function changeStatusFrom_TODO_To_ARCHIVED(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.ARCHIVED,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_ARCHIVED(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.ARCHIVED,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_ARCHIVED(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

async function changeStatusFrom_ARCHIVED_To_TODO(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_ARCHIVED_To_RUNNING(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

async function changeStatusFrom_ARCHIVED_To_DONE(
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
  sectionId: string,
) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  db: DatabaseService,
  task: GetTaskStatusQueryResult,
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
