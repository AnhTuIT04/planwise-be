import { Controller, Post, Get, Delete, Body, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { CommentService } from "./comment.service";
import { CreateCommentDto, CommentResponseDto, CommentsListResponseDto } from "./dto/comment.dto";

@ApiTags("Comment")
@ApiBearerAuth()
@Controller("tasks/:taskId/comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new comment or reply on a task" })
  @ApiResponse({
    status: 201,
    type: CommentResponseDto,
    description: "The comment has been successfully created.",
  })
  async create(
    @Param("taskId") taskId: string,
    @GetCurrentUserId() userId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const data = await this.commentService.create(userId, taskId, dto);
    return new CommentResponseDto(data, "Comment created successfully");
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all comments for a task structured as two-layer hierarchy" })
  @ApiResponse({
    status: 200,
    type: CommentsListResponseDto,
    description: "Comments have been successfully retrieved.",
  })
  async findAll(@Param("taskId") taskId: string) {
    const data = await this.commentService.findAllForTask(taskId);
    return new CommentsListResponseDto(data, "Comments retrieved successfully");
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a comment" })
  @ApiResponse({
    status: 200,
    description: "The comment has been successfully deleted.",
  })
  delete(
    @GetCurrentUserId() userId: string,
    @Param("id") commentId: string,
  ) {
    return this.commentService.delete(userId, commentId);
  }
}
