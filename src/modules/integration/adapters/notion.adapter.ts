import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IntegrationProvider } from "prisma/client/pg";
import { IIntegrationAdapter, OAuthTokens, TokenRefreshResult } from "../types/integration.types";

@Injectable()
export class NotionAdapter implements IIntegrationAdapter {
  readonly provider = IntegrationProvider.NOTION;
  private readonly logger = new Logger(NotionAdapter.name);

  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>("NOTION_CLIENT_ID") || "";
    this.clientSecret = this.configService.get<string>("NOTION_CLIENT_SECRET") || "";

    // Notion OAuth uses the exact exact redirect string registered in the app integration dashboard
    // Currently, our main integration callback is /api/v1/integrations/callback
    // Let's rely on an env variable or default logic if needed
    const apiPrefix = this.configService.get<string>("API_PREFIX");
    const apiVersion = this.configService.get<string>("API_VERSION");
    const domain = this.configService.get<string>("DOMAIN");
    const port = this.configService.get<string>("PORT");
    const isLocal = domain === "localhost" || domain === "127.0.0.1";

    // fallback or generated callback url
    this.redirectUri = `http${!isLocal ? "s" : ""}://${domain}${isLocal ? ":" + port : ""}/integrations/callback`;
  }

  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: "code",
      owner: "user",
      redirect_uri: this.redirectUri,
      state,
    });
    return `https://api.notion.com/v1/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForTokens(code: string): Promise<OAuthTokens> {
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Notion exchange token failed: ${errorText}`);
      throw new Error("Failed to exchange code for Notion tokens");
    }

    const data = await response.json();
    console.log("data: ", data);

    const expiresAt = data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : undefined;

    return {
      accessToken: data.access_token,
      // Notion tokens don't expire for typical public integrations
      expiresAt: undefined,
      refreshToken: data.refresh_token, // Notion typical doesn't issue refresh token
      scopes: [],
      extraData: {
        workspaceId: data.workspace_id,
        workspaceName: data.workspace_name,
        botId: data.bot_id,
      },
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<TokenRefreshResult> {
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Notion token refresh failed: ${errorText}`);
      throw new Error("Failed to refresh Notion token");
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      expiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : undefined,
    };
  }

  async revokeAccess(accessToken: string): Promise<void> {
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await fetch("https://api.notion.com/v1/oauth/revoke", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Notion token revocation failed: ${errorText}`);
    }
  }

  async introspectToken(accessToken: string): Promise<any> {
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await fetch("https://api.notion.com/v1/oauth/introspect", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Notion token introspection failed: ${errorText}`);
      throw new Error("Failed to introspect Notion token");
    }

    return response.json();
  }

  // Not strictly applicable (calendar-specific implementations), but stubbed to fulfill interface.
  list(accessToken: string, options: any): Promise<any> {
    return Promise.resolve({ events: [] });
  }

  async create(accessToken: string, payload: any): Promise<any> {}
  async update(accessToken: string, id: string, payload: any): Promise<any> {}
  async delete(accessToken: string, id: string): Promise<void> {}

  public mapNotionPageToTaskData(page: any) {
    let title = "Untitled Notion Task";
    let description = `Imported from Notion: ${page.url}`;
    let taskStatus = "TODO";
    let dueDate: string | undefined = undefined;

    if (page.properties) {
      for (const key in page.properties) {
        const prop = page.properties[key];

        if (prop.type === "title" && prop.title && prop.title.length > 0) {
          title = prop.title.map((t: any) => t.plain_text).join("");
        } else if (prop.type === "rich_text" && prop.rich_text && prop.rich_text.length > 0) {
          description += "\n\n" + key + ": " + prop.rich_text.map((t: any) => t.plain_text).join("");
        } else if (prop.type === "status" || prop.type === "select") {
          const name = (prop.status?.name || prop.select?.name || "").toLowerCase();
          if (name.includes("done") || name.includes("hoàn thành")) taskStatus = "DONE";
          else if (name.includes("progress") || name.includes("đang làm")) taskStatus = "DOING";
          else if (name.includes("cancel") || name.includes("hủy")) taskStatus = "CANCELLED";
        } else if (prop.type === "date" && prop.date) {
          if (prop.date.start) dueDate = prop.date.start;
          if (prop.date.end) {
            dueDate = prop.date.end;
          }
        }
      }
    }

    return {
      title,
      description,
      status: taskStatus,
      deadline: dueDate ? new Date(dueDate).toISOString() : undefined,
      notionPageId: page.id,
    };
  }
}
