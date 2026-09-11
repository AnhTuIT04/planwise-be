import { Controller, Post, Res, Body, UseGuards, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { type Response } from "express";

import { AppConfig } from "@/config/app.config";
import { Public } from "@/decorators/public.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { AdminAuthService } from "./admin-auth.service";
import { AdminJwtGuard } from "./guards/admin-jwt.guard";
import { ADMIN_COOKIE_NAME } from "./strategies/admin-jwt.strategy";
import { GetCurrentAdminId } from "./decorators/get-current-admin.decorator";
import { AdminSignInDto } from "./dto/request/admin-signin.dto";
import { AdminResponse } from "./dto/response/admin-response.dto";

// NOTE: every route is marked @Public() so the globally registered user JwtGuard
// (APP_GUARD) skips it; admin-only routes are then protected by AdminJwtGuard.
@ApiTags("Admin Auth")
@Controller("admin/auth")
export class AdminAuthController {
  private getCookieOptions() {
    const { NODE_ENV, DOMAIN } = this.configService.get<AppConfig>("env")!;

    return {
      httpOnly: true,
      domain: DOMAIN,
      sameSite: "lax" as const,
      secure: (NODE_ENV as string) === "production",
    };
  }

  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("signin")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign in as an admin with email and password" })
  @ApiResponse({ status: 200, type: AdminResponse, description: "Admin signed in successfully." })
  async signin(@Body() adminSignInDto: AdminSignInDto, @Res() res: Response) {
    const { accessToken, admin } = await this.adminAuthService.signin(adminSignInDto);
    res.cookie(ADMIN_COOKIE_NAME, accessToken, this.getCookieOptions());

    return res.json(new AdminResponse(admin, "Signed in successfully."));
  }

  @Post("signout")
  @Public()
  @UseGuards(AdminJwtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign out admin (clear admin auth cookie)" })
  @ApiResponse({ status: 200, type: MessageOnlyResponse, description: "Admin signed out successfully." })
  signout(@Res() res: Response) {
    res.clearCookie(ADMIN_COOKIE_NAME, this.getCookieOptions());

    return res.json(new MessageOnlyResponse("Signed out successfully."));
  }

  @Get("me")
  @Public()
  @UseGuards(AdminJwtGuard)
  @ApiOperation({ summary: "Get current authenticated admin" })
  @ApiResponse({ status: 200, type: AdminResponse, description: "Admin data retrieved successfully." })
  getMe(@GetCurrentAdminId() adminId: string) {
    return this.adminAuthService.getAdminData(adminId);
  }
}
