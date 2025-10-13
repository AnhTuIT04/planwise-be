import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiSecurity } from "@nestjs/swagger";

export const IS_PUBLIC_KEY = "isPublic";

/**
 * Decorator that marks a route or controller as publicly accessible, bypassing authentication requirements.
 *
 * This decorator applies metadata to indicate that the decorated endpoint should be accessible
 * without authentication and overrides any global security requirements.
 *
 * @example
 * ```typescript
 * @Public()
 * @Get('health')
 * getHealthStatus() {
 *   return { status: 'ok' };
 * }
 * ```
 *
 * @returns A decorator function that can be applied to controllers or route handlers
 */
export const Public = () =>
  applyDecorators(
    SetMetadata(IS_PUBLIC_KEY, true),
    ApiSecurity({}), // Override global security requirement
  );
