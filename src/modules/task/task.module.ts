import { Module } from "@nestjs/common";

import { PermissionModule } from "~/permission/permission.module";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
  imports: [PermissionModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
