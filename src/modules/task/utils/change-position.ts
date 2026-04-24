import { midpoint } from "@/common/utils/positioning.utils";
import { type PgService } from "~/database/pg.service";

export async function moveToFirstPosition(pg: PgService, taskId: string, sectionId: string) {
  const tasksNeedToChangePosition = await pg.taskSection.findMany({
    where: {
      sectionId,
    },
    orderBy: { position: "asc" },
  });

  // Only the task itself exists in the section
  if (tasksNeedToChangePosition.length === 1) return;

  const newPosition = midpoint(null, tasksNeedToChangePosition[0].position);
  return await pg.taskSection.update({
    where: {
      taskId_sectionId: {
        taskId,
        sectionId,
      },
    },
    data: {
      position: newPosition,
    },
  });
}

export async function moveToLastPosition(pg: PgService, taskId: string, sectionId: string) {
  const tasksNeedToChangePosition = await pg.taskSection.findMany({
    where: {
      sectionId,
    },
    orderBy: { position: "desc" },
  });

  // Only the task itself exists in the section
  if (tasksNeedToChangePosition.length === 1) return;

  const newPosition = midpoint(tasksNeedToChangePosition[0].position, null);
  return await pg.taskSection.update({
    where: {
      taskId_sectionId: {
        taskId,
        sectionId,
      },
    },
    data: {
      position: newPosition,
    },
  });
}
