import { Injectable, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from '@/modules/database/database.service';
import { PermissionService } from '@/modules/permission/permission.service';
import { PermissionUtils } from '@/common/utils/permission.utils';
import { Permission } from '@/common/enum/permission.enum';
import { getPermissionContext } from './permission-context';

export interface PermissionCheckOptions {
  projectId: string;
  userId: string;
  allowPersonalProjectOwner?: boolean;
}

@Injectable()
export class PermissionChecker {
  constructor(
    private readonly db: DatabaseService,
    private readonly permissionService: PermissionService,
  ) {}

  async isPersonalProjectOwner(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const project = await this.db.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true, isPersonal: true },
    });

    if (!project) return false;
    return project.isPersonal && project.ownerId === userId;
  }

  async hasPermission(
    options: PermissionCheckOptions,
    permission: Permission | Permission[],
  ): Promise<boolean> {
    const { projectId, userId, allowPersonalProjectOwner = true } = options;

    if (allowPersonalProjectOwner) {
      const isOwner = await this.isPersonalProjectOwner(userId, projectId);
      if (isOwner) return true;
    }

    const context = getPermissionContext();
    let userPermissions: Permission[] = [];

    if (context && context.projectId === projectId && context.userId === userId) {
      userPermissions = context.permissions;
    } else {
      const perms = await this.permissionService.getUserPermissions(
        userId,
        projectId,
      );
      userPermissions = perms as Permission[];
    }

    const permissions = Array.isArray(permission) ? permission : [permission];
    return permissions.every((p) => userPermissions.includes(p));
  }

  async hasAnyPermission(
    options: PermissionCheckOptions,
    permissions: Permission[],
  ): Promise<boolean> {
    const { projectId, userId, allowPersonalProjectOwner = true } = options;

    if (allowPersonalProjectOwner) {
      const isOwner = await this.isPersonalProjectOwner(userId, projectId);
      if (isOwner) return true;
    }

    const context = getPermissionContext();
    let userPermissions: Permission[] = [];

    if (context && context.projectId === projectId && context.userId === userId) {
      userPermissions = context.permissions;
    } else {
      const perms = await this.permissionService.getUserPermissions(
        userId,
        projectId,
      );
      userPermissions = perms as Permission[];
    }

    return permissions.some((p) => userPermissions.includes(p));
  }

  async requirePermission(
    options: PermissionCheckOptions,
    permission: Permission | Permission[],
  ): Promise<void> {
    const hasPermission = await this.hasPermission(options, permission);
    if (!hasPermission) {
      throw new ForbiddenException(
        `You do not have permission to perform this action`,
      );
    }
  }

  async requireAnyPermission(
    options: PermissionCheckOptions,
    permissions: Permission[],
  ): Promise<void> {
    const hasAny = await this.hasAnyPermission(options, permissions);
    if (!hasAny) {
      throw new ForbiddenException(
        `You do not have permission to perform this action`,
      );
    }
  }
}
