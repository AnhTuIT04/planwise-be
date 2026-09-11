import { type IntegrationProvider } from "prisma/client/pg";

// ==================== Provider Configuration ====================
export interface ProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  scopes: string[];
}

export interface ProviderConfigs {
  [IntegrationProvider.GOOGLE_CALENDAR]: ProviderConfig;
  [IntegrationProvider.GOOGLE_GMAIL]: ProviderConfig;
  [IntegrationProvider.NOTION]: ProviderConfig;
}

// ==================== OAuth Tokens ====================
export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  scopes?: string[];
  extraData?: {
    workspaceId: string;
    workspaceName: string;
    botId: string;
  };
}

export interface TokenRefreshResult {
  accessToken: string;
  expiresAt?: Date;
}

// ==================== Integration Data (Response from Providers) ====================
export interface IntegrationCalendarData {
  externalId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  isAllDay: boolean;
  location?: string;
  status?: string;
  colorId?: string;
  rawData?: Record<string, unknown>;
}
export interface IntegrationGmailData {
  externalId: string;
  threadId: string;
  subject: string;
  snippet?: string;
  bodyHtml?: string;
  bodyText?: string;
  from?: string;
  to?: string;
  cc?: string;
  receivedAt?: Date;
  isUnread: boolean;
  labelIds?: string[];
  rawData?: Record<string, unknown>;
}

// ==================== Create/Update Payloads (Request to Providers) ====================
export interface CreateEventInput {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  isAllDay?: boolean;
  location?: string;
  attendees?: string[];
  reminders?: { method: string; minutes: number }[];
}
export interface CreateMessageInput {
  to: string[];
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  cc?: string[];
  bcc?: string[];
  threadId?: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  status?: string;
}
export interface UpdateMessageInput extends Partial<CreateMessageInput> {
  addLabelIds?: string[];
  removeLabelIds?: string[];
}

// ==================== Sync ====================
export interface SyncEventResult {
  events: IntegrationCalendarData[];
  nextSyncToken?: string;
  deleted?: string[]; // IDs of deleted events
}

export interface SyncEventOptions {
  syncToken?: string;
  timeMin?: Date;
  timeMax?: Date;
  maxResults?: number;
}
export interface SyncMessageOptions {
  maxResults?: number;
  q?: string;
  labelIds?: string[];
  pageToken?: string;
}

export interface SyncMessageResult {
  messages: IntegrationGmailData[];
  nextPageToken?: string;
}

// ==================== Webhook ====================
export interface WebhookRegistration {
  channelId: string;
  resourceId: string;
  expiresAt: Date;
}

export interface WebhookPayload {
  channelId: string;
  resourceId?: string;
  resourceState: "sync" | "exists" | "not_exists";
  messageNumber?: string;
}

// ==================== Provider Adapter Interface ====================
export interface IIntegrationAdapter {
  readonly provider: IntegrationProvider;

  // OAuth
  getAuthUrl(state: string): string;
  exchangeCodeForTokens(code: string): Promise<OAuthTokens>;
  refreshAccessToken(refreshToken: string): Promise<TokenRefreshResult>;
  revokeAccess(accessToken: string): Promise<void>;

  // Events (Calendar)/ Messages (Gmail)/ Data (Notion)
  list(accessToken: string, options: SyncEventOptions | SyncMessageOptions): Promise<any>; // Return type depends on provider
  create(accessToken: string, payload: CreateEventInput | CreateMessageInput): Promise<any>; // Return type depends on provider
  update(accessToken: string, id: string, payload: UpdateEventInput | UpdateMessageInput): Promise<any>; // Return type depends on provider
  delete(accessToken: string, id: string): Promise<void>;

  // Webhook: only applicable for Calendar provider for now
  registerWebhook?(accessToken: string, callbackUrl: string, resourceId: string): Promise<WebhookRegistration>;
  stopWebhook?(accessToken: string, channelId: string, resourceId: string): Promise<void>;

  // TODO: Define additional methods for Gmail and Notion providers as needed
}

// ==================== Connection Info ====================
export interface ConnectionInfo {
  id: string;
  provider: IntegrationProvider;
  accountIdentifier: string;
  isActive: boolean;
  scopes: string[];
  createdAt: Date;
}
