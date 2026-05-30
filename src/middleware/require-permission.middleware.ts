import {
  Injectable,
  NestMiddleware,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Reflector } from '@nestjs/core';
import { PermissionChecker } from './permission-checker.service';
import {
  PERMISSION_KEY,
  REQUIRE_ALL_PERMISSIONS_KEY,
  ALLOW_PERSONAL_OWNER_KEY,
} from '@/decorators/require-permission.decorator';
import { Permission } from '@/common/enum/permission.enum';

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
  projectId?: string;
}

@Injectable()
export class RequirePermissionMiddleware implements NestMiddleware {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionChecker: PermissionChecker,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const handler = req.route?.stack[0]?.handle || null;
      if (!handler) {
        return next();
      }

      const requiredPermissions = this.reflector.get<Permission | Permission[]>(
        PERMISSION_KEY,
        handler,
      );
      const requireAll = this.reflector.get<boolean>(
        REQUIRE_ALL_PERMISSIONS_KEY,
        handler,
      ) ?? true;
      const allowPersonalOwner = this.reflector.get<boolean>(
        ALLOW_PERSONAL_OWNER_KEY,
        handler,
      ) ?? true;

      if (!requiredPermissions || !req.user?.id || !req.projectId) {
        return next();
      }

      const hasPermission = requireAll
        ? await this.permissionChecker.hasPermission(
          {
            userId: req.user.id,
            projectId: req.projectId,
            allowPersonalProjectOwner: allowPersonalOwner,
          },
          requiredPermissions,
        )
        : await this.permissionChecker.hasAnyPermission(
          {
            userId: req.user.id,
            projectId: req.projectId,
            allowPersonalProjectOwner: allowPersonalOwner,
          },
          Array.isArray(requiredPermissions)
            ? requiredPermissions
            : [requiredPermissions],
        );

      if (!hasPermission) {
        throw new ForbiddenException(
          'You do not have permission to perform this action',
        );
      }

      return next();
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      return next();
    }
  }
}
