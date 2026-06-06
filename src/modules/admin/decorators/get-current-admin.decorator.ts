import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

import { type AdminJwtPayloadDto } from "../dto/admin-jwt-payload.dto";

interface AdminAuthRequest extends Request {
  user?: AdminJwtPayloadDto;
}

/**
 * Parameter decorator that extracts the current admin's ID from the request object.
 *
 * Populated by the AdminJwtGuard / "admin-jwt" passport strategy.
 */
export const GetCurrentAdminId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AdminAuthRequest>();
  return request.user?.sub || null;
});
