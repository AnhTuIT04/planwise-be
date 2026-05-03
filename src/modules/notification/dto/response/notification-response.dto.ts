import { ApiProperty } from "@nestjs/swagger";
import { NotificationType } from "prisma/client/pg";

import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";

export class NotificationDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Notification id" })
  readonly id: string;

  @ApiProperty({
    enum: [
      "TASK_ASSIGNED",
      "TASK_UPDATED",
      "TASK_DEADLINE_REMINDER",
      "TASK_DEADLINE_MISSED",
      "PROJECT_INVITATION",
      "INVITATION_ACCEPTED",
      "INVITATION_DECLINED",
      "PROJECT_NEW_MEMBER",
    ],
  })
  readonly type: NotificationType;

  @ApiProperty({ example: false })
  readonly isRead: boolean;

  @ApiProperty({ description: "Type-specific payload (denormalized)" })
  readonly payload: any;

  @ApiProperty({ nullable: true })
  readonly projectId: string | null;

  @ApiProperty({ nullable: true })
  readonly taskId: string | null;

  @ApiProperty({ format: "date-time" })
  readonly createdAt: Date;

  constructor(n: {
    id: string;
    type: NotificationType;
    isRead: boolean;
    payload: any;
    projectId: string | null;
    taskId: string | null;
    createdAt: Date;
  }) {
    this.id = n.id;
    this.type = n.type;
    this.isRead = n.isRead;
    this.payload = n.payload;
    this.projectId = n.projectId;
    this.taskId = n.taskId;
    this.createdAt = n.createdAt;
  }
}

export class NotificationResponse extends ResponseDto<NotificationDto> {
  @ApiProperty({ type: () => NotificationDto })
  declare readonly data: NotificationDto;

  constructor(data: any, message: string = "Notification retrieved successfully") {
    super(new NotificationDto(data), message);
  }
}

export class NotificationsOffsetResponse extends OffsetPaginatedResponseDto<NotificationDto> {
  @ApiProperty({ type: () => [NotificationDto] })
  declare readonly data: NotificationDto[];

  constructor(
    data: any[],
    page: number,
    limit: number,
    totalItems: number,
    message: string = "Notifications retrieved successfully",
  ) {
    super(
      data.map((n) => new NotificationDto(n)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}

export class UnreadCountResponse extends ResponseDto<{ count: number }> {
  @ApiProperty({ example: { count: 3 } })
  declare readonly data: { count: number };

  constructor(count: number, message: string = "Unread notifications count retrieved successfully") {
    super({ count }, message);
  }
}
