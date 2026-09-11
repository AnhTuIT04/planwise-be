import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IntegrationProvider } from "prisma/client/pg";
import {
  OAuthTokens,
  TokenRefreshResult,
  IIntegrationAdapter,
  IntegrationGmailData,
  CreateMessageInput,
  UpdateMessageInput,
  SyncMessageOptions,
} from "../types/integration.types";

interface GmailListResponse {
  messages?: { id: string; threadId: string }[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
}

interface GmailHeader {
  name: string;
  value: string;
}

interface GmailMessage {
  id: string;
  threadId: string;
  snippet?: string;
  internalDate?: string;
  labelIds?: string[];
  payload?: {
    mimeType?: string;
    headers?: GmailHeader[];
    body?: {
      data?: string;
      attachmentId?: string;
      size?: number;
    };
    parts?: GmailMessagePart[];
  };
}

interface GmailMessagePart {
  mimeType?: string;
  body?: {
    data?: string;
    attachmentId?: string;
    size?: number;
  };
  parts?: GmailMessagePart[];
}

@Injectable()
export class GmailAdapter implements IIntegrationAdapter {
  readonly provider = IntegrationProvider.GOOGLE_GMAIL;
  private readonly logger = new Logger(GmailAdapter.name);

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>("env.GOOGLE_GMAIL_CLIENT_ID") || "";
    this.clientSecret = this.configService.get<string>("env.GOOGLE_GMAIL_CLIENT_SECRET") || "";
    this.redirectUrl = this.configService.get<string>("env.GOOGLE_GMAIL_REDIRECT_URL") || "";
  }

  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      response_type: "code",
      scope: this.scopes.join(" "),
      access_type: "offline",
      prompt: "consent",
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

  async list(
    accessToken: string,
    options: SyncMessageOptions,
  ): Promise<{ messages: IntegrationGmailData[]; nextPageToken?: string }> {
    const params = new URLSearchParams();

    if (options.maxResults) {
      params.set("maxResults", options.maxResults.toString());
    }
    if (options.q) {
      params.set("q", options.q);
    }
    if (options.pageToken) {
      params.set("pageToken", options.pageToken);
    }
    for (const labelId of options.labelIds || []) {
      params.append("labelIds", labelId);
    }

    const listResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${params.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!listResponse.ok) {
      throw new Error(await listResponse.text());
    }

    const listData: GmailListResponse = await listResponse.json();
    const messageRefs = listData.messages || [];

    const messages = await Promise.all(
      messageRefs.map(async (messageRef) => {
        const detailResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageRef.id}?format=full`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        if (!detailResponse.ok) {
          throw new Error(await detailResponse.text());
        }

        const detailData: GmailMessage = await detailResponse.json();
        return this.mapMessage(detailData);
      }),
    );

    return { messages, nextPageToken: listData.nextPageToken };
  }

  async create(accessToken: string, payload: CreateMessageInput): Promise<IntegrationGmailData> {
    const raw = this.toBase64Url(this.buildMime(payload));

    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        raw,
        threadId: payload.threadId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Send message failed: ${error}`);
      throw new Error("Failed to send message");
    }

    const data = await response.json();
    const detailResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${data.id}?format=full`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!detailResponse.ok) {
      throw new Error(await detailResponse.text());
    }

    const detailData: GmailMessage = await detailResponse.json();
    return this.mapMessage(detailData);
  }

  async update(accessToken: string, id: string, payload: UpdateMessageInput): Promise<IntegrationGmailData> {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addLabelIds: payload.addLabelIds || [],
        removeLabelIds: payload.removeLabelIds || [],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Update message failed: ${error}`);
      throw new Error("Failed to update message");
    }

    const data: GmailMessage = await response.json();
    const detailResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${data.id}?format=full`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!detailResponse.ok) {
      throw new Error(await detailResponse.text());
    }

    const detailData: GmailMessage = await detailResponse.json();
    return this.mapMessage(detailData);
  }

  async delete(accessToken: string, id: string): Promise<void> {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error("Failed to delete message");
    }
  }

  private mapMessage(message: GmailMessage): IntegrationGmailData {
    const headers = message.payload?.headers || [];
    const bodyContent = this.extractBodyContent(message.payload);

    return {
      externalId: message.id,
      threadId: message.threadId,
      subject: this.getHeader(headers, "Subject") || "(No subject)",
      snippet: message.snippet,
      bodyHtml: bodyContent.html,
      bodyText: bodyContent.text,
      from: this.getHeader(headers, "From"),
      to: this.getHeader(headers, "To"),
      cc: this.getHeader(headers, "Cc"),
      receivedAt: message.internalDate ? new Date(Number(message.internalDate)) : undefined,
      isUnread: (message.labelIds || []).includes("UNREAD"),
      labelIds: message.labelIds,
      rawData: message as unknown as Record<string, unknown>,
    };
  }

  private getHeader(headers: GmailHeader[], name: string): string | undefined {
    return headers.find((header) => header.name.toLowerCase() === name.toLowerCase())?.value;
  }

  private extractBodyContent(payload: GmailMessage["payload"]): {
    html?: string;
    text?: string;
  } {
    if (!payload) {
      return {};
    }

    let html: string | undefined;
    let text: string | undefined;

    const collectFromPart = (part?: GmailMessagePart | GmailMessage["payload"]): void => {
      if (!part) {
        return;
      }

      const mimeType = part.mimeType?.toLowerCase();
      const decoded = this.decodeBase64Url(part.body?.data);

      if (mimeType === "text/html" && decoded && !html) {
        html = decoded;
      }

      if (mimeType === "text/plain" && decoded && !text) {
        text = decoded;
      }

      for (const nestedPart of part.parts || []) {
        collectFromPart(nestedPart);
      }
    };

    collectFromPart(payload);

    // Gmail can put the content directly on payload.body for non-multipart messages.
    if (!html && !text) {
      const fallback = this.decodeBase64Url(payload.body?.data);
      if (fallback) {
        if (payload.mimeType?.toLowerCase() === "text/html") {
          html = fallback;
        } else {
          text = fallback;
        }
      }
    }

    return { html, text };
  }

  private decodeBase64Url(value?: string): string | undefined {
    if (!value) {
      return undefined;
    }

    try {
      const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
      const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
      return Buffer.from(normalized + padding, "base64").toString("utf8");
    } catch (error) {
      this.logger.warn(`Cannot decode Gmail body content: ${error instanceof Error ? error.message : "Unknown error"}`);
      return undefined;
    }
  }

  private buildMime(payload: CreateMessageInput): string {
    const lines = [
      `To: ${payload.to.join(", ")}`,
      ...(payload.cc?.length ? [`Cc: ${payload.cc.join(", ")}`] : []),
      ...(payload.bcc?.length ? [`Bcc: ${payload.bcc.join(", ")}`] : []),
      `Subject: ${payload.subject}`,
      "MIME-Version: 1.0",
      `Content-Type: ${payload.bodyHtml ? "text/html" : "text/plain"}; charset=UTF-8`,
      "",
      payload.bodyHtml || payload.bodyText || "",
    ];

    return lines.join("\r\n");
  }

  private toBase64Url(value: string): string {
    return Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
}
