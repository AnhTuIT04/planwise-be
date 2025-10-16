-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
