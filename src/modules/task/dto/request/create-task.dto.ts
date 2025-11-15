import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsUUID,
  IsDateString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { TaskStatus, PriorityLevel } from "prisma/client";
import { CreateSubTaskDto } from "./create-subtask.dto";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Fix login bug",
    description: "The title of the task",
  })
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Users can't login with Google OAuth",
    description: "The description of the task",
  })
  readonly description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiPropertyOptional({
    example: TaskStatus.TODO,
    description: "The status of the task",
    enum: TaskStatus,
  })
  readonly status?: TaskStatus;

  @IsOptional()
  @IsEnum(PriorityLevel)
  @ApiPropertyOptional({
    example: PriorityLevel.HIGH,
    description: "The priority level of the task",
    enum: PriorityLevel,
  })
  readonly priority?: PriorityLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the task in minutes",
  })
  readonly timeEstimate?: number;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: "2023-10-25T10:30:00.000Z",
    description: "The deadline of the task in ISO 8601 format",
  })
  readonly deadline?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: 1,
    description: "Insert this task at a specific index (0-based). If omitted, append at the end.",
  })
  readonly insertAt?: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project the task belongs to",
  })
  readonly projectId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the section the task belongs to",
  })
  readonly sectionId: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the supervisor user",
  })
  readonly supervisorId?: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    type: [String],
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this task",
  })
  readonly assigneeIds: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubTaskDto)
  @ApiProperty({
    type: () => [CreateSubTaskDto],
    description: "Array of subtasks associated with this task",
  })
  readonly subtasks: CreateSubTaskDto[];
}
