import { Injectable } from "@nestjs/common";

import { EPermission } from "@/common/enum/permission.enum";
import { PgService } from "~/database/pg.service";
import { IPermissionHandler } from "~/permission/interfaces/permission-handler.interface";

@Injectable()
export abstract class BasePermissionHandler implements IPermissionHandler {
  protected abstract readonly permissions: EPermission[];

  constructor(protected readonly pgService: PgService) {}

  async handle({ user, request }: Parameters<IPermissionHandler["handle"]>[0]) {
    const userId = user.sub as string;
    const taskId: string = request.body?.parentTaskId;

    if (taskId) {
      const task = await this.pgService.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        return false;
      }

      const userRole = await this.pgService.role.findFirst({
        where: {
          projectId: task.originalProjectId,
          members: {
            some: {
              userId,
            },
          },
        },
        select: {
          permissions: true,
        },
      });

      if (!userRole) {
        return false;
      }

      return this.permissions.some((permission) => userRole.permissions.includes(permission));
    }

    const subtaskId: string = request.params.id as string;

    if (subtaskId) {
      const subtask = await this.pgService.subtask.findUnique({
        where: {
          id: subtaskId,
        },
        select: {
          parentTask: {
            select: {
              originalProjectId: true,
            },
          },
        },
      });

      if (!subtask) {
        return false;
      }

      const userRole = await this.pgService.role.findFirst({
        where: {
          projectId: subtask.parentTask.originalProjectId,
          members: {
            some: {
              userId,
            },
          },
        },
        select: {
          permissions: true,
        },
      });

      if (!userRole) {
        return false;
      }

      return this.permissions.some((permission) => userRole.permissions.includes(permission));
    }

    return false;
  }
}
