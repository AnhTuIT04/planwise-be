import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { SectionModule } from "../section/section.module"; // Import SectionModule

@Module({
  imports: [SectionModule], // Import SectionModule to access SectionService
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
