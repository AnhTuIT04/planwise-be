import { Module } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { TaskModule } from "../task/task.module"; // Import TaskModule

@Module({
  imports: [TaskModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
