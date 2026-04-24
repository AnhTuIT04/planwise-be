import { Module } from "@nestjs/common";

import { EmailModule } from "~/email/email.module";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";

@Module({
  imports: [EmailModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
