import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsUUID, IsNotEmpty, IsArray } from "class-validator";

export class UpdateSubTaskDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the subtask",
  })
  readonly id: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Fix login bug",
    description: "The title of the task",
  })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Users can't login with Google OAuth",
    description: "The description of the task",
  })
  readonly description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiPropertyOptional({
    type: [String],
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this task",
  })
  readonly assigneeIds?: string[];
}
