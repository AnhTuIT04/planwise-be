import { Injectable, Logger, Inject, forwardRef } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { IntegrationProvider } from "prisma/client/pg";

import { PgService } from "@/modules/database/pg.service";
import { SocketEmitter } from "@/modules/realtime/socket.emitter";
import { GmailAdapter } from "../adapters/gmail.adapter";
import { IntegrationService } from "../integration.service";

interface PubSubPushMessage {
  message?: {
    data?: string;
    messageId?: string;
    publishTime?: string;
  };
  subscription?: string;
}

const GMAIL_RESOURCE_TYPE = "gmail_mailbox";
const GMAIL_HISTORY_RESOURCE_TYPE = "gmail_history";

@Injectable()
export class GmailWebhookService {
  private readonly logger = new Logger(GmailWebhookService.name);
  private readonly pubsubTopic: string;
  private readonly verificationToken?: string;

  constructor(
    private readonly prisma: PgService,
    private readonly configService: ConfigService,
    private readonly socketEmitter: SocketEmitter,
    private readonly gmailAdapter: GmailAdapter,
    @Inject(forwardRef(() => IntegrationService))
    private readonly integrationService: IntegrationService,
  ) {
    this.pubsubTopic = this.configService.get<string>("env.GMAIL_PUBSUB_TOPIC") || "";
    this.verificationToken = this.configService.get<string>("env.GMAIL_PUBSUB_VERIFICATION_TOKEN") || undefined;
  }

  async handleGmailPush(query: Record<string, string | undefined>, body: PubSubPushMessage): Promise<void> {
    if (this.verificationToken && query.token !== this.verificationToken) {
      this.logger.warn("Rejecting Gmail push: bad verification token");
      return;
    }

    const dataB64 = body?.message?.data;
    if (!dataB64) {
      this.logger.warn("Gmail push body missing message.data");
      return;
    }

    let payload: { emailAddress?: string; historyId?: string };
    try {
      payload = JSON.parse(Buffer.from(dataB64, "base64").toString("utf8"));
    } catch (err: any) {
      this.logger.warn(`Failed to decode Gmail push payload: ${err.message}`);
      return;
    }

    const { emailAddress, historyId } = payload;
    if (!emailAddress || !historyId) {
      this.logger.warn("Gmail push payload missing emailAddress/historyId");
      return;
    }

    const connection = await this.prisma.integrationConnection.findFirst({
      where: {
        provider: IntegrationProvider.GOOGLE_GMAIL,
        accountIdentifier: emailAddress,
        isActive: true,
      },
    });

    if (!connection) {
      this.logger.warn(`No active Gmail connection for ${emailAddress}`);
      return;
    }

    try {
      const accessToken = await this.integrationService.getValidAccessToken(connection, connection.provider);

      const syncState = await this.prisma.integrationSyncState.findFirst({
        where: {
          connectionId: connection.id,
          resourceType: GMAIL_HISTORY_RESOURCE_TYPE,
          resourceId: emailAddress,
        },
      });

      const startHistoryId = syncState?.syncToken || historyId;
      const { historyId: latestHistoryId } = await this.gmailAdapter.getHistory(accessToken, startHistoryId);

      await this.prisma.integrationSyncState.upsert({
        where: {
          connectionId_resourceType_resourceId: {
            connectionId: connection.id,
            resourceType: GMAIL_HISTORY_RESOURCE_TYPE,
            resourceId: emailAddress,
          },
        },
        create: {
          connectionId: connection.id,
          resourceType: GMAIL_HISTORY_RESOURCE_TYPE,
          resourceId: emailAddress,
          syncToken: latestHistoryId || historyId,
          lastSyncedAt: new Date(),
        },
        update: {
          syncToken: latestHistoryId || historyId,
          lastSyncedAt: new Date(),
        },
      });

      this.socketEmitter.to(`user:${connection.userId}`).emit("integration:gmail", {
        connectionId: connection.id,
      });
    } catch (error: any) {
      this.logger.error(`Failed to process Gmail push for ${emailAddress}: ${error.message}`);
    }
  }

  async registerWatch(userId: string, connectionId: string): Promise<void> {
    if (!this.pubsubTopic) {
      this.logger.warn("GMAIL_PUBSUB_TOPIC not configured — skipping Gmail watch registration");
      return;
    }

    const connection = await this.integrationService.getConnection(
      userId,
      IntegrationProvider.GOOGLE_GMAIL,
      connectionId,
    );
    const accessToken = await this.integrationService.getValidAccessToken(connection, connection.provider);

    const { historyId, expiresAt } = await this.gmailAdapter.watch(accessToken, this.pubsubTopic);

    const channelId = `gmail-${connection.id}-${Date.now()}`;
    await this.prisma.integrationWebhook.upsert({
      where: { channelId },
      create: {
        channelId,
        resourceId: connection.accountIdentifier,
        resourceType: GMAIL_RESOURCE_TYPE,
        expiresAt,
        connectionId: connection.id,
      },
      update: { expiresAt },
    });

    await this.prisma.integrationSyncState.upsert({
      where: {
        connectionId_resourceType_resourceId: {
          connectionId: connection.id,
          resourceType: GMAIL_HISTORY_RESOURCE_TYPE,
          resourceId: connection.accountIdentifier,
        },
      },
      create: {
        connectionId: connection.id,
        resourceType: GMAIL_HISTORY_RESOURCE_TYPE,
        resourceId: connection.accountIdentifier,
        syncToken: historyId,
        lastSyncedAt: new Date(),
      },
      update: { syncToken: historyId, lastSyncedAt: new Date() },
    });

    this.logger.log(`Registered Gmail watch for user ${userId} (expires ${expiresAt.toISOString()})`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async renewExpiringWatches(): Promise<void> {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const expiringWatches = await this.prisma.integrationWebhook.findMany({
      where: {
        resourceType: GMAIL_RESOURCE_TYPE,
        expiresAt: { lte: tomorrow },
      },
      include: {
        connection: {
          select: { id: true, userId: true, provider: true, isActive: true },
        },
      },
    });

    for (const watch of expiringWatches) {
      if (!watch.connection.isActive) {
        await this.prisma.integrationWebhook.delete({ where: { id: watch.id } });
        continue;
      }
      try {
        await this.prisma.integrationWebhook.delete({ where: { id: watch.id } });
        await this.registerWatch(watch.connection.userId, watch.connection.id);
      } catch (error: any) {
        this.logger.error(`Failed to renew Gmail watch ${watch.id}: ${error.message}`);
      }
    }
  }
}
