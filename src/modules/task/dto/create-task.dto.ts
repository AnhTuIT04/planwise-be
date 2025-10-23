import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsUUID, IsDateString, IsNotEmpty, IsEnum, IsArray } from "class-validator";

import { TaskStatus, PriorityLevel } from "prisma/client";

export class CreateTaskDto {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the user creating the task",
  })
  readonly taskId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Fix login bug",
    description: "The title of the task",
  })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: "Users can't login with Google OAuth",
    description: "The description of the task",
  })
  readonly description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiPropertyOptional({
    example: TaskStatus.TODO,
    description: "The status of the task",
    enum: TaskStatus,
  })
  readonly status?: TaskStatus;

  @IsEnum(PriorityLevel)
  @IsOptional()
  @ApiPropertyOptional({
    example: PriorityLevel.HIGH,
    description: "The priority level of the task",
    enum: PriorityLevel,
  })
  readonly priority?: PriorityLevel;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    example: "2023-10-19T10:30:00.000Z",
    description: "The start date of the task",
  })
  readonly startDate?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    example: "2023-10-25T10:30:00.000Z",
    description: "The due date of the task",
  })
  readonly dueDate?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the section the task belongs to",
  })
  readonly sectionId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project the task belongs to",
  })
  readonly projectId: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the parent task (for subtasks)",
  })
  readonly parentTaskId?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the supervisor user",
  })
  readonly supervisorId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiPropertyOptional({
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this task",
    type: [String],
  })
  readonly assigneeIds?: string[];

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    example: ["bug", "urgent"],
    description: "Array of tags associated with this task",
    type: [CreateTaskDto],
  })
  readonly subTask?: CreateTaskDto[];
}
