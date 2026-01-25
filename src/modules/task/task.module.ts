import { Module } from "@nestjs/common";

import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";
@Module({
  imports: [PermissionMiddlewareModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
