import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IntegrationProvider } from "prisma/client/pg";
import {
  OAuthTokens,
  TokenRefreshResult,
  CreateEventInput,
  UpdateEventInput,
  WebhookRegistration,
  IntegrationCalendarData,
  SyncEventResult,
  SyncEventOptions,
  IIntegrationAdapter,
} from "../types/integration.types";

interface GoogleEvent {
  id: string;
  summary?: string;
  description?: string;
  start?: { dateTime?: string; date?: string; timeZone?: string };
  end?: { dateTime?: string; date?: string; timeZone?: string };
  location?: string;
  status?: string;
  updated?: string;
  attendees?: { email: string; responseStatus?: string }[];
}

interface GoogleEventsListResponse {
  items?: GoogleEvent[];
  nextSyncToken?: string;
  nextPageToken?: string;
}

@Injectable()
export class CalendarAdapter implements IIntegrationAdapter {
  readonly provider = IntegrationProvider.GOOGLE_CALENDAR;
  private readonly logger = new Logger(CalendarAdapter.name);

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>("env.GOOGLE_CALENDAR_CLIENT_ID") || "";
    this.clientSecret = this.configService.get<string>("env.GOOGLE_CALENDAR_CLIENT_SECRET") || "";
    this.redirectUrl = this.configService.get<string>("env.GOOGLE_CALENDAR_REDIRECT_URL") || "";
  }

  // ==================== OAuth ====================

  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      response_type: "code",
      scope: this.scopes.join(" "),
      access_type: "offline",
      prompt: "consent", // Force consent to always get refresh_token
      state,
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForTokens(code: string): Promise<OAuthTokens> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: this.redirectUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Token exchange failed: ${error}`);
      throw new Error("Failed to exchange code for tokens");
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000),
      scopes: data.scope?.split(" ") || this.scopes,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<TokenRefreshResult> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Token refresh failed: ${error}`);
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000),
    };
  }

  async revokeAccess(accessToken: string): Promise<void> {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
      method: "POST",
    });
  }

  // ==================== Events ====================

  async list(accessToken: string, options: SyncEventOptions): Promise<SyncEventResult> {
    let pageToken: string | undefined;

    const events: IntegrationCalendarData[] = [];
    const deleted: string[] = [];
    let nextSyncToken: string | undefined;

    do {
      const params = new URLSearchParams({
        singleEvents: "true",
      });

      if (!options.syncToken) {
        // orderBy make gg does not return nextSyncToken
        if (options.timeMin) params.set("timeMin", options.timeMin.toISOString());
        if (options.timeMax) params.set("timeMax", options.timeMax.toISOString());
      } else {
        params.set("syncToken", options.syncToken);
      }

      if (options.maxResults) {
        params.set("maxResults", options.maxResults.toString());
      }

      if (pageToken) {
        params.set("pageToken", pageToken);
      }

      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        if (response.status === 410) {
          this.logger.warn("Sync token invalid, performing full sync");
          return this.list(accessToken, { ...options, syncToken: undefined });
        }

        throw new Error(await response.text());
      }

      const data: GoogleEventsListResponse = await response.json();

      for (const item of data.items || []) {
        if (item.status === "cancelled") {
          deleted.push(item.id);
        } else {
          events.push(this.mapGoogleEvent(item));
        }
      }

      pageToken = data.nextPageToken;
      nextSyncToken = data.nextSyncToken;
    } while (pageToken);

    this.logger.debug(`Fetched ${events.length} events (${deleted.length} deleted) from Google Calendar`);
    this.logger.debug(`Next sync token: ${nextSyncToken}`);

    return {
      events,
      deleted,
      nextSyncToken,
    };
  }

  async create(accessToken: string,  payload: CreateEventInput): Promise<IntegrationCalendarData> {
    const body = this.mapToGoogleEvent(payload);

    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Create event failed: ${error}`);
      throw new Error("Failed to create event");
    }

    const data: GoogleEvent = await response.json();
    return this.mapGoogleEvent(data);
  }

  async update(accessToken: string, id: string,  payload: UpdateEventInput ): Promise<IntegrationCalendarData> {
    const body = this.mapToGoogleEvent(payload);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Update event failed: ${error}`);
      throw new Error("Failed to update event");
    }

    const data: GoogleEvent = await response.json();
    return this.mapGoogleEvent(data);
  }

  async delete(accessToken: string, id: string): Promise<void> {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error("Failed to delete event");
    }
  }

  // ==================== Webhook ====================

  async registerWebhook(
    accessToken: string,
    callbackUrl: string,
    calendarId: string = "primary",
  ): Promise<WebhookRegistration> {
    const channelId = `planwise-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/watch`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: channelId,
        type: "web_hook",
        address: callbackUrl,
        params: {
          ttl: "604800", // 7 days (max)
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Watch registration failed: ${error}`);
      throw new Error("Failed to register webhook");
    }

    const data = await response.json();
    return {
      channelId: data.id,
      resourceId: data.resourceId,
      expiresAt: new Date(parseInt(data.expiration)),
    };
  }

  async stopWebhook(accessToken: string, channelId: string, resourceId: string): Promise<void> {
    const response = await fetch("https://www.googleapis.com/calendar/v3/channels/stop", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: channelId,
        resourceId,
      }),
    });

    if (!response.ok) {
      this.logger.warn(`Failed to stop webhook channel ${channelId}`);
    }
  }

  // ==================== Helpers ====================

  private mapGoogleEvent(event: GoogleEvent): IntegrationCalendarData {
    const isAllDay = !event.start?.dateTime;
    const startTime = new Date(event.start?.dateTime || event.start?.date || new Date());
    const endTime = new Date(event.end?.dateTime || event.end?.date || new Date());

    return {
      externalId: event.id,
      title: event.summary || "(No title)",
      description: event.description,
      startTime,
      endTime,
      isAllDay,
      location: event.location,
      status: event.status,
      rawData: event as unknown as Record<string, unknown>,
    };
  }

  private mapToGoogleEvent(input: CreateEventInput | UpdateEventInput): Record<string, unknown> {
    const body: Record<string, unknown> = {};

    if ("title" in input && input.title) body.summary = input.title;
    if ("description" in input) body.description = input.description;
    if ("location" in input) body.location = input.location;
    if ("status" in input) body.status = input.status;

    const createInput = input as CreateEventInput;
    if (createInput.startTime && createInput.endTime) {
      if (createInput.isAllDay) {
        body.start = { date: this.toDateString(createInput.startTime) };
        body.end = { date: this.toDateString(createInput.endTime) };
      } else {
        body.start = { dateTime: createInput.startTime.toISOString() };
        body.end = { dateTime: createInput.endTime.toISOString() };
      }
    }

    if (createInput.attendees) {
      body.attendees = createInput.attendees.map((email) => ({ email }));
    }

    if (createInput.reminders) {
      body.reminders = {
        useDefault: false,
        overrides: createInput.reminders.map((r) => ({
          method: r.method,
          minutes: r.minutes,
        })),
      };
    }

    return body;
  }

  private toDateString(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
