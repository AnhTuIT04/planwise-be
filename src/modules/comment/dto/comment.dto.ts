import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsString, IsUUID } from "class-validator";
import { UserBasicDto } from "~/auth/dto/response/user-basic-response.dto";
import { ResponseDto } from "@/common/dto/response.dto";

export class CreateCommentDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "This is a comment",
    description: "The content of the comment",
  })
  readonly content!: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the parent comment, if this is a reply",
  })
  readonly parentId?: string;
}

export class CommentDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Comment ID" })
  readonly id: string;

  @ApiProperty({ example: "This is a comment", description: "Comment content" })
  readonly content: string;

  @ApiPropertyOptional({ example: "http://example.com/media.png", description: "Optional media URL", nullable: true })
  readonly mediaUrl: string | null;

  @ApiProperty({ type: () => UserBasicDto, description: "Comment author basic info" })
  readonly author: UserBasicDto;

  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Task ID" })
  readonly taskId: string;

  @ApiPropertyOptional({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Parent comment ID", nullable: true })
  readonly parentId: string | null;

  @ApiProperty({ type: () => [CommentDto], description: "List of replies" })
  readonly replies: CommentDto[];

  @ApiProperty({ example: "2024-06-15T12:00:00Z", description: "Timestamp of comment creation", format: "date-time" })
  readonly createdAt: Date;

  @ApiProperty({ example: "2024-06-20T12:00:00Z", description: "Timestamp of last comment update", format: "date-time" })
  readonly updatedAt: Date;

  constructor(comment: any) {
    this.id = comment.id;
    this.content = comment.content;
    this.mediaUrl = comment.mediaUrl;
    this.author = new UserBasicDto(comment.author);
    this.taskId = comment.taskId;
    this.parentId = comment.parentId;
    this.replies = comment.replies ? comment.replies.map((reply: any) => new CommentDto(reply)) : [];
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}

export class CommentResponseDto extends ResponseDto<CommentDto> {
  @ApiProperty({ type: () => CommentDto, description: "Comment data" })
  declare readonly data: CommentDto;

  constructor(data: any, message?: string) {
    super(new CommentDto(data), message);
  }
}

export class CommentsListResponseDto extends ResponseDto<CommentDto[]> {
  @ApiProperty({ type: () => [CommentDto], description: "List of comments" })
  declare readonly data: CommentDto[];

  constructor(data: any[], message?: string) {
    super(data.map((c) => new CommentDto(c)), message);
  }
}
