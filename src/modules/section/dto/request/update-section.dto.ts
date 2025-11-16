import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

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
}
