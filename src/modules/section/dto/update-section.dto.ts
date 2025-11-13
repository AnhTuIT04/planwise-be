// dto/update-section.dto.ts
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "In Progress",
    description: "New name of the section (optional)",
    required: false,
  })
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ["task-id-2", "task-id-1", "task-id-3"],
    description: "Updated array of task IDs in new order (optional)",
    type: [String],
    required: false,
  })
  readonly listOfTask?: string[];

  @IsString()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Project ID to verify ownership (required)",
  })
  readonly projectId: string;
}