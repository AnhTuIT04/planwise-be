import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ModuleRef } from "@nestjs/core";

import { PERMISSION_KEY } from "@/decorators/permission.decorator";
import { IPermissionHandler } from "../interfaces/permission-handler.interface";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const HandlerClass = this.reflector.getAllAndOverride<new (...args: any[]) => IPermissionHandler>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!HandlerClass) return true;

    // Instantiate the handler using Nest's dependency injection
    const handler = await this.moduleRef.create(HandlerClass);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const result = await handler.handle({ user, request });

    if (!result) {
      throw new ForbiddenException("Permission denied");
    }

    return true;
  }
}
