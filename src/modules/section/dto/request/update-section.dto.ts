import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "To Do",
    description: "The name of the section",
    required: false,
  })
  readonly name?: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project this section belongs to",
  })
  readonly projectId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    example: ["task-id-2", "task-id-1", "task-id-3"],
    description: "Array of task IDs in the new order",
  })
  readonly listOfTask?: string[];
}
