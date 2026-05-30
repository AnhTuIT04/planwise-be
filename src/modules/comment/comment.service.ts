import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PgService } from "~/database/pg.service";
import { CreateCommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  constructor(private readonly pg: PgService) {}

  async create(userId: string, taskId: string, dto: CreateCommentDto) {
    // Verify task exists
    const task = await this.pg.task.findUnique({
      where: { id: taskId },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    let parentId = dto.parentId || null;
    if (parentId) {
      const parentComment = await this.pg.comment.findUnique({
        where: { id: parentId },
      });
      if (!parentComment) {
        throw new NotFoundException("Parent comment not found");
      }
      // Grandparent flattening: if the target parent is a reply, redirect this reply to the root parent
      if (parentComment.parentId) {
        parentId = parentComment.parentId;
      }
    }

    const comment = await this.pg.comment.create({
      data: {
        content: dto.content,
        taskId,
        authorId: userId,
        parentId: parentId || undefined,
      },
      include: {
        author: true,
      },
    });

    return { ...comment, replies: [] };
  }

  async findAllForTask(taskId: string) {
    const task = await this.pg.task.findUnique({
      where: { id: taskId },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    // Retrieve all comments for this task, including their authors
    const allComments = await this.pg.comment.findMany({
      where: { taskId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Structure comments into parent-child relationship (2-layer max)
    const parentComments = allComments.filter((c) => !c.parentId).map((c) => ({
      ...c,
      replies: [] as any[],
    }));

    const replies = allComments.filter((c) => !!c.parentId);

    for (const reply of replies) {
      const parent = parentComments.find((p) => p.id === reply.parentId);
      if (parent) {
        parent.replies.push(reply);
      } else {
        // Fallback: if parent comment is missing (should not happen due to cascade), treat it as parent
        parentComments.push({
          ...reply,
          replies: [],
        });
      }
    }

    return parentComments;
  }

  async delete(userId: string, commentId: string) {
    const comment = await this.pg.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    // Only author can delete their comments
    if (comment.authorId !== userId) {
      throw new ForbiddenException("You are not allowed to delete this comment");
    }

    await this.pg.comment.delete({
      where: { id: commentId },
    });

    return { success: true };
  }
}
