import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { TaskStatus, PriorityLevel } from "prisma/client/pg";

class TaskCreateSubtaskDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "Fix login bug",
    description: "The title of the task",
  })
  readonly title!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the subtask in minutes",
  })
  readonly estimate?: number;

  @IsDefined()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    type: [String],
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this subtask",
  })
  readonly assigneeIds!: string[];
}

export class CreateTaskDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "Fix login bug",
    description: "The title of the task",
  })
  readonly title!: string;

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
    enum: TaskStatus,
    example: TaskStatus.TODO,
    description: "The status of the task",
  })
  readonly status?: TaskStatus;

  @IsOptional()
  @IsEnum(PriorityLevel)
  @ApiPropertyOptional({
    enum: PriorityLevel,
    example: PriorityLevel.HIGH,
    description: "The priority level of the task",
  })
  readonly priority?: PriorityLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the task in minutes",
  })
  readonly estimate?: number;

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

  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the section the task belongs to",
  })
  readonly sectionId!: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the supervisor user",
  })
  readonly supervisorId?: string;

  @IsDefined()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    type: [String],
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this task",
  })
  readonly assigneeIds!: string[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskCreateSubtaskDto)
  @ApiProperty({
    type: () => [TaskCreateSubtaskDto],
    description: "Array of subtasks associated with this task",
  })
  readonly subtasks!: TaskCreateSubtaskDto[];
}
