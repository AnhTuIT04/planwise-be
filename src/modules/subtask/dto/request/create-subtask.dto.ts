import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDefined, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateSubtaskDto {
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the parent task",
  })
  readonly parentTaskId!: string;

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
    example: 1,
    description: "Insert this subtask at a specific index (0-based). If omitted, append at the end.",
  })
  readonly insertAt?: number;

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
