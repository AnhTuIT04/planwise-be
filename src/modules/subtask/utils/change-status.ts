import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { GetSubtaskStatusQueryResult } from "../query/get-subtask.query";

function getDurationInMinutesFrom(time: Date = new Date()): number {
  const durationInMilliseconds = new Date().getTime() - time.getTime();
  return Math.floor(durationInMilliseconds / 60000);
}

async function changeStatusFrom_TODO_To_RUNNING(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  const runningSubtask = task.parent!.subtasks.find((st) => st.status === TaskStatus.RUNNING);
  if (runningSubtask) {
    return db.$transaction(async (tx) => {
      await tx.task.update({
        where: { id: runningSubtask.id },
        data: {
          status: TaskStatus.DONE,
          timeSpent: getDurationInMinutesFrom(runningSubtask.lastStarted ?? undefined) + runningSubtask.timeSpent,
        },
      });

      return tx.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.RUNNING,
          lastStarted: new Date(),
        },
      });
    });
  }

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.RUNNING,
      lastStarted: new Date(),
      parent: {
        update: {
          status: TaskStatus.RUNNING,
          lastStarted: new Date(),
        },
      },
    },
  });
}

async function changeStatusFrom_TODO_To_DONE(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
    },
  });
}

async function changeStatusFrom_RUNNING_To_TODO(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
      timeSpent: getDurationInMinutesFrom(task.lastStarted ?? undefined) + task.timeSpent,
      parent: {
        update: {
          status: TaskStatus.TODO,
          timeSpent: getDurationInMinutesFrom(task.parent!.lastStarted ?? undefined) + task.parent!.timeSpent,
        },
      },
    },
  });
}

async function changeStatusFrom_RUNNING_To_DONE(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
      timeSpent: getDurationInMinutesFrom(task.lastStarted ?? undefined) + task.timeSpent,
      parent: {
        update: {
          status: TaskStatus.TODO,
          timeSpent: getDurationInMinutesFrom(task.parent!.lastStarted ?? undefined) + task.parent!.timeSpent,
        },
      },
    },
  });
}

async function changeStatusFrom_DONE_To_TODO(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  if (task.parent!.status === TaskStatus.DONE) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.TODO,
        parent: {
          update: {
            status: TaskStatus.TODO,
          },
        },
      },
    });
  }

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
  });
}

async function changeStatusFrom_DONE_To_RUNNING(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

async function changeStatusFrom_TODO_To_ARCHIVED(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Only parent tasks can be archived.");
}

async function changeStatusFrom_DONE_To_ARCHIVED(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Only parent tasks can be archived.");
}

async function changeStatusFrom_RUNNING_To_ARCHIVED(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

async function changeStatusFrom_ARCHIVED_To_TODO(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Only parent tasks can be unarchived.");
}

async function changeStatusFrom_ARCHIVED_To_RUNNING(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

async function changeStatusFrom_ARCHIVED_To_DONE(db: DatabaseService, task: GetSubtaskStatusQueryResult) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  db: DatabaseService,
  task: GetSubtaskStatusQueryResult,
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
