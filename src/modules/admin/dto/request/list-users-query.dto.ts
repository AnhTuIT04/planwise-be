import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum AdminUserStatusFilter {
  ALL = "all",
  ACTIVE = "active",
  DISABLED = "disabled",
}

export class ListUsersQueryDto {
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

  @ApiPropertyOptional({ example: "jane", description: "Search by email or fullname" })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: AdminUserStatusFilter, default: AdminUserStatusFilter.ALL, description: "Filter by account status" })
  @IsOptional()
  @IsEnum(AdminUserStatusFilter)
  status: AdminUserStatusFilter = AdminUserStatusFilter.ALL;
}
