import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Res,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import type { Response } from "express";
import { IntegrationProvider } from "prisma/client/pg";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { Public } from "@/decorators/public.decorator";
import { IntegrationService } from "./integration.service";
import { CalendarWebhookService } from "./webhook/calendar.webhook";
import {
  OAuthCallbackDto,
  CreateEventDto,
  UpdateEventDto,
  ListEventsQueryDto,
  ConnectionDetailsResponseDto,
} from "./dto";
import { ConnectionResponseDto, EventResponseDto } from "./dto";

@ApiTags("Integrations")
@Controller("integrations")
export class IntegrationController {
  private readonly logger = new Logger(IntegrationController.name);

  constructor(
    private readonly integrationService: IntegrationService,
    private readonly webhookService: CalendarWebhookService,
  ) {}

  // ==================== Connection Management ====================

  @Get("connections/:provider")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all connected integrations for a specific provider for current user" })
  @ApiResponse({ status: 200, type: [ConnectionResponseDto] })
  async getConnections(
    @GetCurrentUserId() userId: string,
    @Param("provider") provider: IntegrationProvider,
  ): Promise<ConnectionResponseDto[]> {
    return this.integrationService.getConnections(userId, provider);
  }

  @Get("connect/:provider")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Redirect to provider OAuth consent page" })
  @ApiResponse({ status: 302, description: "Redirects to OAuth provider" })
  async connect(
    @GetCurrentUserId() userId: string,
    @Param("provider") provider: IntegrationProvider,
    @Query("redirectUrl") redirectUrl: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    const authUrl = await this.integrationService.getAuthUrl(userId, provider, redirectUrl);
    res.redirect(authUrl);
  }

  @Get("callback")
  @Public()
  @ApiOperation({ summary: "OAuth callback handler (redirects to frontend)" })
  async callback(@Query() query: OAuthCallbackDto, @Res() res: Response): Promise<void> {
    try {
      const result = await this.integrationService.handleOAuthCallback(query.code, query.state);
      res.redirect(result.redirectUrl);
    } catch (error) {
      this.logger.error(`OAuth callback error: ${error.message}`);
      res.redirect(`${process.env.FE_REDIRECT_URL}?integration=error&message=${encodeURIComponent(error.message)}`);
    }
  }

  @Delete("connections/:provider/:connectionId")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Disconnect a specific integration account" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async disconnect(
    @GetCurrentUserId() userId: string,
    @Param("provider") provider: IntegrationProvider,
    @Param("connectionId") connectionId: string,
  ): Promise<void> {
    await this.integrationService.disconnectAccount(userId, provider, connectionId);
  }

  // ==================== Event Operations ====================
  // These APIs only works with Calendar provider, for Gmail provider we will create new APIs to manage emails.

  @Get("events")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get cached events for a specific provider from local database" })
  @ApiResponse({ status: 200, type: [EventResponseDto] })
  async getEvents(
    @GetCurrentUserId() userId: string,
    @Query() query: ListEventsQueryDto,
  ): Promise<ConnectionDetailsResponseDto[]> {
    const events = await this.integrationService.getLocalEvents(
      userId,
      query.provider,
      query.timeMin ? new Date(query.timeMin) : undefined,
      query.timeMax ? new Date(query.timeMax) : undefined,
    );

    return events;
  }

  @Post("events")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new event" })
  @ApiResponse({ status: 201, type: EventResponseDto })
  async createEvent(@GetCurrentUserId() userId: string, @Body() dto: CreateEventDto): Promise<EventResponseDto> {
    const { provider, connectionId, ...eventData } = dto;
    const event = await this.integrationService.createEvent(userId, provider, connectionId, {
      ...eventData,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });

    return event;
  }

  @Patch("events/:provider/:externalId")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update an event" })
  @ApiResponse({ status: 200, type: EventResponseDto })
  async updateEvent(
    @GetCurrentUserId() userId: string,
    @Param("provider") provider: IntegrationProvider,
    @Param("externalId") externalId: string,
    @Body() dto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const event = await this.integrationService.updateEvent(userId, provider, externalId, {
      ...dto,
      startTime: dto.startTime ? new Date(dto.startTime) : undefined,
      endTime: dto.endTime ? new Date(dto.endTime) : undefined,
    });

    return event;
  }

  @Delete("events/:provider/:externalId")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete an event" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(
    @GetCurrentUserId() userId: string,
    @Param("provider") provider: IntegrationProvider,
    @Param("externalId") externalId: string,
  ): Promise<void> {
    await this.integrationService.deleteEvent(userId, provider, externalId);
  }

  // ==================== Message Operations ====================
  // These APIs only works with Gmail provider
  // TODO: endpoint to create/update/delete messages (emails) for Gmail provider

  // ==================== Data Operations ====================
  // These APIs only works with Notion provider
  // TODO: endpoint to create/update/delete data for Notion provider

  // ==================== Webhook Endpoints ====================
  // These endpoints are called by external providers
  @Post("webhook/google")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Google Calendar webhook receiver" })
  async googleWebhook(@Headers() headers: Record<string, string>, @Body() body: unknown): Promise<void> {
    await this.webhookService.handleGoogleWebhook(headers, body);
  }
}
