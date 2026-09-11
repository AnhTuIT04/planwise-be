import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class ListProjectsQueryDto {
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

  @ApiPropertyOptional({ example: "marketing", description: "Search by project name" })
  @IsOptional()
  @IsString()
  q?: string;
}
