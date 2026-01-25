import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission } from "@/common/enum/permission.enum";
import { PermissionUtils } from "@/common/utils/permission.utils";
import { DatabaseService } from "@/modules/database/database.service";

// Decorator key for storing required permissions
export const PERMISSIONS_KEY = "permissions";

/**
 * Decorator to specify required permissions for a controller method
 * @param permissions - Array of Permission enums required to access the method
 * 
 * Usage:
 * @RequirePermissions(Permission.TASK_CREATE, Permission.TASK_UPDATE)
 * @Post()
 * async createTask() { ... }
 */
export function RequirePermissions(...permissions: Permission[]) {
  return Reflector.createDecorator<Permission[]>()(permissions);
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private db: DatabaseService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<Permission[]>(PERMISSIONS_KEY, context.getHandler());

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const projectId = request.params.projectId || request.body?.projectId || request.query?.projectId;

    if (!userId) {
      throw new ForbiddenException("User not found");
    }

    if (!projectId) {
      throw new ForbiddenException("Project ID is required");
    }

    const projectMember = await this.db.projectMember.findUnique({
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
      throw new ForbiddenException("You are not a member of this project");
    }

    const userPermissions = PermissionUtils.parsePermissions(projectMember.role.permissions);

    if (!PermissionUtils.hasAllPermissions(userPermissions, requiredPermissions)) {
      throw new ForbiddenException(
        `You do not have permission to perform this action. Required: ${requiredPermissions.join(", ")}`
      );
    }

    request.userPermissions = userPermissions;
    request.userRole = projectMember.role;

    return true;
  }
}
