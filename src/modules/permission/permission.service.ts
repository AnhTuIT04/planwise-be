import { Injectable } from "@nestjs/common";
import { PgService } from "@/modules/database/pg.service";
import { PermissionUtils } from "@/common/utils/permission.utils";
import { DEFAULT_ROLE_PERMISSIONS, Permission } from "@/common/enum/permission.enum";

@Injectable()
export class PermissionService {
  constructor(private readonly pg: PgService) {}

  async getUserPermissions(userId: string, projectId: string): Promise<string[]> {
    const projectMember = await this.pg.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      include: {
        role: true,
      },
    });

    if (!projectMember) {
      return [];
    }

    return PermissionUtils.parsePermissions(projectMember.role.permissions);
  }

  async userHasPermission(userId: string, projectId: string, permission: Permission): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId, projectId);
    return PermissionUtils.hasPermission(permissions, permission);
  }

  async userHasAnyPermission(userId: string, projectId: string, permissions: Permission[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId, projectId);
    return PermissionUtils.hasAnyPermission(userPermissions, permissions);
  }

  async userHasAllPermissions(userId: string, projectId: string, permissions: Permission[]): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId, projectId);
    return PermissionUtils.hasAllPermissions(userPermissions, permissions);
  }

  async initializeDefaultRoles(projectId: string): Promise<void> {
    const defaultRoles = [
      {
        name: "Admin",
        permissions: DEFAULT_ROLE_PERMISSIONS.ADMIN,
        default: true,
      },
      {
        name: "Editor",
        permissions: DEFAULT_ROLE_PERMISSIONS.EDITOR,
        default: true,
      },
      {
        name: "Viewer",
        permissions: DEFAULT_ROLE_PERMISSIONS.VIEWER,
        default: true,
      },
    ];

    for (const roleData of defaultRoles) {
      const existingRole = await this.pg.role.findFirst({
        where: {
          name: roleData.name,
          projectId,
        },
      });

      if (existingRole) {
        await this.pg.role.update({
          where: { id: existingRole.id },
          data: {
            permissions: PermissionUtils.stringifyPermissions(roleData.permissions),
            default: roleData.default,
          },
        });
      } else {
        await this.pg.role.create({
          data: {
            name: roleData.name,
            permissions: PermissionUtils.stringifyPermissions(roleData.permissions),
            default: roleData.default,
            projectId,
          },
        });
      }
    }
  }

  getAvailablePermissions(): string[] {
    return Object.values(Permission);
  }

  getPermissionGroups(): Record<string, string[]> {
    return {
      project: [
        Permission.PROJECT_READ,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_DELETE,
        Permission.PROJECT_VIEW_MEMBERS,
        Permission.PROJECT_MANAGE_MEMBERS,
        Permission.PROJECT_MANAGE_ROLES,
      ],
      task: [
        Permission.TASK_CREATE,
        Permission.TASK_READ,
        Permission.TASK_UPDATE,
        Permission.TASK_DELETE,
        Permission.TASK_ARCHIVE,
        Permission.TASK_ASSIGN,
      ],
      subtask: [
        Permission.SUBTASK_CREATE,
        Permission.SUBTASK_READ,
        Permission.SUBTASK_UPDATE,
        Permission.SUBTASK_DELETE,
      ],
      section: [
        Permission.SECTION_CREATE,
        Permission.SECTION_READ,
        Permission.SECTION_UPDATE,
        Permission.SECTION_DELETE,
      ],
      comment: [
        Permission.COMMENT_CREATE,
        Permission.COMMENT_READ,
        Permission.COMMENT_UPDATE,
        Permission.COMMENT_DELETE,
      ],
    };
  }
}
