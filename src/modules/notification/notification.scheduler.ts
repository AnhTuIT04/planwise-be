import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationType, TaskStatus } from "prisma/client/pg";

import { PgService } from "~/database/pg.service";
import { NotificationService } from "./notification.service";

const SECTION_LOOKUP_LIMIT = 1; // any one section is fine for opening the modal

@Injectable()
export class NotificationScheduler {
  private readonly logger = new Logger(NotificationScheduler.name);

  constructor(
    private readonly pg: PgService,
    private readonly notifications: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkDeadlines() {
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

    for (const task of tasks) {
      const sectionId = task.sections[0]?.sectionId;
      if (!sectionId) continue;

      const recipients = this.collectRecipients(task);
      for (const recipientId of recipients) {
        const exists = await this.notifications.hasExisting(
          recipientId,
          task.id,
          NotificationType.TASK_DEADLINE_REMINDER,
        );
        if (exists) continue;

        await this.notifications.notifyDeadlineReminder({
          recipientId,
          project: { id: task.originalProject.id, name: task.originalProject.name, logoUrl: task.originalProject.logoUrl },
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

    for (const task of tasks) {
      const sectionId = task.sections[0]?.sectionId;
      if (!sectionId) continue;

      const recipients = this.collectRecipients(task);
      for (const recipientId of recipients) {
        const exists = await this.notifications.hasExisting(
          recipientId,
          task.id,
          NotificationType.TASK_DEADLINE_MISSED,
        );
        if (exists) continue;

        await this.notifications.notifyDeadlineMissed({
          recipientId,
          project: { id: task.originalProject.id, name: task.originalProject.name, logoUrl: task.originalProject.logoUrl },
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

  private collectRecipients(task: {
    supervisorId: string | null;
    assignees: { userId: string }[];
  }): string[] {
    const ids = new Set<string>(task.assignees.map((a) => a.userId));
    if (task.supervisorId) ids.add(task.supervisorId);
    return [...ids];
  }
}
