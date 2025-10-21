import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CommentAuthorDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "Author email",
  })
  readonly email: string;

  @ApiPropertyOptional({
    example: "John Doe",
    description: "Author name",
  })
  readonly name: string | null;

  @ApiPropertyOptional({
    example: "https://example.com/avatar.jpg",
    description: "Author avatar URL",
  })
  readonly avatarUrl: string | null;
}

export class CommentResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Unique identifier of the comment",
  })
  readonly id: string;

  @ApiProperty({
    example: "This task needs more clarification about the requirements",
    description: "Content of the comment",
  })
  readonly content: string;

  @ApiPropertyOptional({
    example: "https://example.com/screenshot.png",
    description: "Media URL attached to the comment",
  })
  readonly mediaUrl: string | null;

  @ApiProperty({
    example: "2023-10-19T10:30:00.000Z",
    description: "Comment creation timestamp",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "2023-10-19T11:45:00.000Z",
    description: "Comment last update timestamp",
  })
  readonly updatedAt: Date;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID of the task this comment belongs to",
  })
  readonly taskId: string;

  @ApiProperty({
    type: CommentAuthorDto,
    description: "Comment author information",
  })
  readonly author: CommentAuthorDto;
}
