import { Module } from "@nestjs/common";

import { EmailModule } from "~/email/email.module";
import { PermissionModule } from "~/permission/permission.module";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";

@Module({
  imports: [EmailModule, PermissionModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
