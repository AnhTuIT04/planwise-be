import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsOptional, Min } from "class-validator";

export enum NotificationCategory {
  WORKSPACE = "workspace",
  INVITATION = "invitation",
}

export class GetNotificationsQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1, description: "Page number" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20, description: "Items per page" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 20;

  @ApiPropertyOptional({ enum: NotificationCategory, description: "Filter by category" })
  @IsOptional()
  @IsEnum(NotificationCategory)
  category?: NotificationCategory;

  @ApiPropertyOptional({ example: false, description: "Filter by read state" })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    return value as boolean;
  })
  @IsBoolean()
  isRead?: boolean;
}
