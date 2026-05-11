import { Controller, Get, HttpCode, HttpStatus, Param, Patch, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { NotificationService } from "./notification.service";
import { GetNotificationsQueryDto } from "./dto/request/get-notifications-query.dto";
import {
  NotificationsOffsetResponse,
  UnreadCountResponse,
} from "./dto/response/notification-response.dto";

@ApiTags("Notification")
@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "List notifications for the current user" })
  @ApiResponse({ status: 200, type: NotificationsOffsetResponse })
  list(@GetCurrentUserId() userId: string, @Query() query: GetNotificationsQueryDto) {
    return this.notificationService.list(userId, query);
  }

  @Get("unread-count")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get unread notifications count" })
  @ApiResponse({ status: 200, type: UnreadCountResponse })
  getUnreadCount(@GetCurrentUserId() userId: string) {
    return this.notificationService.getUnreadCount(userId);
  }

  @Patch("read-all")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Mark all notifications as read" })
  @ApiResponse({ status: 200, type: MessageOnlyResponse })
  markAllRead(@GetCurrentUserId() userId: string) {
    return this.notificationService.markAllRead(userId);
  }

  @Patch(":id/read")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Mark a notification as read" })
  @ApiResponse({ status: 200, type: MessageOnlyResponse })
  markRead(@GetCurrentUserId() userId: string, @Param("id") id: string) {
    return this.notificationService.markRead(userId, id);
  }
}
