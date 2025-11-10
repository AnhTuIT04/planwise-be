import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";

/**
 * Decorator that marks a route or controller as publicly accessible, bypassing authentication.
 *
 * This decorator applies metadata to indicate that the decorated endpoint should be accessible
 * without requiring authentication or authorization checks.
 *
 * @returns A decorator function that can be applied to controllers or route handlers
 *
 * @example
 * ```typescript
 * @Controller('auth')
 * export class AuthController {
 *   @Public()
 *   @Post('login')
 *   async login(@Body() loginDto: LoginDto) {
 *     // This endpoint is publicly accessible
 *   }
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
