import { midpoint } from "@/common/utils";
import { DatabaseService } from "@/modules/database/database.service";
import { PrismaClient } from "@prisma/client";

export async function moveToFirstPosition(db: DatabaseService | PrismaClient, taskId: string, sectionId: string) {
  const tasksNeedToChangePosition = await db.taskSection.findMany({
    where: {
      sectionId: sectionId,
    },
    orderBy: { position: "asc" },
  });

  if (tasksNeedToChangePosition.length === 1) return; // Only the task itself exists in the section

  const newPosition = midpoint(null, tasksNeedToChangePosition[0].position);
  return await db.taskSection.update({
    where: {
      taskId_sectionId: {
        taskId: taskId,
        sectionId: sectionId,
      },
    },
    data: {
      position: newPosition,
    },
  });
}

export async function moveToLastPosition(db: DatabaseService | PrismaClient, taskId: string, sectionId: string) {
  const tasksNeedToChangePosition = await db.taskSection.findMany({
    where: {
      sectionId: sectionId,
    },
    orderBy: { position: "desc" },
  });

  if (tasksNeedToChangePosition.length === 1) return; // Only the task itself exists in the section

  const newPosition = midpoint(tasksNeedToChangePosition[0].position, null);
  return await db.taskSection.update({
    where: {
      taskId_sectionId: {
        taskId: taskId,
        sectionId: sectionId,
      },
    },
    data: {
      position: newPosition,
    },
  });
}
