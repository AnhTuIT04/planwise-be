/*
  Warnings:

  - The `statusId` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'DELAYED');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "statusId",
ADD COLUMN     "statusId" "TaskStatus" NOT NULL DEFAULT 'TODO';
