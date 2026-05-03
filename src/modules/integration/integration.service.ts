import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  Logger,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IntegrationProvider, Prisma } from "prisma/client/pg";
import { PgService } from "@/modules/database/pg.service";
import { CacheService } from "@/modules/cache/cache.service";
import {
  IIntegrationAdapter,
  CreateEventInput,
  UpdateEventInput,
  CreateMessageInput,
  UpdateMessageInput,
  ConnectionInfo,
  SyncEventResult,
  IntegrationCalendarData,
  IntegrationGmailData,
} from "./types/integration.types";
import { CalendarAdapter } from "./adapters/calendar.adapter";
import { GmailAdapter } from "./adapters/gmail.adapter";
import { NotionAdapter } from "./adapters/notion.adapter";
import { CalendarWebhookService } from "./webhook/calendar.webhook";
import {
  ConnectionDetailsResponseDto,
  EventResponseDto,
  MessageIntegrationResponseDto,
  ConnectionMessageDetailsResponseDto,
} from "./dto";

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);
  private readonly adapters = new Map<IntegrationProvider, IIntegrationAdapter>();
  private readonly STATE_CACHE_PREFIX = "integration:oauth_state:";
  private readonly STATE_TTL = 600; // 10 minutes

  constructor(
    private readonly prisma: PgService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly calendarAdapter: CalendarAdapter,
    private readonly gmailAdapter: GmailAdapter,
    private readonly notionAdapter: NotionAdapter,
    @Inject(forwardRef(() => CalendarWebhookService))
    private readonly webhookService: CalendarWebhookService,
  ) {
    // Register adapters
    this.adapters.set(IntegrationProvider.GOOGLE_CALENDAR, this.calendarAdapter);
    this.adapters.set(IntegrationProvider.GOOGLE_GMAIL, this.gmailAdapter);
    this.adapters.set(IntegrationProvider.NOTION, this.notionAdapter);
  }

  private getAdapter(provider: IntegrationProvider): IIntegrationAdapter {
    console.log('provider',provider);
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw new BadRequestException(`Provider ${provider} is not supported`);
    }
    return adapter;
  }

  // ==================== OAuth Flow ====================

  async getAuthUrl(userId: string, provider: IntegrationProvider, redirectUrl?: string): Promise<string> {
    const adapter = this.getAdapter(provider);
    let paramRedirectUrl = redirectUrl || this.configService.get<string>("env.FE_REDIRECT_URL");
    if (provider === IntegrationProvider.GOOGLE_CALENDAR) {
      paramRedirectUrl += "?calendar_connected=true";
    } else if (provider === IntegrationProvider.GOOGLE_GMAIL) {
      paramRedirectUrl += "?gmail_connected=true";
    } else if (provider === IntegrationProvider.NOTION) {
      paramRedirectUrl += "/my-tasks?notion_connected=true";
    }

    // Create state with user info for callback
    const state = {
      userId,
      provider,
      redirectUrl: paramRedirectUrl,
      timestamp: Date.now(),
    };
    const stateString = Buffer.from(JSON.stringify(state)).toString("base64url");

    // Cache state for verification
    await this.cacheService.set(this.STATE_CACHE_PREFIX + stateString, state, this.STATE_TTL);

    return adapter.getAuthUrl(stateString);
  }

  async handleOAuthCallback(code: string, state: string): Promise<{ connectionId: string; redirectUrl: string }> {
    // Verify state
    const cachedState = await this.cacheService.get<{
      userId: string;
      provider: IntegrationProvider;
      redirectUrl: string;
    }>(this.STATE_CACHE_PREFIX + state);

    if (!cachedState) {
      throw new BadRequestException("Invalid or expired OAuth state");
    }

    // Delete used state
    await this.cacheService.del(this.STATE_CACHE_PREFIX + state);

    const { userId, provider, redirectUrl } = cachedState;
    const adapter = this.getAdapter(provider);

    // Exchange code for tokens
    const tokens = await adapter.exchangeCodeForTokens(code);
    console.log("IntegrationService - token: ", tokens);

    // Get account identifier (e.g., email from Google)
    const accountIdentifier = await this.getAccountIdentifier(provider, tokens.accessToken);
    console.log("IntegrationService - accountIdentifier: ", accountIdentifier);

    // Store connection
    const connection = await this.prisma.integrationConnection.upsert({
      where: {
        userId_provider_accountIdentifier: {
          userId,
          provider,
          accountIdentifier,
        },
      },
      create: {
        userId,
        provider,
        accountIdentifier,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        scopes: tokens.scopes || [],
        isActive: true,
      },
      update: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken || undefined,
        tokenExpiresAt: tokens.expiresAt,
        scopes: tokens.scopes || [],
        isActive: true,
      },
    });

    this.logger.log(`User ${userId} connected ${provider} account: ${accountIdentifier}`);

    // Trigger initial sync in background (don't await to avoid blocking redirect)
    if (provider === IntegrationProvider.GOOGLE_CALENDAR) {
      this.syncEvents(userId, provider, connection.id)
        .then((result) => {
          this.logger.log(`Initial sync completed for ${userId}/${provider}: ${result.synced} events synced`);
        })
        .catch((err) => {
          this.logger.error(`Initial sync failed for ${userId}/${provider}: ${err.message}`);
        });
      this.webhookService
        .registerWebhook(userId, provider, connection.id)
        .then(() => {
          this.logger.log(`Webhook registered for ${userId}/${provider}`);
        })
        .catch((err) => {
          this.logger.error(`Webhook registration failed for ${userId}/${provider}: ${err.message}`);
        });
    } else if (provider === IntegrationProvider.GOOGLE_GMAIL) {
      this.syncMessages(userId, provider, connection.id)
        .then((result) => {
          this.logger.log(`Initial sync completed for ${userId}/${provider}: ${result.synced} messages synced`);
        })
        .catch((err) => {
          this.logger.error(`Initial sync failed for ${userId}/${provider}: ${err.message}`);
        });
    }
    // else if (provider === IntegrationProvider.NOTION) {
    // }

    // Register webhook for real-time updates (don't await)

    return {
      connectionId: connection.id,
      redirectUrl: `${redirectUrl}`,
    };
  }

  private async getAccountIdentifier(provider: IntegrationProvider, accessToken: string): Promise<string> {
    // For Google providers, fetch user info
    if (provider === IntegrationProvider.GOOGLE_CALENDAR || provider === IntegrationProvider.GOOGLE_GMAIL) {
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      return data.email as string;
    }

    if (provider === IntegrationProvider.NOTION) {
      // Notion doesn't expose email easily, use bot_id or workspace info
      const response = await fetch("https://api.notion.com/v1/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Notion-Version": "2022-06-28",
        },
      });
      const data = await response.json();
      return data.id as string;
    }

    throw new BadRequestException(`Cannot get account identifier for ${provider as string}`);
  }

  // ==================== Connection Management ====================

  async getConnections(userId: string, provider?: IntegrationProvider): Promise<ConnectionInfo[]> {
    const connections = await this.prisma.integrationConnection.findMany({
      where: {
        userId,
        provider: provider ? { equals: provider } : undefined,
      },
      select: {
        id: true,
        provider: true,
        accountIdentifier: true,
        isActive: true,
        scopes: true,
        createdAt: true,
      },
    });

    return connections;
  }

  async getConnection(userId: string, provider: IntegrationProvider, connectionId: string) {
    const connection = await this.prisma.integrationConnection.findFirst({
      where: { userId, provider, id: connectionId, isActive: true },
    });

    if (!connection) {
      throw new NotFoundException(`No active ${provider} connection found`);
    }

    return connection;
  }

  async disconnectAccount(userId: string, provider: IntegrationProvider, connectionId: string): Promise<void> {
    const connection = await this.getConnection(userId, provider, connectionId);
    const adapter = this.getAdapter(provider);

    try {
      // Revoke access at provider
      await adapter.revokeAccess(connection.accessToken);
    } catch (error: any) {
      this.logger.warn(`Failed to revoke ${provider} access: ${error.message}`);
    }

    // Stop any active webhooks (only with Calendar for now)
    if (provider === IntegrationProvider.GOOGLE_CALENDAR) {
      const webhooks = await this.prisma.integrationWebhook.findMany({
        where: { connectionId: connection.id },
      });

      for (const webhook of webhooks) {
        try {
          await adapter.stopWebhook!(connection.accessToken, webhook.channelId, webhook.resourceId || "");
        } catch (error: any) {
          this.logger.warn(`Failed to stop webhook ${webhook.channelId}: ${error.message}`);
        }
      }
      // TODO: Add function cleanup for other providers if needed
    }
    //  else if (provider === IntegrationProvider.GOOGLE_GMAIL) {
    // } else if (provider === IntegrationProvider.NOTION) {
    // }

    // Delete connection and related data
    await this.prisma.integrationConnection.delete({ where: { id: connection.id } });

    this.logger.log(`User ${userId} disconnected account ${provider} (${connection.accountIdentifier})`);
  }

  // ==================== Token Management ====================

  async getValidAccessToken(
    connection: { id: string; accessToken: string; refreshToken: string | null; tokenExpiresAt: Date | null },
    provider: IntegrationProvider,
  ): Promise<string> {
    // Check if token is still valid (with 5 min buffer)
    if (connection.tokenExpiresAt && connection.tokenExpiresAt > new Date(Date.now() + 5 * 60 * 1000)) {
      return connection.accessToken;
    }

    // Token expired or expiring soon, refresh it
    if (!connection.refreshToken) {
      throw new UnauthorizedException("Token expired and no refresh token available. Please reconnect.");
    }

    const adapter = this.getAdapter(provider);
    const newTokens = await adapter.refreshAccessToken(connection.refreshToken);

    // Update stored tokens
    await this.prisma.integrationConnection.update({
      where: { id: connection.id },
      data: {
        accessToken: newTokens.accessToken,
        tokenExpiresAt: newTokens.expiresAt,
      },
    });

    this.logger.debug(`Refreshed access token for connection ${connection.id}`);
    return newTokens.accessToken;
  }

  // ==================== Event Operations ====================
  // ==========================================================
  async syncEvents(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
  ): Promise<{ synced: number; deleted: number }> {
    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    // Get sync state
    const syncState = await this.prisma.integrationSyncState.findFirst({
      where: {
        connectionId: connection.id,
        resourceType: "calendar_events",
        resourceId: "primary",
      },
    });

    const result: SyncEventResult = await adapter.list(accessToken, {
      syncToken: syncState?.syncToken || undefined,
      timeMin: syncState ? undefined : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days for initial sync
      timeMax: syncState ? undefined : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Next year
    });

    // Update local cache
    let synced = 0;
    let deleted = 0;

    for (const event of result.events) {
      await this.prisma.integrationEvent.upsert({
        where: {
          connectionId_provider_externalId: {
            connectionId: connection.id,
            provider,
            externalId: event.externalId,
          },
        },
        create: {
          connectionId: connection.id,
          provider,
          externalId: event.externalId,
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          isAllDay: event.isAllDay,
          location: event.location,
          status: event.status,
          rawData: event.rawData as Prisma.JsonObject,
          lastModifiedByApp: false,
          lastModifiedAt: new Date(),
        },
        update: {
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          isAllDay: event.isAllDay,
          location: event.location,
          status: event.status,
          rawData: event.rawData as Prisma.JsonObject,
          lastModifiedByApp: false,
          lastModifiedAt: new Date(),
          syncedAt: new Date(),
        },
      });
      synced++;
    }

    // Handle deletions
    if (result.deleted) {
      for (const externalId of result.deleted) {
        await this.prisma.integrationEvent.deleteMany({
          where: { connectionId: connection.id, provider, externalId },
        });
        deleted++;
      }
    }

    // Save sync token for incremental sync
    if (result.nextSyncToken) {
      await this.prisma.integrationSyncState.upsert({
        where: {
          connectionId_resourceType_resourceId: {
            connectionId: connection.id,
            resourceType: "calendar_events",
            resourceId: "primary",
          },
        },
        create: {
          connectionId: connection.id,
          resourceType: "calendar_events",
          resourceId: "primary",
          syncToken: result.nextSyncToken,
          lastSyncedAt: new Date(),
        },
        update: {
          syncToken: result.nextSyncToken,
          lastSyncedAt: new Date(),
        },
      });
    }

    this.logger.log(`Synced ${synced} events, deleted ${deleted} for user ${userId}`);
    return { synced, deleted };
  }

  async getLocalEvents(
    userId: string,
    provider: IntegrationProvider,
    timeMin?: Date,
    timeMax?: Date,
  ): Promise<ConnectionDetailsResponseDto[]> {
    const connections = await this.prisma.integrationConnection.findMany({
      where: { userId, provider },
      include: {
        events: {
          select: {
            id: true,
            externalId: true,
            provider: true,
            title: true,
            description: true,
            startTime: true,
            endTime: true,
            isAllDay: true,
            location: true,
            status: true,
            syncedAt: true,
          },
          where: {
            ...(timeMin && { endTime: { gte: timeMin } }),
            ...(timeMax && { startTime: { lte: timeMax } }),
          },
          orderBy: { startTime: "asc" },
        },
      },
    });

    return connections.map((conn) => {
      return {
        connectionId: conn.id,
        events: conn.events,
      };
    });
  }

  async createEvent(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
    input: CreateEventInput,
  ): Promise<EventResponseDto> {
    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    const event: IntegrationCalendarData = await adapter.create(accessToken, input);

    // Cache locally with flag to prevent webhook loop
    const localEvent = await this.prisma.integrationEvent.create({
      data: {
        provider,
        externalId: event.externalId,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        isAllDay: event.isAllDay,
        location: event.location,
        status: event.status,
        rawData: event.rawData as Prisma.JsonObject,
        lastModifiedByApp: true,
        lastModifiedAt: new Date(),
        connectionId: connection.id,
      },
      select: {
        id: true,
        externalId: true,
        provider: true,
        title: true,
        description: true,
        startTime: true,
        endTime: true,
        isAllDay: true,
        location: true,
        status: true,
        syncedAt: true,
      },
    });

    return localEvent;
  }

  async updateEvent(
    userId: string,
    provider: IntegrationProvider,
    externalId: string,
    input: UpdateEventInput,
  ): Promise<EventResponseDto> {
    const existingEvent = await this.prisma.integrationEvent.findFirst({
      where: {
        provider,
        externalId,
      },
      include: { connection: true },
    });
    if (!existingEvent) {
      throw new NotFoundException("Event not found");
    }

    if (existingEvent.connection.userId !== userId) {
      throw new UnauthorizedException("You do not have permission to modify this event");
    }
    const accessToken = await this.getValidAccessToken(existingEvent.connection, provider);
    const adapter = this.getAdapter(provider);

    const event: IntegrationCalendarData = await adapter.update(accessToken, externalId, input);

    // Update local cache with flag
    const updatedEvent = await this.prisma.integrationEvent.update({
      where: {
        connectionId_provider_externalId: { connectionId: existingEvent.connectionId, provider, externalId },
      },
      data: {
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        isAllDay: event.isAllDay,
        location: event.location,
        status: event.status,
        rawData: event.rawData as Prisma.JsonObject,
        lastModifiedByApp: true,
        lastModifiedAt: new Date(),
      },
    });

    return updatedEvent;
  }

  async deleteEvent(userId: string, provider: IntegrationProvider, externalId: string): Promise<void> {
    const existingEvent = await this.prisma.integrationEvent.findFirst({
      where: {
        provider,
        externalId,
      },
      include: { connection: true },
    });
    if (!existingEvent) {
      throw new NotFoundException("Event not found");
    }

    if (existingEvent.connection.userId !== userId) {
      throw new UnauthorizedException("You do not have permission to delete this event");
    }

    const accessToken = await this.getValidAccessToken(existingEvent.connection, provider);
    const adapter = this.getAdapter(provider);

    await adapter.delete(accessToken, externalId);

    // Remove from local cache
    await this.prisma.integrationEvent.deleteMany({
      where: { connectionId: existingEvent.connectionId, provider, externalId },
    });
  }

  // ================== Message Operations ====================
  // ==========================================================
  async syncMessages(userId: string, provider: IntegrationProvider, connectionId: string): Promise<{ synced: number }> {
    if (provider !== IntegrationProvider.GOOGLE_GMAIL) {
      throw new BadRequestException("Message sync currently supports GOOGLE_GMAIL only");
    }

    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    const result = await adapter.list(accessToken, {
      maxResults: 20,
      labelIds: ["INBOX"],
    });

    const synced = result.messages?.length || 0;
    this.logger.log(`Synced ${synced} messages for user ${userId}`);

    return { synced };
  }

  async getMessages(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
    options: { maxResults?: number; q?: string; labelIds?: string[] },
  ): Promise<ConnectionMessageDetailsResponseDto[]> {
    if (provider !== IntegrationProvider.GOOGLE_GMAIL) {
      throw new BadRequestException("Messages API currently supports GOOGLE_GMAIL only");
    }

    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    const result: { messages: any[] } = await adapter.list(accessToken, {
      maxResults: options.maxResults,
      q: options.q,
      labelIds: options.labelIds,
    });

    return [
      {
        connectionId: connection.id,
        messages: result.messages.map((message: IntegrationGmailData) => this.mapMessageToResponse(message)),
      },
    ];
  }

  async createMessage(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
    input: CreateMessageInput,
  ): Promise<MessageIntegrationResponseDto> {
    if (provider !== IntegrationProvider.GOOGLE_GMAIL) {
      throw new BadRequestException("Create message currently supports GOOGLE_GMAIL only");
    }

    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    const message: IntegrationGmailData = await adapter.create(accessToken, input);
    return this.mapMessageToResponse(message);
  }

  async updateMessage(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
    externalId: string,
    input: UpdateMessageInput,
  ): Promise<MessageIntegrationResponseDto> {
    if (provider !== IntegrationProvider.GOOGLE_GMAIL) {
      throw new BadRequestException("Update message currently supports GOOGLE_GMAIL only");
    }

    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    const message: IntegrationGmailData = await adapter.update(accessToken, externalId, input);
    return this.mapMessageToResponse(message);
  }

  async deleteMessage(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
    externalId: string,
  ): Promise<void> {
    if (provider !== IntegrationProvider.GOOGLE_GMAIL) {
      throw new BadRequestException("Delete message currently supports GOOGLE_GMAIL only");
    }

    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    await adapter.delete(accessToken, externalId);
  }

  async markMessageAsRead(
    userId: string,
    provider: IntegrationProvider,
    connectionId: string,
    externalId: string,
  ): Promise<MessageIntegrationResponseDto> {
    if (provider !== IntegrationProvider.GOOGLE_GMAIL) {
      throw new BadRequestException("Mark as read currently supports GOOGLE_GMAIL only");
    }

    const connection = await this.getConnection(userId, provider, connectionId);
    const accessToken = await this.getValidAccessToken(connection, provider);
    const adapter = this.getAdapter(provider);

    const message: IntegrationGmailData = await adapter.update(accessToken, externalId, {
      removeLabelIds: ["UNREAD"],
    });

    return this.mapMessageToResponse(message);
  }

  private mapMessageToResponse(message: IntegrationGmailData): MessageIntegrationResponseDto {
    return {
      externalId: message.externalId,
      threadId: message.threadId,
      subject: message.subject,
      snippet: message.snippet,
      body: {
        html: message.bodyHtml,
        text: message.bodyText,
      },
      from: message.from,
      to: message.to,
      cc: message.cc,
      receivedAt: message.receivedAt,
      isUnread: message.isUnread,
      labelIds: message.labelIds || [],
    };
  }

  // ==================== Data Operations =====================
  // ==========================================================
  // TODO: Implement create/update/delete data functions for Notion provider
}
