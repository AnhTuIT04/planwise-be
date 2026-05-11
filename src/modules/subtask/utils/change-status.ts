import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client/pg";
import { type PgService } from "~/database/pg.service";
import { moveToFirstPosition } from "~/task/utils/change-position";
import { buildGetTaskQuery } from "~/task/query/get-task.query";
import { buildGetSubtaskQuery, type GetSubtaskQueryResult } from "../query/get-subtask.query";

type Task = GetSubtaskQueryResult["parentTask"];
type Subtask = GetSubtaskQueryResult["parentTask"]["subtasks"][number];

function getDurationInMillisecondsFrom(time: Date): number {
  return new Date().getTime() - time.getTime();
}

async function changeStatusFrom_TODO_To_RUNNING(pg: PgService, sectionId: string, subtask: Subtask, parentTask: Task) {
  return pg.$transaction(async (tx) => {
    const now = new Date();

    const updatedSubtask = await tx.subtask.update({
      where: { id: subtask.id },
      data: {
        status: TaskStatus.RUNNING,
        lastStarted: now,
      },
      ...buildGetSubtaskQuery(),
    });

    if (parentTask.status === TaskStatus.RUNNING) {
      return updatedSubtask.parentTask;
    }

    await moveToFirstPosition(tx as PgService, parentTask.id, sectionId);

    const task = await tx.task.update({
      where: { id: parentTask.id },
      data: {
        status: TaskStatus.RUNNING,
        lastStarted: now,
      },
      ...buildGetTaskQuery(),
    });

    return task;
  });
}

async function changeStatusFrom_TODO_To_DONE(pg: PgService, _: string, subtask: Subtask, __: Task) {
  const updatedSubtask = await pg.subtask.update({
    where: { id: subtask.id },
    data: {
      status: TaskStatus.DONE,
    },
    ...buildGetSubtaskQuery(),
  });

  return updatedSubtask.parentTask;
}

async function changeStatusFrom_RUNNING_To_TODO(pg: PgService, _: string, subtask: Subtask, parentTask: Task) {
  const isOtherSubtaskRunning = parentTask.subtasks.some(
    (st) => st.id !== subtask.id && st.status === TaskStatus.RUNNING,
  );

  const parentTaskDuration = parentTask.lastStarted ? getDurationInMillisecondsFrom(parentTask.lastStarted) : 0;
  const subtaskDuration = subtask.lastStarted ? getDurationInMillisecondsFrom(subtask.lastStarted) : 0;

  const updatedSubtask = await pg.subtask.update({
    where: { id: subtask.id },
    data: {
      status: TaskStatus.TODO,
      spent: subtaskDuration + subtask.spent,
      lastStarted: null,
      parentTask: {
        update: {
          status: isOtherSubtaskRunning ? TaskStatus.RUNNING : TaskStatus.TODO,
          spent: isOtherSubtaskRunning ? parentTask.spent : parentTaskDuration + parentTask.spent,
          lastStarted: isOtherSubtaskRunning ? parentTask.lastStarted : null,
        },
      },
    },
    ...buildGetSubtaskQuery(),
  });

  return updatedSubtask.parentTask;
}

async function changeStatusFrom_RUNNING_To_DONE(pg: PgService, _: string, subtask: Subtask, parentTask: Task) {
  const isOtherSubtaskRunning = parentTask.subtasks.some(
    (st) => st.id !== subtask.id && st.status === TaskStatus.RUNNING,
  );

  const parentTaskDuration = parentTask.lastStarted ? getDurationInMillisecondsFrom(parentTask.lastStarted) : 0;
  const subtaskDuration = subtask.lastStarted ? getDurationInMillisecondsFrom(subtask.lastStarted) : 0;

  const updatedSubtask = await pg.subtask.update({
    where: { id: subtask.id },
    data: {
      status: TaskStatus.DONE,
      spent: subtaskDuration + subtask.spent,
      lastStarted: null,
      parentTask: {
        update: {
          status: isOtherSubtaskRunning ? TaskStatus.RUNNING : TaskStatus.TODO,
          spent: isOtherSubtaskRunning ? parentTask.spent : parentTaskDuration + parentTask.spent,
          lastStarted: isOtherSubtaskRunning ? parentTask.lastStarted : null,
        },
      },
    },
    ...buildGetSubtaskQuery(),
  });

  return updatedSubtask.parentTask;
}

async function changeStatusFrom_DONE_To_TODO(pg: PgService, _: string, subtask: Subtask, parentTask: Task) {
  if (parentTask.status === TaskStatus.DONE) {
    const updatedSubtask = await pg.subtask.update({
      where: { id: subtask.id },
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

    return updatedSubtask.parentTask;
  }

  const updatedSubtask = await pg.subtask.update({
    where: { id: subtask.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetSubtaskQuery(),
  });

  return updatedSubtask.parentTask;
}

function changeStatusFrom_DONE_To_RUNNING(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

function changeStatusFrom_TODO_To_ARCHIVED(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Only parentTask tasks can be archived.");
}

function changeStatusFrom_DONE_To_ARCHIVED(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Only parentTask tasks can be archived.");
}

function changeStatusFrom_RUNNING_To_ARCHIVED(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

function changeStatusFrom_ARCHIVED_To_TODO(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Only parentTask tasks can be unarchived.");
}

function changeStatusFrom_ARCHIVED_To_RUNNING(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

function changeStatusFrom_ARCHIVED_To_DONE(_pg: PgService, _sectionId: string, _subtask: Subtask, _task: Task) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeSubtaskStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  pg: PgService,
  sectionId: string,
  subtask: Subtask,
  parentTask: Task,
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
    subtask: Subtask,
    parentTask: Task,
  ) => Promise<Task>;

  if (!handler) {
    throw new BadRequestException(`Unsupported status change from ${fromStatus} to ${toStatus}.`);
  }

  return await handler(pg, sectionId, subtask, parentTask);
}
