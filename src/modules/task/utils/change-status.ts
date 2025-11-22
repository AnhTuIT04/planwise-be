import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "prisma/client";
import { DatabaseService } from "@/modules/database/database.service";
import { buildGetTaskQuery, GetTaskQueryResult } from "../query/get-task.query";

function getDurationInMinutesFrom(time: Date = new Date()): number {
  const durationInMilliseconds = new Date().getTime() - time.getTime();
  return Math.floor(durationInMilliseconds / 60000);
}

async function changeStatusFrom_TODO_To_RUNNING(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;

  if (isParentTask) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.RUNNING,
        lastStarted: new Date(),
      },
      ...buildGetTaskQuery(),
    });
  }

  const runningSubtask = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);
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
        ...buildGetTaskQuery(),
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
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_TODO_To_DONE(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;

  if (isParentTask) {
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

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_TODO(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;

  if (isParentTask) {
    const subtaskRunning = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);

    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.TODO,
        timeSpent: getDurationInMinutesFrom(task.lastStarted ?? undefined) + task.timeSpent,
        subtasks: {
          updateMany: {
            where: { id: subtaskRunning?.id },
            data: {
              status: TaskStatus.TODO,
              timeSpent:
                getDurationInMinutesFrom(subtaskRunning?.lastStarted ?? undefined) + (subtaskRunning?.timeSpent || 0),
            },
          },
        },
      },
      ...buildGetTaskQuery(),
    });
  }

  const parentTask = await db.task.findUnique({
    where: { id: task.parentTaskId! },
  });

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
      timeSpent: getDurationInMinutesFrom(task.lastStarted ?? undefined) + task.timeSpent,
      parent: {
        update: {
          status: TaskStatus.TODO,
          timeSpent: getDurationInMinutesFrom(parentTask!.lastStarted ?? undefined) + parentTask!.timeSpent,
        },
      },
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_RUNNING_To_DONE(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;

  if (isParentTask) {
    const subtaskRunning = task.subtasks.find((st) => st.status === TaskStatus.RUNNING);

    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.DONE,
        timeSpent: getDurationInMinutesFrom(task.lastStarted ?? undefined) + task.timeSpent,
        subtasks: {
          updateMany: [
            {
              where: { id: subtaskRunning?.id },
              data: {
                status: TaskStatus.DONE,
                timeSpent:
                  getDurationInMinutesFrom(subtaskRunning?.lastStarted ?? undefined) + (subtaskRunning?.timeSpent || 0),
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

  const parentTask = await db.task.findUnique({
    where: { id: task.parentTaskId! },
  });

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.DONE,
      timeSpent: getDurationInMinutesFrom(task.lastStarted ?? undefined) + task.timeSpent,
      parent: {
        update: {
          status: TaskStatus.TODO,
          timeSpent: getDurationInMinutesFrom(parentTask!.lastStarted ?? undefined) + parentTask!.timeSpent,
        },
      },
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_TODO(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;

  if (isParentTask) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.TODO,
      },
      ...buildGetTaskQuery(),
    });
  }

  const parentTask = await db.task.findUnique({
    where: { id: task.parentTaskId! },
  });

  if (parentTask!.status === TaskStatus.DONE) {
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
      ...buildGetTaskQuery(),
    });
  }

  return db.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.TODO,
    },
    ...buildGetTaskQuery(),
  });
}

async function changeStatusFrom_DONE_To_RUNNING(db: DatabaseService, task: GetTaskQueryResult) {
  throw new BadRequestException("Cannot change status from DONE to RUNNING.");
}

async function changeStatusFrom_TODO_To_ARCHIVED(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;
  if (isParentTask) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.ARCHIVED,
      },
      ...buildGetTaskQuery(),
    });
  }

  throw new BadRequestException("Only parent tasks can be archived.");
}

async function changeStatusFrom_DONE_To_ARCHIVED(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;
  if (isParentTask) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.ARCHIVED,
      },
      ...buildGetTaskQuery(),
    });
  }

  throw new BadRequestException("Only parent tasks can be archived.");
}

async function changeStatusFrom_RUNNING_To_ARCHIVED(db: DatabaseService, task: GetTaskQueryResult) {
  throw new BadRequestException("Cannot archive a task that is RUNNING. Please change its status first.");
}

async function changeStatusFrom_ARCHIVED_To_TODO(db: DatabaseService, task: GetTaskQueryResult) {
  const isParentTask = task.parentTaskId === null;
  if (isParentTask) {
    return db.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.TODO,
      },
      ...buildGetTaskQuery(),
    });
  }

  throw new BadRequestException("Only parent tasks can be unarchived.");
}

async function changeStatusFrom_ARCHIVED_To_RUNNING(db: DatabaseService, task: GetTaskQueryResult) {
  throw new BadRequestException("Cannot change status from ARCHIVED to RUNNING.");
}

async function changeStatusFrom_ARCHIVED_To_DONE(db: DatabaseService, task: GetTaskQueryResult) {
  throw new BadRequestException("Cannot change status from ARCHIVED to DONE.");
}

export async function changeStatus(
  fromStatus: TaskStatus,
  toStatus: TaskStatus,
  db: DatabaseService,
  task: GetTaskQueryResult,
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
