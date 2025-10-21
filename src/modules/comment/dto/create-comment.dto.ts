import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "This task needs more clarification about the requirements",
    description: "Content of the comment",
  })
  readonly content: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "https://example.com/screenshot.png",
    description: "Media URL to attach to the comment (image, document, etc.)",
  })
  readonly mediaUrl: string | null;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID of the task this comment belongs to",
  })
  readonly taskId: string;
}
