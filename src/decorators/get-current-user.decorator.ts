import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

import { type JwtPayloadDto } from "~/auth/dto/jwt-payload.dto";

interface AuthRequest extends Request {
  user?: JwtPayloadDto;
}

/**
 * Parameter decorator that extracts the current authenticated user from the request object.
 *
 * This decorator retrieves the user information that was previously attached to the request
 * during the authentication process (typically by guards or middleware).
 *
 * @returns The current user object if authenticated, otherwise null
 *
 * @example
 * ```typescript
 * @Get('profile')
 * getProfile(@GetCurrentUser() user: User) {
 *   return user;
 * }
 * ```
 */
export const GetCurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthRequest>();
  return request.user || null;
});

/**
 * Parameter decorator that extracts the current user's ID from the request object.
 *
 * This decorator retrieves the authenticated user's ID from the request context,
 * typically populated by authentication middleware or guards.
 *
 * @returns The current user's ID if available, otherwise null
 *
 * @example
 * ```typescript
 * @Get('profile')
 * getProfile(@GetCurrentUserId() userId: string | null) {
 *   // userId will contain the authenticated user's ID or null
 * }
 * ```
 */
export const GetCurrentUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthRequest>();
  return request.user?.sub || null;
});
