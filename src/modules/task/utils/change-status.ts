import { TaskStatus } from "prisma/client";

export function canChangeStatus(current: TaskStatus, next: TaskStatus, isChild: boolean): boolean {
  // Child cannot be ARCHIVED
  if (isChild && next === "ARCHIVED") return false;

  // Child RUNNING cannot change at all
  if (isChild && current === "RUNNING") return false;

  // RUNNING → ARCHIVED forbidden
  if (current === "RUNNING" && next === "ARCHIVED") return false;

  // DONE → RUNNING forbidden
  if (current === "DONE" && next === "RUNNING") return false;

  // ARCHIVED → only TODO
  if (current === "ARCHIVED" && next !== "TODO") return false;

  return true;
}
