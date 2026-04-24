import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { PriorityLevel, TaskStatus } from "prisma/client/pg";

export class GetSectionTasksQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  })
  @ApiPropertyOptional({ example: 1, description: "Page number for pagination (default: 1)" })
  readonly page: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) || parsed < 1 ? 20 : parsed;
  })
  @ApiPropertyOptional({ example: 20, description: "Number of items per page for pagination (default: 20)" })
  readonly limit: number = 20;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    example: "2024-01-01T00:00:00.000Z",
    description: "Optional filter to get tasks updated after this date",
  })
  readonly deadlineFrom?: Date;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    example: "2024-12-31T23:59:59.999Z",
    description: "Optional filter to get tasks updated before this date",
  })
  readonly deadlineTo?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (!value) {
      return undefined;
    }

    if (Array.isArray(value)) {
      return value as string[];
    }

    return [value] as string[];
  })
  @ApiPropertyOptional({
    example: ["sectionId1", "sectionId2"],
    description: "Optional filter to get tasks in specific sections",
  })
  readonly sections: string[] = [];

  @IsOptional()
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  @Transform(({ value }) => {
    if (!value) {
      return undefined;
    }

    if (Array.isArray(value)) {
      return value as TaskStatus[];
    }

    return [value] as TaskStatus[];
  })
  @ApiPropertyOptional({
    enum: TaskStatus,
    isArray: true,
    example: [TaskStatus.TODO, TaskStatus.RUNNING],
    description: "Optional filter to get tasks with specific statuses",
  })
  readonly statuses: TaskStatus[] = [TaskStatus.TODO, TaskStatus.RUNNING, TaskStatus.DONE];

  @IsOptional()
  @IsArray()
  @IsEnum(PriorityLevel, { each: true })
  @Transform(({ value }) => {
    if (!value) {
      return undefined;
    }

    if (Array.isArray(value)) {
      return value as PriorityLevel[];
    }

    return [value] as PriorityLevel[];
  })
  @ApiPropertyOptional({
    enum: PriorityLevel,
    isArray: true,
    example: [PriorityLevel.HIGH, PriorityLevel.NORMAL],
    description: "Optional filter to get tasks with specific priority levels",
  })
  readonly priorities?: PriorityLevel[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "design",
    description: "Optional search query to filter tasks by title or description",
  })
  readonly q?: string;
}
