import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard protecting admin-only routes using the "admin-jwt" passport strategy.
 *
 * Admin routes are also marked with `@Public()` so that the globally registered
 * user `JwtGuard` (APP_GUARD) skips them; this guard then enforces the admin JWT
 * extracted from the dedicated admin cookie.
 */
@Injectable()
export class AdminJwtGuard extends AuthGuard("admin-jwt") {}
