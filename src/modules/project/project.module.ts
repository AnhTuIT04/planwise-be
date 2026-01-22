import { Module } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { EmailModule } from "@/modules/email/email.module";
@Module({
  imports: [EmailModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
