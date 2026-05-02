import { Injectable } from "@nestjs/common";

import { PgService } from "~/database/pg.service";
import { PriorityLevel, TaskStatus } from "prisma/client/pg";

import { GetReviewQueryDto } from "./dto/request/get-review-query.dto";
import {
  ReviewHighlightsDto,
  ReviewKpiDeltasDto,
  ReviewKpisDto,
  ReviewPriorityBreakdownDto,
  ReviewProjectDto,
  ReviewRangeDto,
  ReviewResponse,
  ReviewStatusBreakdownDto,
  ReviewTimelineDto,
  ReviewTimelinePointDto,
} from "./dto/response/review-response.dto";
import { eachDayKey, formatDayKey, resolvePeriod } from "./utils/resolve-period";

interface ReviewTaskRow {
  id: string;
  status: TaskStatus;
  priority: PriorityLevel;
  estimate: number;
  spent: number;
  deadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
  projects: { projectId: string }[];
}

@Injectable()
export class ReviewService {
  constructor(private readonly pg: PgService) {}

  async getMyReview(userId: string, dto: GetReviewQueryDto) {
    const anchor = dto.date ? new Date(dto.date) : new Date();
    const { current, previous, bucket } = resolvePeriod(dto.period, anchor);

    const tasks: ReviewTaskRow[] = await this.pg.task.findMany({
      where: {
        assignees: { some: { userId } },
        OR: [
          { updatedAt: { gte: current.from, lte: current.to } },
          { deadline: { gte: current.from, lte: current.to } },
        ],
      },
      select: {
        id: true,
        status: true,
        priority: true,
        estimate: true,
        spent: true,
        deadline: true,
        createdAt: true,
        updatedAt: true,
        projects: { select: { projectId: true } },
      },
    });

    const [currentTimeAgg, prevCompletedCount, prevTimeAgg, currentMissedCount] = await this.pg.$transaction([
      this.pg.task.aggregate({
        _sum: { spent: true },
        where: {
          assignees: { some: { userId } },
          updatedAt: { gte: current.from, lte: current.to },
        },
      }),
      this.pg.task.count({
        where: {
          assignees: { some: { userId } },
          status: TaskStatus.DONE,
          updatedAt: { gte: previous.from, lte: previous.to },
        },
      }),
      this.pg.task.aggregate({
        _sum: { spent: true },
        where: {
          assignees: { some: { userId } },
          updatedAt: { gte: previous.from, lte: previous.to },
        },
      }),
      this.pg.task.count({
        where: {
          assignees: { some: { userId } },
          deadline: { gte: current.from, lte: current.to },
          status: { not: TaskStatus.DONE },
        },
      }),
    ]);

    const completedTasks = tasks.filter(
      (t) => t.status === TaskStatus.DONE && t.updatedAt >= current.from && t.updatedAt <= current.to,
    );
    const completedWithDeadline = completedTasks.filter((t) => t.deadline !== null);
    const onTimeCompleted = completedWithDeadline.filter((t) => t.updatedAt.getTime() <= t.deadline!.getTime());
    const lateFinishes = completedWithDeadline.length - onTimeCompleted.length;

    const completedCount = completedTasks.length;
    const denomCompletion = completedCount + currentMissedCount;
    const completionRate = denomCompletion > 0 ? completedCount / denomCompletion : 0;
    const onTimeRate = completedWithDeadline.length > 0 ? onTimeCompleted.length / completedWithDeadline.length : 0;

    const timeSpentMs = currentTimeAgg._sum.spent ?? 0;
    const prevTimeSpentMs = prevTimeAgg._sum.spent ?? 0;

    const runningInScope = tasks.filter((t) => t.status === TaskStatus.RUNNING).length;
    const todoInScope = tasks.filter((t) => t.status === TaskStatus.TODO).length;

    const dayMap = new Map<string, { completed: number; timeSpentMs: number }>();
    for (const t of completedTasks) {
      const key = formatDayKey(t.updatedAt);
      const cur = dayMap.get(key) ?? { completed: 0, timeSpentMs: 0 };
      cur.completed += 1;
      cur.timeSpentMs += t.spent;
      dayMap.set(key, cur);
    }
    const points: ReviewTimelinePointDto[] = eachDayKey(current.from, current.to).map((key) => {
      const cur = dayMap.get(key) ?? { completed: 0, timeSpentMs: 0 };
      return new ReviewTimelinePointDto(key, cur.completed, cur.timeSpentMs);
    });

    const projectMap = new Map<string, { total: number; completed: number; timeSpentMs: number }>();
    for (const t of tasks) {
      const isCompletedInPeriod =
        t.status === TaskStatus.DONE && t.updatedAt >= current.from && t.updatedAt <= current.to;
      for (const tp of t.projects) {
        const cur = projectMap.get(tp.projectId) ?? { total: 0, completed: 0, timeSpentMs: 0 };
        cur.total += 1;
        if (isCompletedInPeriod) cur.completed += 1;
        cur.timeSpentMs += t.spent;
        projectMap.set(tp.projectId, cur);
      }
    }
    const projectIds = Array.from(projectMap.keys());
    const projectsMeta =
      projectIds.length > 0
        ? await this.pg.project.findMany({
            where: { id: { in: projectIds } },
            select: { id: true, name: true, logoUrl: true },
          })
        : [];
    const projects: ReviewProjectDto[] = projectsMeta
      .map((p) => {
        const stats = projectMap.get(p.id)!;
        return new ReviewProjectDto(
          p.id,
          p.name,
          p.logoUrl,
          stats.total,
          stats.completed,
          stats.total > 0 ? stats.completed / stats.total : 0,
          stats.timeSpentMs,
        );
      })
      .sort((a, b) => b.completed - a.completed || b.total - a.total);

    const priorityCounts: Record<PriorityLevel, number> = {
      LOW: 0,
      NORMAL: 0,
      HIGH: 0,
      URGENT: 0,
    };
    for (const t of completedTasks) priorityCounts[t.priority] += 1;

    const mostProductiveDay = points.reduce<ReviewTimelinePointDto | null>(
      (best, p) => (best === null || p.completed > best.completed ? p : best),
      null,
    );
    const tasksWithEstimate = completedTasks.filter((t) => t.estimate > 0);
    const estimationAccuracy =
      tasksWithEstimate.length > 0
        ? tasksWithEstimate.reduce((sum, t) => sum + t.spent / t.estimate, 0) / tasksWithEstimate.length
        : null;

    return new ReviewResponse(
      {
        range: new ReviewRangeDto(current.from, current.to, previous.from, previous.to),
        kpis: new ReviewKpisDto(
          completedCount,
          completionRate,
          onTimeRate,
          timeSpentMs,
          new ReviewKpiDeltasDto(completedCount - prevCompletedCount, timeSpentMs - prevTimeSpentMs),
        ),
        statusBreakdown: new ReviewStatusBreakdownDto(completedCount, runningInScope, todoInScope, currentMissedCount),
        timeline: new ReviewTimelineDto(bucket, points),
        projects,
        priorityBreakdown: new ReviewPriorityBreakdownDto(priorityCounts),
        highlights: new ReviewHighlightsDto(
          mostProductiveDay && mostProductiveDay.completed > 0 ? mostProductiveDay.date : null,
          projects[0]?.id ?? null,
          estimationAccuracy,
          lateFinishes,
        ),
      },
      "Review retrieved successfully",
    );
  }
}
