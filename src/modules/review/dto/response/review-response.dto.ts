import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";
import { PriorityLevel } from "prisma/client/pg";

import type { ReviewBucket } from "../../utils/resolve-period";

export class ReviewRangeDto {
  @ApiProperty({ format: "date-time" }) readonly from: Date;
  @ApiProperty({ format: "date-time" }) readonly to: Date;
  @ApiProperty({ format: "date-time" }) readonly prevFrom: Date;
  @ApiProperty({ format: "date-time" }) readonly prevTo: Date;

  constructor(from: Date, to: Date, prevFrom: Date, prevTo: Date) {
    this.from = from;
    this.to = to;
    this.prevFrom = prevFrom;
    this.prevTo = prevTo;
  }
}

export class ReviewKpiDeltasDto {
  @ApiProperty({ example: 3 }) readonly completed: number;
  @ApiProperty({ example: 7200000 }) readonly timeSpentMs: number;

  constructor(completed: number, timeSpentMs: number) {
    this.completed = completed;
    this.timeSpentMs = timeSpentMs;
  }
}

export class ReviewKpisDto {
  @ApiProperty({ example: 18 }) readonly completed: number;
  @ApiProperty({ example: 0.82, description: "completed / (completed + missed); 0..1" })
  readonly completionRate: number;
  @ApiProperty({ example: 0.75, description: "on-time / completed-with-deadline; 0..1" })
  readonly onTimeRate: number;
  @ApiProperty({ example: 28800000, description: "Total ms spent on tasks updated in window" })
  readonly timeSpentMs: number;
  @ApiProperty({ type: () => ReviewKpiDeltasDto }) readonly deltas: ReviewKpiDeltasDto;

  constructor(completed: number, completionRate: number, onTimeRate: number, timeSpentMs: number, deltas: ReviewKpiDeltasDto) {
    this.completed = completed;
    this.completionRate = completionRate;
    this.onTimeRate = onTimeRate;
    this.timeSpentMs = timeSpentMs;
    this.deltas = deltas;
  }
}

export class ReviewStatusBreakdownDto {
  @ApiProperty({ example: 18 }) readonly done: number;
  @ApiProperty({ example: 4 }) readonly running: number;
  @ApiProperty({ example: 6 }) readonly todo: number;
  @ApiProperty({ example: 2 }) readonly missed: number;

  constructor(done: number, running: number, todo: number, missed: number) {
    this.done = done;
    this.running = running;
    this.todo = todo;
    this.missed = missed;
  }
}

export class ReviewTimelinePointDto {
  @ApiProperty({ example: "2026-04-12" }) readonly date: string;
  @ApiProperty({ example: 3 }) readonly completed: number;
  @ApiProperty({ example: 7200000 }) readonly timeSpentMs: number;

  constructor(date: string, completed: number, timeSpentMs: number) {
    this.date = date;
    this.completed = completed;
    this.timeSpentMs = timeSpentMs;
  }
}

export class ReviewTimelineDto {
  @ApiProperty({ example: "day" }) readonly bucket: ReviewBucket;
  @ApiProperty({ type: () => [ReviewTimelinePointDto] }) readonly points: ReviewTimelinePointDto[];

  constructor(bucket: ReviewBucket, points: ReviewTimelinePointDto[]) {
    this.bucket = bucket;
    this.points = points;
  }
}

export class ReviewProjectDto {
  @ApiProperty() readonly id: string;
  @ApiProperty() readonly name: string;
  @ApiProperty({ nullable: true }) readonly logoUrl: string | null;
  @ApiProperty() readonly total: number;
  @ApiProperty() readonly completed: number;
  @ApiProperty({ description: "completed / total; 0..1" }) readonly completionRate: number;
  @ApiProperty() readonly timeSpentMs: number;

  constructor(
    id: string,
    name: string,
    logoUrl: string | null,
    total: number,
    completed: number,
    completionRate: number,
    timeSpentMs: number,
  ) {
    this.id = id;
    this.name = name;
    this.logoUrl = logoUrl;
    this.total = total;
    this.completed = completed;
    this.completionRate = completionRate;
    this.timeSpentMs = timeSpentMs;
  }
}

export class ReviewPriorityBreakdownDto {
  @ApiProperty({ example: 2 }) readonly LOW: number;
  @ApiProperty({ example: 8 }) readonly NORMAL: number;
  @ApiProperty({ example: 5 }) readonly HIGH: number;
  @ApiProperty({ example: 3 }) readonly URGENT: number;

  constructor(record: Record<PriorityLevel, number>) {
    this.LOW = record.LOW;
    this.NORMAL = record.NORMAL;
    this.HIGH = record.HIGH;
    this.URGENT = record.URGENT;
  }
}

export class ReviewHighlightsDto {
  @ApiProperty({ nullable: true, example: "2026-04-12" })
  readonly mostProductiveDay: string | null;
  @ApiProperty({ nullable: true })
  readonly topProjectId: string | null;
  @ApiProperty({ nullable: true, example: 1.12, description: "Average spent / estimate for completed tasks (1.0 = on estimate)" })
  readonly estimationAccuracy: number | null;
  @ApiProperty({ example: 1, description: "Tasks completed after their deadline" })
  readonly lateFinishes: number;

  constructor(mostProductiveDay: string | null, topProjectId: string | null, estimationAccuracy: number | null, lateFinishes: number) {
    this.mostProductiveDay = mostProductiveDay;
    this.topProjectId = topProjectId;
    this.estimationAccuracy = estimationAccuracy;
    this.lateFinishes = lateFinishes;
  }
}

export interface ReviewServicePayload {
  range: ReviewRangeDto;
  kpis: ReviewKpisDto;
  statusBreakdown: ReviewStatusBreakdownDto;
  timeline: ReviewTimelineDto;
  projects: ReviewProjectDto[];
  priorityBreakdown: ReviewPriorityBreakdownDto;
  highlights: ReviewHighlightsDto;
}

export class ReviewDto {
  @ApiProperty({ type: () => ReviewRangeDto }) readonly range: ReviewRangeDto;
  @ApiProperty({ type: () => ReviewKpisDto }) readonly kpis: ReviewKpisDto;
  @ApiProperty({ type: () => ReviewStatusBreakdownDto }) readonly statusBreakdown: ReviewStatusBreakdownDto;
  @ApiProperty({ type: () => ReviewTimelineDto }) readonly timeline: ReviewTimelineDto;
  @ApiProperty({ type: () => [ReviewProjectDto] }) readonly projects: ReviewProjectDto[];
  @ApiProperty({ type: () => ReviewPriorityBreakdownDto }) readonly priorityBreakdown: ReviewPriorityBreakdownDto;
  @ApiProperty({ type: () => ReviewHighlightsDto }) readonly highlights: ReviewHighlightsDto;

  constructor(payload: ReviewServicePayload) {
    this.range = payload.range;
    this.kpis = payload.kpis;
    this.statusBreakdown = payload.statusBreakdown;
    this.timeline = payload.timeline;
    this.projects = payload.projects;
    this.priorityBreakdown = payload.priorityBreakdown;
    this.highlights = payload.highlights;
  }
}

export class ReviewResponse extends ResponseDto<ReviewDto> {
  @ApiProperty({ type: () => ReviewDto }) declare readonly data: ReviewDto;

  constructor(payload: ReviewServicePayload, message?: string) {
    super(new ReviewDto(payload), message);
  }
}
