import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { GetTaskStatsQueryResult, buildGetTaskQuery } from "../query/get-task.query";

function getDurationInSecondsFrom(time: Date = new Date()): number {
  const durationInMilliseconds = new Date().getTime() - time.getTime();
  return Math.floor(durationInMilliseconds / 1000);
}

async function changeStatusFrom_TODO_To_RUNNING(db: DatabaseService, task: GetTaskStatsQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.RUNNING,
      lastStarted: new Date(),
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_TODO_To_DONE(db: DatabaseService, task: GetTaskStatsQueryResult) {
  return db.task.update({
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
}

async function changeStatusFrom_RUNNING_To_TODO(db: DatabaseService, task: GetTaskStatsQueryResult) {
  const subtaskRunning = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
      timeSpent: getDurationInSecondsFrom(task.lastStarted ?? undefined) + task.timeSpent,
      subtasks: {
        updateMany: {
          where: { id: subtaskRunning?.id },
          data: {
            status: TaskStatus.TODO,
            timeSpent:
              getDurationInSecondsFrom(subtaskRunning?.lastStarted ?? undefined) + (subtaskRunning?.timeSpent || 0),
          },
        },
      },
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_DONE(db: DatabaseService, task: GetTaskStatsQueryResult) {
  const subtaskRunning = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
      timeSpent: getDurationInSecondsFrom(task.lastStarted ?? undefined) + task.timeSpent,
      subtasks: {
        updateMany: [
          {
            where: { id: subtaskRunning?.id },
            data: {
              status: TaskStatus.DONE,
              timeSpent:
                getDurationInSecondsFrom(subtaskRunning?.lastStarted ?? undefined) + (subtaskRunning?.timeSpent || 0),
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
}

async function changeStatusFrom_DONE_To_TODO(db: DatabaseService, task: GetTaskStatsQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_RUNNING(db: DatabaseService, task: GetTaskStatsQueryResult) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

async function changeStatusFrom_TODO_To_ARCHIVED(db: DatabaseService, task: GetTaskStatsQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.ARCHIVED,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_ARCHIVED(db: DatabaseService, task: GetTaskStatsQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.ARCHIVED,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_ARCHIVED(db: DatabaseService, task: GetTaskStatsQueryResult) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

async function changeStatusFrom_ARCHIVED_To_TODO(db: DatabaseService, task: GetTaskStatsQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_ARCHIVED_To_RUNNING(db: DatabaseService, task: GetTaskStatsQueryResult) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

async function changeStatusFrom_ARCHIVED_To_DONE(db: DatabaseService, task: GetTaskStatsQueryResult) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  db: DatabaseService,
  task: GetTaskStatsQueryResult,
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
  return await handler(db, task);
}
