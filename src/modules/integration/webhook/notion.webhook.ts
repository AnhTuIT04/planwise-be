import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac, timingSafeEqual } from "crypto";
import { IntegrationProvider, TaskStatus } from "prisma/client/pg";
import { PgService } from "@/modules/database/pg.service";
import { SocketEmitter } from "@/modules/realtime/socket.emitter";
import { NotionAdapter } from "../adapters/notion.adapter";

@Injectable()
export class NotionWebhookService {
  private readonly logger = new Logger(NotionWebhookService.name);
  private readonly verificationToken?: string;

  constructor(
    private readonly prisma: PgService,
    private readonly configService: ConfigService,
    private readonly socketEmitter: SocketEmitter,
    private readonly notionAdapter: NotionAdapter,
  ) {
    this.verificationToken = this.configService.get<string>("env.NOTION_VERIFICATION_TOKEN") || undefined;
  }

  /**
   * Handles Notion's initial verification handshake. Notion delivers a one-time
   * `verification_token` in the request body to confirm we control the URL.
   * We log it so the operator can copy it into NOTION_VERIFICATION_TOKEN, then
   * echo it back as required by the Notion docs.
   */
  handleVerificationHandshake(body: any): { verification_token: string } | null {
    if (body?.verification_token) {
      this.logger.log(
        `Notion verification handshake received. Set NOTION_VERIFICATION_TOKEN=${body.verification_token} and restart.`,
      );
      return { verification_token: body.verification_token };
    }
    return null;
  }

  /**
   * Verifies the X-Notion-Signature HMAC-SHA256 of the raw body using the stored
   * verification token. Returns true when valid.
   */
  verifySignature(signatureHeader: string | undefined, rawBody: Buffer | undefined): boolean {
    if (!this.verificationToken || !signatureHeader || !rawBody) return false;
    const expected = `sha256=${createHmac("sha256", this.verificationToken).update(rawBody).digest("hex")}`;
    const a = Buffer.from(signatureHeader);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  }

  async handleNotionWebhook(payload: any): Promise<void> {
    const { type, workspace_id, entity } = payload;

    if (!workspace_id || !entity || entity.type !== "page") {
      this.logger.debug(`Ignoring Notion webhook: type=${type}, workspace_id=${workspace_id}`);
      return;
    }

    this.logger.log(`Received Notion webhook: type=${type}, workspace_id=${workspace_id}, page_id=${entity.id}`);

    // 1. Find all connections belonging to this workspace
    const connections = await this.prisma.integrationConnection.findMany({
      where: {
        provider: IntegrationProvider.NOTION,
        isActive: true,
        // Match workspace_id stored in metadata
        metadata: {
          path: ["workspaceId"],
          equals: workspace_id,
        },
      },
    });

    if (connections.length === 0) {
      this.logger.warn(`No active connections found for Notion workspace ${workspace_id}`);
      return;
    }

    // Notify all relevant users that *something* changed in their Notion data so
    // the FE can invalidate Notion-backed queries (databases/pages lists).
    for (const c of connections) {
      this.socketEmitter.to(`user:${c.userId}`).emit("integration:notion", {
        type,
        workspaceId: workspace_id,
        entityId: entity?.id,
        entityType: entity?.type,
      });
    }

    // 2. Process for each connection (multiple users might share the same workspace)
    for (const connection of connections) {
      try {
        // Fetch fresh details from Notion using this connection's access token
        const pageResponse = await fetch(`https://api.notion.com/v1/pages/${entity.id}`, {
          headers: {
            Authorization: `Bearer ${connection.accessToken}`,
            "Notion-Version": "2022-06-28",
          },
        });

        if (!pageResponse.ok) {
          this.logger.warn(`Failed to fetch page ${entity.id} for connection ${connection.id}`);
          continue;
        }

        const pageData = await pageResponse.json();
        const taskData = this.notionAdapter.mapNotionPageToTaskData(pageData);

        // 3. Find corresponding task in our DB
        const existingTask = await this.prisma.task.findFirst({
          where: { notionPageId: entity.id },
        });

        if (existingTask) {
          // Update the task
          const updatedTask = await this.prisma.task.update({
            where: { id: existingTask.id },
            data: {
              title: taskData.title,
              description: taskData.description,
              status: taskData.status as TaskStatus,
              deadline: taskData.deadline,
            },
          });

          // 4. Notify the user via socket
          const room = `user:${connection.userId}`;
          this.socketEmitter.to(room).emit("task:updated", {
            taskId: updatedTask.id,
            status: updatedTask.status,
            // Add other fields if needed for FE real-time update
          });

          this.logger.debug(`Updated task ${updatedTask.id} from Notion webhook`);
        } else {
          this.logger.debug(`No local task found for Notion page ${entity.id}`);
        }
      } catch (error: any) {
        this.logger.error(`Error processing Notion webhook for connection ${connection.id}: ${error.message}`);
      }
    }
  }
}
