import { IsArray, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { PriorityLevel, TaskStatus } from "prisma/client";

export class GetProjectTasksQueryDto {
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
      return value;
    }

    return [value];
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
      return value;
    }

    return [value];
  })
  @ApiPropertyOptional({
    example: ["TODO", "RUNNING"],
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
      return value;
    }

    return [value];
  })
  @ApiPropertyOptional({
    example: ["LOW", "HIGH"],
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
