import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsNotEmpty, IsArray, IsUUID, IsInt, Min, IsEnum } from "class-validator";

enum TaskStatus {
  TODO = "TODO",
  DONE = "DONE",
}

export class CreateSubtaskDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the parent task",
  })
  readonly parentTaskId: string;

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
    description: "The status of the subtask",
    enum: TaskStatus,
  })
  readonly status?: TaskStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the subtask in minutes",
  })
  readonly timeEstimate?: number;

  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    type: [String],
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this subtask",
  })
  readonly assigneeIds: string[];
}
