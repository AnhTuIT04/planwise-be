export enum ReviewPeriod {
  WEEK = "week",
  MONTH = "month",
}

export type ReviewBucket = "day" | "week";

export interface PeriodRange {
  from: Date;
  to: Date;
}

export interface ResolvedPeriod {
  current: PeriodRange;
  previous: PeriodRange;
  bucket: ReviewBucket;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

function startOfMondayWeek(d: Date): Date {
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset, 0, 0, 0, 0);
}

function endOfMondayWeek(d: Date): Date {
  const start = startOfMondayWeek(d);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6, 23, 59, 59, 999);
}

export function resolvePeriod(period: ReviewPeriod, anchor: Date): ResolvedPeriod {
  if (period === ReviewPeriod.MONTH) {
    const currentFrom = startOfMonth(anchor);
    const currentTo = endOfMonth(anchor);
    const prevAnchor = new Date(anchor.getFullYear(), anchor.getMonth() - 1, 15);
    return {
      current: { from: currentFrom, to: currentTo },
      previous: { from: startOfMonth(prevAnchor), to: endOfMonth(prevAnchor) },
      bucket: "day",
    };
  }

  const currentFrom = startOfMondayWeek(anchor);
  const currentTo = endOfMondayWeek(anchor);
  const prevAnchor = new Date(currentFrom);
  prevAnchor.setDate(prevAnchor.getDate() - 7);
  return {
    current: { from: currentFrom, to: currentTo },
    previous: { from: startOfMondayWeek(prevAnchor), to: endOfMondayWeek(prevAnchor) },
    bucket: "day",
  };
}

export function eachDayKey(from: Date, to: Date): string[] {
  const keys: string[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  while (cursor.getTime() <= end.getTime()) {
    keys.push(formatDayKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}

export function formatDayKey(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
