import { ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { NotificationType, type Prisma } from "prisma/client/pg";

import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PgService } from "~/database/pg.service";
import { SocketEmitter } from "~/realtime/socket.emitter";
import { GetNotificationsQueryDto, NotificationCategory } from "./dto/request/get-notifications-query.dto";
import {
  NotificationDto,
  NotificationsOffsetResponse,
  UnreadCountResponse,
} from "./dto/response/notification-response.dto";

const WORKSPACE_TYPES: NotificationType[] = [
  NotificationType.TASK_ASSIGNED,
  NotificationType.TASK_UPDATED,
  NotificationType.TASK_DEADLINE_REMINDER,
  NotificationType.TASK_DEADLINE_MISSED,
];

const INVITATION_TYPES: NotificationType[] = [
  NotificationType.PROJECT_INVITATION,
  NotificationType.INVITATION_ACCEPTED,
  NotificationType.INVITATION_DECLINED,
  NotificationType.PROJECT_NEW_MEMBER,
];

interface UserBasic {
  id: string;
  fullname: string;
  avatarUrl: string | null;
}

interface ProjectBasic {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
}

interface TaskBasic {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadline: Date | null;
  sectionId: string;
}

interface RoleBasic {
  id: string;
  name: string;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly pg: PgService,
    private readonly emitter: SocketEmitter,
  ) {}

  // ---------- Query ----------

  async list(userId: string, dto: GetNotificationsQueryDto) {
    const where: Prisma.NotificationWhereInput = {
      recipientId: userId,
    };

    if (dto.category === NotificationCategory.WORKSPACE) {
      where.type = { in: WORKSPACE_TYPES };
    } else if (dto.category === NotificationCategory.INVITATION) {
      where.type = { in: INVITATION_TYPES };
    }

    if (dto.isRead !== undefined) {
      where.isRead = dto.isRead;
    }

    const [notifications, total] = await this.pg.$transaction([
      this.pg.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (dto.page - 1) * dto.limit,
        take: dto.limit,
      }),
      this.pg.notification.count({ where }),
    ]);

    return new NotificationsOffsetResponse(notifications, dto.page, dto.limit, total);
  }

  async getUnreadCount(userId: string) {
    const count = await this.pg.notification.count({
      where: { recipientId: userId, isRead: false },
    });
    return new UnreadCountResponse(count);
  }

  async markRead(userId: string, id: string) {
    const notification = await this.pg.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException("Notification not found");
    if (notification.recipientId !== userId) throw new ForbiddenException("You cannot access this notification");

    if (!notification.isRead) {
      await this.pg.notification.update({ where: { id }, data: { isRead: true } });
    }
    return new MessageOnlyResponse("Notification marked as read");
  }

  async markAllRead(userId: string) {
    await this.pg.notification.updateMany({
      where: { recipientId: userId, isRead: false },
      data: { isRead: true },
    });
    return new MessageOnlyResponse("All notifications marked as read");
  }

  // ---------- Internal: create + emit ----------

  /**
   * Persists notifications for the given recipients (de-duplicated, actor filtered out)
   * and emits `s2c:notification:new` to each recipient's user room.
   */
  private async createAndEmit(params: {
    recipientIds: string[];
    actorId?: string | null;
    type: NotificationType;
    payload: any;
    projectId?: string | null;
    taskId?: string | null;
  }) {
    const recipients = Array.from(new Set(params.recipientIds.filter((id) => id && id !== params.actorId)));
    if (recipients.length === 0) return;

    try {
      const created = await this.pg.$transaction(
        recipients.map((recipientId) =>
          this.pg.notification.create({
            data: {
              recipientId,
              type: params.type,
              payload: params.payload,
              projectId: params.projectId ?? null,
              taskId: params.taskId ?? null,
            },
          }),
        ),
      );

      for (const n of created) {
        this.emitter.to(`user:${n.recipientId}`).emit("s2c:notification:new", new NotificationDto(n));
      }
    } catch (err) {
      this.logger.error("Failed to create/emit notifications", err as Error);
    }
  }

  // ---------- Domain helpers ----------

  notifyTaskAssigned(params: {
    actorId: string;
    project: ProjectBasic;
    task: TaskBasic;
    actor: UserBasic | null;
    assigneeIds: string[];
    supervisorId?: string | null;
  }) {
    const recipients = [...params.assigneeIds];
    if (params.supervisorId) recipients.push(params.supervisorId);

    return this.createAndEmit({
      recipientIds: recipients,
      actorId: params.actorId,
      type: NotificationType.TASK_ASSIGNED,
      payload: { task: params.task, project: params.project, actor: params.actor },
      projectId: params.project.id,
      taskId: params.task.id,
    });
  }

  notifyTaskUpdated(params: {
    actorId: string;
    project: ProjectBasic;
    task: TaskBasic;
    actor: UserBasic | null;
    assigneeIds: string[];
    supervisorId?: string | null;
    changes?: string[];
  }) {
    const recipients = [...params.assigneeIds];
    if (params.supervisorId) recipients.push(params.supervisorId);

    return this.createAndEmit({
      recipientIds: recipients,
      actorId: params.actorId,
      type: NotificationType.TASK_UPDATED,
      payload: {
        task: params.task,
        project: params.project,
        actor: params.actor,
        changes: params.changes ?? [],
      },
      projectId: params.project.id,
      taskId: params.task.id,
    });
  }

  notifyDeadlineReminder(params: { project: ProjectBasic; task: TaskBasic; recipientId: string }) {
    return this.createAndEmit({
      recipientIds: [params.recipientId],
      type: NotificationType.TASK_DEADLINE_REMINDER,
      payload: { task: params.task, project: params.project },
      projectId: params.project.id,
      taskId: params.task.id,
    });
  }

  notifyDeadlineMissed(params: { project: ProjectBasic; task: TaskBasic; recipientId: string }) {
    return this.createAndEmit({
      recipientIds: [params.recipientId],
      type: NotificationType.TASK_DEADLINE_MISSED,
      payload: { task: params.task, project: params.project },
      projectId: params.project.id,
      taskId: params.task.id,
    });
  }

  notifyProjectInvitation(params: {
    inviteeId: string;
    inviter: UserBasic;
    project: ProjectBasic;
    role: RoleBasic;
  }) {
    return this.createAndEmit({
      recipientIds: [params.inviteeId],
      actorId: params.inviter.id,
      type: NotificationType.PROJECT_INVITATION,
      payload: { project: params.project, role: params.role, inviter: params.inviter },
      projectId: params.project.id,
    });
  }

  notifyInvitationResponse(params: {
    inviterId: string;
    invitee: UserBasic;
    project: ProjectBasic;
    role: RoleBasic;
    accepted: boolean;
  }) {
    return this.createAndEmit({
      recipientIds: [params.inviterId],
      actorId: params.invitee.id,
      type: params.accepted ? NotificationType.INVITATION_ACCEPTED : NotificationType.INVITATION_DECLINED,
      payload: { project: params.project, role: params.role, invitee: params.invitee },
      projectId: params.project.id,
    });
  }

  notifyProjectNewMember(params: {
    actorId: string;
    project: ProjectBasic;
    newMember: UserBasic;
    role: RoleBasic;
    existingMemberIds: string[];
  }) {
    return this.createAndEmit({
      recipientIds: params.existingMemberIds,
      actorId: params.actorId,
      type: NotificationType.PROJECT_NEW_MEMBER,
      payload: { project: params.project, newMember: params.newMember, role: params.role },
      projectId: params.project.id,
    });
  }

  /**
   * Returns true if a notification of the given type already exists for (recipientId, taskId).
   * Used by the cron to dedupe deadline reminders.
   */
  async hasExisting(recipientId: string, taskId: string, type: NotificationType): Promise<boolean> {
    const existing = await this.pg.notification.findFirst({
      where: { recipientId, taskId, type },
      select: { id: true },
    });
    return !!existing;
  }
}
