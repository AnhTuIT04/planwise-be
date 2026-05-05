import { ConfigService } from "@nestjs/config";
import { Controller, Res, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { type Response } from "express";

import { Public } from "@/decorators/public.decorator";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { GoogleCalendarService } from "./google-calendar.service";

@ApiTags("Google Calendar Integration")
@Controller("integration/google-calendar")
export class GoogleCalendarController {
  constructor(
    private readonly configService: ConfigService,
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Connect to Google Calendar" })
  connect(@GetCurrentUserId() userId: string, @Res() res: Response) {
    const authUrl = this.googleCalendarService.getAuthUrl(userId);
    res.redirect(authUrl);
  }

  @Get("callback")
  @Public()
  @ApiOperation({ summary: "Handle Google Calendar OAuth callback" })
  async callback(@Query("code") code: string, @Query("state") userId: string, @Res() res: Response) {
    await this.googleCalendarService.handleCallback(code, userId);
    return res.redirect(this.configService.get<string>("INTEGRATION_SUCCESS_REDIRECT_URL")!);
  }
}
