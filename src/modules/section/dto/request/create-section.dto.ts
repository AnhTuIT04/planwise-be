import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "To Do",
    description: "The name of the section",
  })
  readonly name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: 1,
    description: "Insert this section at a specific index (0-based). If omitted, append at the end.",
  })
  readonly insertAt?: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project this section belongs to",
  })
  readonly projectId: string;
}
