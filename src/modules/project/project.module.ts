import { Module } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { EmailModule } from "@/modules/email/email.module";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";

@Module({
  imports: [EmailModule, PermissionMiddlewareModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
