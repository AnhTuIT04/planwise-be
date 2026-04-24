import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client/pg";
import { type PgService } from "~/database/pg.service";
import { type GetSubtaskQueryResult } from "~/subtask/query/get-subtask.query";
import { moveToFirstPosition, moveToLastPosition } from "./change-position";
import { buildGetTaskQuery } from "../query/get-task.query";

type Task = GetSubtaskQueryResult["parentTask"];

function getDurationInMillisecondsFrom(time: Date): number {
  return new Date().getTime() - time.getTime();
}

async function changeStatusFrom_TODO_To_RUNNING(pg: PgService, sectionId: string, task: Task) {
  return await pg.$transaction(
    async (tx) => {
      await moveToFirstPosition(tx as PgService, task.id, sectionId);

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

async function changeStatusFrom_TODO_To_DONE(pg: PgService, sectionId: string, task: Task) {
  return await pg.$transaction(
    async (tx) => {
      await moveToLastPosition(tx as PgService, task.id, sectionId);

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

async function changeStatusFrom_RUNNING_To_TODO(pg: PgService, _: string, task: Task) {
  const runningSubtasks = task.subtasks.filter((st) => st.status === TaskStatus.RUNNING);

  return pg.$transaction(async (tx) => {
    await Promise.all(
      runningSubtasks.map((st) => {
        const duration = st.lastStarted ? getDurationInMillisecondsFrom(st.lastStarted) : 0;

        return tx.subtask.update({
          where: { id: st.id },
          data: {
            status: TaskStatus.TODO,
            spent: st.spent + duration,
            lastStarted: null,
          },
        });
      }),
    );

    const parentTaskDuration = task.lastStarted ? getDurationInMillisecondsFrom(task.lastStarted) : 0;

    return tx.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.TODO,
        spent: task.spent + parentTaskDuration,
        lastStarted: null,
      },
      ...buildGetTaskQuery(),
    });
  });
}

async function changeStatusFrom_RUNNING_To_DONE(pg: PgService, sectionId: string, task: Task) {
  const runningSubtasks = task.subtasks.filter((st) => st.status === TaskStatus.RUNNING);

  return await pg.$transaction(
    async (tx) => {
      await moveToLastPosition(tx as PgService, task.id, sectionId);

      await Promise.all(
        runningSubtasks.map((st) => {
          const duration = st.lastStarted ? getDurationInMillisecondsFrom(st.lastStarted) : 0;

          return tx.subtask.update({
            where: { id: st.id },
            data: {
              status: TaskStatus.DONE,
              spent: st.spent + duration,
              lastStarted: null,
            },
          });
        }),
      );

      await tx.subtask.updateMany({
        where: {
          parentTaskId: task.id,
          status: { not: TaskStatus.DONE },
        },
        data: {
          status: TaskStatus.DONE,
        },
      });

      const parentDuration = task.lastStarted ? getDurationInMillisecondsFrom(task.lastStarted) : 0;

      return tx.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.DONE,
          spent: task.spent + parentDuration,
          lastStarted: null,
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

async function changeStatusFrom_DONE_To_TODO(pg: PgService, _: string, task: Task) {
  return pg.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

function changeStatusFrom_DONE_To_RUNNING(_pg: PgService, _sectionId: string, _task: Task) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

async function changeStatusFrom_TODO_To_ARCHIVED(pg: PgService, _: string, task: Task) {
  return pg.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.ARCHIVED,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_ARCHIVED(pg: PgService, _: string, task: Task) {
  return pg.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.ARCHIVED,
    },
    ...buildGetTaskQuery(),
  });
}

function changeStatusFrom_RUNNING_To_ARCHIVED(_pg: PgService, _sectionId: string, _task: Task) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

async function changeStatusFrom_ARCHIVED_To_TODO(pg: PgService, _: string, task: Task) {
  return pg.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

function changeStatusFrom_ARCHIVED_To_RUNNING(_pg: PgService, _sectionId: string, _task: Task) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

function changeStatusFrom_ARCHIVED_To_DONE(_pg: PgService, _sectionId: string, _task: Task) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeTaskStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  pg: PgService,
  sectionId: string,
  task: Task,
) {
  const handlers: Record<string, any> = {
    changeStatusFrom_TODO_To_RUNNING,
    changeStatusFrom_TODO_To_DONE,
    changeStatusFrom_TODO_To_ARCHIVED,

    changeStatusFrom_RUNNING_To_TODO,
    changeStatusFrom_RUNNING_To_DONE,
    changeStatusFrom_RUNNING_To_ARCHIVED,

    changeStatusFrom_DONE_To_TODO,
    changeStatusFrom_DONE_To_RUNNING,
    changeStatusFrom_DONE_To_ARCHIVED,

    changeStatusFrom_ARCHIVED_To_TODO,
    changeStatusFrom_ARCHIVED_To_RUNNING,
    changeStatusFrom_ARCHIVED_To_DONE,
  };

  const handler = handlers[`changeStatusFrom_${fromStatus}_To_${toStatus}`] as (
    pg: PgService,
    sectionId: string,
    task: Task,
  ) => Promise<Task>;

  if (!handler) {
    throw new BadRequestException(`Unsupported status change from ${fromStatus} to ${toStatus}.`);
  }

  return await handler(pg, sectionId, task);
}
