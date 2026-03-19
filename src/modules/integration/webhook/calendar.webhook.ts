import { Injectable, Logger, Inject, forwardRef } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { IntegrationProvider, Prisma } from "prisma/client/pg";
import { PgService } from "@/modules/database/pg.service";
import { SocketEmitter } from "@/modules/realtime/socket.emitter";
import { CalendarAdapter } from "../adapters/calendar.adapter";
import { IntegrationService } from "../integration.service";

interface GoogleWebhookHeaders {
  "x-goog-channel-id"?: string;
  "x-goog-resource-id"?: string;
  "x-goog-resource-state"?: string;
  "x-goog-message-number"?: string;
}

@Injectable()
export class CalendarWebhookService {
  private readonly logger = new Logger(CalendarWebhookService.name);
  private readonly webhookBaseUrl: string;

  constructor(
    private readonly prisma: PgService,
    private readonly configService: ConfigService,
    private readonly socketEmitter: SocketEmitter,
    private readonly calendarAdapter: CalendarAdapter,
    @Inject(forwardRef(() => IntegrationService)) // To avoid circular dependency
    private readonly integrationService: IntegrationService,
  ) {
    this.webhookBaseUrl = this.configService.get<string>("env.WEBHOOK_BASE_URL") || "";
  }

  // ==================== Google Calendar Webhook ====================

  async handleGoogleWebhook(headers: GoogleWebhookHeaders, _body: unknown): Promise<void> {
    const channelId = headers["x-goog-channel-id"];
    const resourceState = headers["x-goog-resource-state"];
    const resourceId = headers["x-goog-resource-id"];

    if (!channelId) {
      this.logger.warn("Received webhook without channel ID");
      return;
    }

    // Ignore sync messages (initial confirmation)
    if (resourceState === "sync") {
      this.logger.debug(`Webhook sync confirmation for channel ${channelId}`);
      return;
    }

    this.logger.debug(`Received Google webhook: channel=${channelId}, state=${resourceState}`);

    // Find the webhook registration to get the connection
    const webhook = await this.prisma.integrationWebhook.findUnique({
      where: { channelId },
      include: {
        connection: {
          select: {
            id: true,
            userId: true,
            provider: true,
            accessToken: true,
            refreshToken: true,
            tokenExpiresAt: true,
          },
        },
      },
    });

    if (!webhook) {
      this.logger.warn(`Webhook channel ${channelId} not found in database`);
      return;
    }

    const { connection } = webhook;

    try {
      // Get valid access token
      const accessToken = await this.integrationService.getValidAccessToken(connection, connection.provider);

      // Fetch the sync state to get incremental changes
      const syncState = await this.prisma.integrationSyncState.findFirst({
        where: {
          connectionId: connection.id,
          resourceType: "calendar_events",
          resourceId: "primary",
        },
      });

      // Fetch changed events using syncToken
      const result = await this.calendarAdapter.list(accessToken, {
        syncToken: syncState?.syncToken || undefined,
        timeMin: syncState ? undefined : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days for initial sync
        timeMax: syncState ? undefined : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Next year
      });

      // Process each event
      for (const event of result.events) {
        // Check if this was modified by our app (prevent loop)
        const existingEvent = await this.prisma.integrationEvent.findUnique({
          where: {
            connectionId_provider_externalId: {
              connectionId: connection.id,
              provider: connection.provider,
              externalId: event.externalId,
            },
          },
        });

        // Skip if we recently modified this event (within last 30 seconds)
        if (existingEvent?.lastModifiedByApp) {
          const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
          if (existingEvent.lastModifiedAt > thirtySecondsAgo) {
            this.logger.debug(`Skipping event ${event.externalId} - modified by app recently`);

            // Reset the flag
            await this.prisma.integrationEvent.update({
              where: { id: existingEvent.id },
              data: { lastModifiedByApp: false },
            });
            continue;
          }
        }

        // Upsert the event
        await this.prisma.integrationEvent.upsert({
          where: {
            connectionId_provider_externalId: {
              connectionId: connection.id,
              provider: connection.provider,
              externalId: event.externalId,
            },
          },
          create: {
            connectionId: connection.id,
            provider: connection.provider,
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

        const eventPayload = {
          externalId: event.externalId,
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          isAllDay: event.isAllDay,
          location: event.location,
          status: event.status,
        };

        const room = `user:${connection.userId}`;

        // Emit real-time update to user
        this.socketEmitter.to(room).emit("integration:calendar", {
          provider: connection.provider,
          event: eventPayload,
        });
      }

      // Handle deleted events
      if (result.deleted) {
        for (const externalId of result.deleted) {
          await this.prisma.integrationEvent.deleteMany({
            where: {
              connectionId: connection.id,
              provider: connection.provider,
              externalId,
            },
          });

          // Emit deletion event
          this.socketEmitter.to(`user:${connection.userId}`).emit("integration:calendar", {
            provider: connection.provider,
            externalId,
          });
        }
      }

      // Update sync token
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

      this.logger.log(`Processed webhook: ${result.events.length} updated, ${result.deleted?.length || 0} deleted`);
    } catch (error) {
      this.logger.error(`Failed to process webhook: ${error.message}`, error.stack);
    }
  }

  // ==================== Webhook Registration ====================

  async registerWebhook(userId: string, provider: IntegrationProvider, connectionId: string): Promise<void> {
    const connection = await this.integrationService.getConnection(userId, provider, connectionId);
    const accessToken = await this.integrationService.getValidAccessToken(connection, provider);

    if (provider === IntegrationProvider.GOOGLE_CALENDAR) {
      const callbackUrl = `${this.webhookBaseUrl}/api/v1/integrations/webhooks/google`;
      const registration = await this.calendarAdapter.registerWebhook(accessToken, callbackUrl, "primary");

      // Store webhook metadata
      await this.prisma.integrationWebhook.create({
        data: {
          channelId: registration.channelId,
          resourceId: registration.resourceId,
          resourceType: "calendar",
          expiresAt: registration.expiresAt,
          connectionId: connection.id,
        },
      });

      this.logger.log(`Registered webhook for user ${userId}, expires at ${registration.expiresAt}`);
    }
  }

  // ==================== Webhook Renewal (Cron Job) ====================

  @Cron(CronExpression.EVERY_HOUR)
  async renewExpiringWebhooks(): Promise<void> {
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);

    // Find webhooks expiring within the next hour
    const expiringWebhooks = await this.prisma.integrationWebhook.findMany({
      where: {
        expiresAt: { lte: oneHourFromNow },
      },
      include: {
        connection: {
          select: {
            id: true,
            userId: true,
            provider: true,
            accessToken: true,
            refreshToken: true,
            tokenExpiresAt: true,
            isActive: true,
          },
        },
      },
    });

    for (const webhook of expiringWebhooks) {
      if (!webhook.connection.isActive) {
        // Delete webhook for inactive connections
        await this.prisma.integrationWebhook.delete({ where: { id: webhook.id } });
        continue;
      }

      try {
        const accessToken = await this.integrationService.getValidAccessToken(
          webhook.connection,
          webhook.connection.provider,
        );

        // Stop old webhook
        if (webhook.connection.provider === IntegrationProvider.GOOGLE_CALENDAR) {
          await this.calendarAdapter.stopWebhook(accessToken, webhook.channelId, webhook.resourceId || "");
        }

        // Delete old webhook record
        await this.prisma.integrationWebhook.delete({ where: { id: webhook.id } });

        // Register new webhook
        await this.registerWebhook(webhook.connection.userId, webhook.connection.provider, webhook.connection.id);

        this.logger.log(`Renewed webhook for connection ${webhook.connectionId}`);
      } catch (error) {
        this.logger.error(`Failed to renew webhook ${webhook.id}: ${error.message}`);
      }
    }

    if (expiringWebhooks.length > 0) {
      this.logger.log(`Processed ${expiringWebhooks.length} webhook renewals`);
    }
  }
}
