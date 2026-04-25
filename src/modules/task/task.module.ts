import { Module } from "@nestjs/common";

import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";
import { NotionModule } from "../notion/notion.module";

@Module({
  imports: [PermissionMiddlewareModule, NotionModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
