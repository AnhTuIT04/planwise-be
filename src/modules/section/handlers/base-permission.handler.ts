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
    const projectId = request.body?.projectId as string;

    if (projectId) {
      const userRole = await this.pgService.role.findFirst({
        where: {
          projectId,
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

    const sectionId = request.params.id as string;

    if (!sectionId) {
      return false;
    }

    const section = await this.pgService.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      return false;
    }

    const userRole = await this.pgService.role.findFirst({
      where: {
        projectId: section.projectId,
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
}
