import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationType, PriorityLevel, TaskStatus } from "prisma/client/pg";

import { PgService } from "~/database/pg.service";
import { CacheService } from "~/cache/cache.service";
import { NotificationService } from "./notification.service";

const SECTION_LOOKUP_LIMIT = 1; // any one section is fine for opening the modal

// Lock TTL slightly under the hourly cadence so the next tick can always acquire.
const DEADLINE_CHECK_LOCK_KEY = "notification-scheduler:deadline-check-lock";
const DEADLINE_CHECK_LOCK_TTL = 50 * 60; // seconds

@Injectable()
export class NotificationScheduler {
  private readonly logger = new Logger(NotificationScheduler.name);

  constructor(
    private readonly pg: PgService,
    private readonly cache: CacheService,
    private readonly notifications: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkDeadlines() {
    // Distributed lock: with more than one app instance (cluster mode, replicas,
    // or a stale process from a previous deploy) the cron fires everywhere at the
    // same minute. The old SELECT-then-INSERT dedupe raced across instances and
    // produced duplicate notifications — only the lock holder may proceed.
    const acquired = await this.cache.tryLock(DEADLINE_CHECK_LOCK_KEY, DEADLINE_CHECK_LOCK_TTL);
    if (!acquired) {
      this.logger.log("Deadline check skipped — another instance holds the lock");
      return;
    }

    const now = new Date();
    const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    await Promise.all([this.fireUpcoming(now, in24h), this.fireMissed(now)]);
  }

  private async fireUpcoming(from: Date, to: Date) {
    const tasks = await this.pg.task.findMany({
      where: {
        deadline: { gt: from, lte: to },
        status: { notIn: [TaskStatus.DONE, TaskStatus.ARCHIVED] },
      },
      include: {
        originalProject: true,
        sections: { take: SECTION_LOOKUP_LIMIT, select: { sectionId: true } },
        assignees: { select: { userId: true } },
      },
    });

    await this.fireForTasks(tasks, NotificationType.TASK_DEADLINE_REMINDER, (params) =>
      this.notifications.notifyDeadlineReminder(params),
    );
  }

  private async fireMissed(now: Date) {
    const tasks = await this.pg.task.findMany({
      where: {
        deadline: { lt: now },
        status: { notIn: [TaskStatus.DONE, TaskStatus.ARCHIVED] },
      },
      include: {
        originalProject: true,
        sections: { take: SECTION_LOOKUP_LIMIT, select: { sectionId: true } },
        assignees: { select: { userId: true } },
      },
    });

    await this.fireForTasks(tasks, NotificationType.TASK_DEADLINE_MISSED, (params) =>
      this.notifications.notifyDeadlineMissed(params),
    );
  }

  private async fireForTasks(
    tasks: {
      id: string;
      title: string;
      status: TaskStatus;
      priority: PriorityLevel;
      deadline: Date | null;
      supervisorId: string | null;
      originalProject: { id: string; name: string; logoUrl: string | null };
      sections: { sectionId: string }[];
      assignees: { userId: string }[];
    }[],
    type: NotificationType,
    notify: (params: {
      recipientId: string;
      project: { id: string; name: string; logoUrl: string | null };
      task: {
        id: string;
        title: string;
        status: TaskStatus;
        priority: PriorityLevel;
        deadline: Date | null;
        sectionId: string;
      };
    }) => Promise<unknown>,
  ) {
    if (tasks.length === 0) return;

    // One batched dedupe query instead of a findFirst per (task, recipient):
    // faster, and there is no check/insert window between recipients.
    const existing = await this.pg.notification.findMany({
      where: { type, taskId: { in: tasks.map((t) => t.id) } },
      select: { recipientId: true, taskId: true },
    });
    const alreadyNotified = new Set(existing.map((n) => `${n.recipientId}:${n.taskId}`));

    for (const task of tasks) {
      const sectionId = task.sections[0]?.sectionId;
      if (!sectionId) continue;

      const recipients = this.collectRecipients(task);
      for (const recipientId of recipients) {
        if (alreadyNotified.has(`${recipientId}:${task.id}`)) continue;
        alreadyNotified.add(`${recipientId}:${task.id}`);

        await notify({
          recipientId,
          project: {
            id: task.originalProject.id,
            name: task.originalProject.name,
            logoUrl: task.originalProject.logoUrl,
          },
          task: {
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
            sectionId,
          },
        });
      }
    }
  }

  private collectRecipients(task: { supervisorId: string | null; assignees: { userId: string }[] }): string[] {
    const ids = new Set<string>(task.assignees.map((a) => a.userId));
    if (task.supervisorId) ids.add(task.supervisorId);
    return [...ids];
  }
}
