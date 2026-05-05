import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { google, Auth } from "googleapis";

import { PgService } from "~/database/pg.service";

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private pg: PgService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>("GOOGLE_CALENDAR_CLIENT_ID"),
      this.configService.get<string>("GOOGLE_CALENDAR_CLIENT_SECRET"),
      this.configService.get<string>("GOOGLE_CALENDAR_REDIRECT_URL"),
    );
  }

  getAuthUrl(userId: string) {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
      state: userId, // Pass user ID in state for later retrieval
    });
  }

  async handleCallback(code: string, userId: string) {
    const { tokens } = await this.oauth2Client.getToken(code);

    if (!tokens.access_token) {
      throw new Error("No access token returned from Google");
    }
  }
}
