import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DatabaseService } from '@/modules/database/database.service';
import { PermissionService } from '@/modules/permission/permission.service';
import { Permission } from '@/common/enum/permission.enum';
import { permissionAsyncStorage } from './permission-context';

export interface RequestWithPermission extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
  projectId?: string;
}

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  constructor(
    private readonly db: DatabaseService,
    private readonly permissionService: PermissionService,
  ) {}

  async use(req: RequestWithPermission, res: Response, next: NextFunction) {
    try {
      // Chỉ xử lý nếu có user và projectId
      if (!req.user?.id) {
        return next();
      }

      // Lấy projectId từ path, query, hoặc body
      const projectId = this.extractProjectId(req);
      if (!projectId) {
        return next();
      }

      req.projectId = projectId;

      const project = await this.db.project.findUnique({
        where: { id: projectId },
        select: { ownerId: true, isPersonal: true },
      });

      if (!project) {
        throw new BadRequestException('Project not found');
      }

      const isPersonalProject = project.isPersonal;
      const isProjectOwner = project.ownerId === req.user.id;

      let permissions: Permission[] = [];
      if (!isPersonalProject || !isProjectOwner) {
        const perms = await this.permissionService.getUserPermissions(
          req.user.id,
          projectId,
        );
        permissions = perms as Permission[];
      }

      const context = {
        userId: req.user.id,
        projectId,
        permissions,
        isPersonalProject,
        isProjectOwner,
      };

      return permissionAsyncStorage.run(context, () => next());
    } catch (error) {
      return next();
    }
  }

  private extractProjectId(req: RequestWithPermission): string | null {
    if (req.params.projectId) {
      return req.params.id;
    }

    if (typeof req.query.projectId === 'string') {
      return req.query.projectId;
    }

    if (
      req.body &&
      typeof req.body === 'object' &&
      typeof req.body.projectId === 'string'
    ) {
      return req.body.projectId;
    }

    const projectMatch = req.path.match(/\/projects\/([a-zA-Z0-9_-]+)\//);
    if (projectMatch?.[1]) {
      return projectMatch[1];
    }

    return null;
  }
}
