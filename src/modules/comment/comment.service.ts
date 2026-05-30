import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PgService } from "~/database/pg.service";
import { SocketEmitter } from "~/realtime/socket.emitter";
import { CreateCommentDto, CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly pg: PgService,
    private readonly emitter: SocketEmitter,
  ) {}

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

    const serializedComment = new CommentDto({ ...comment, replies: [] });

    // Emit socket event to project members
    try {
      const taskProjects = await this.pg.taskProject.findMany({
        where: { taskId },
        select: { projectId: true },
      });
      const projectIds = new Set(taskProjects.map((p) => p.projectId));
      projectIds.add(task.originalProjectId);

      console.log(`[Socket BE] Emitting comment:created to project rooms:`, Array.from(projectIds));

      for (const pid of projectIds) {
        this.emitter.to(`project:${pid}`).emit("comment:created", {
          taskId,
          comment: serializedComment,
        });
      }
    } catch (e) {
      // Gracefully handle emitter failures
      console.error("Failed to emit comment:created socket event", e);
    }

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

    const taskId = comment.taskId;

    // Fetch projects to emit delete event before deleting
    let projectIds = new Set<string>();
    try {
      const taskProjects = await this.pg.taskProject.findMany({
        where: { taskId },
        select: { projectId: true },
      });
      const task = await this.pg.task.findUnique({
        where: { id: taskId },
        select: { originalProjectId: true },
      });
      projectIds = new Set(taskProjects.map((p) => p.projectId));
      if (task) {
        projectIds.add(task.originalProjectId);
      }
    } catch (e) {
      console.error("Failed to gather projects for socket deletion event", e);
    }

    await this.pg.comment.delete({
      where: { id: commentId },
    });

    // Emit delete socket event
    try {
      console.log(`[Socket BE] Emitting comment:deleted to project rooms:`, Array.from(projectIds));
      for (const pid of projectIds) {
        this.emitter.to(`project:${pid}`).emit("comment:deleted", {
          taskId,
          commentId,
        });
      }
    } catch (e) {
      console.error("Failed to emit comment:deleted socket event", e);
    }

    return { success: true };
  }
}
