import { Module } from "@nestjs/common";

import { PermissionModule } from "~/permission/permission.module";
import { SubtaskService } from "./subtask.service";
import { SubtaskController } from "./subtask.controller";

@Module({
  imports: [PermissionModule],
  controllers: [SubtaskController],
  providers: [SubtaskService],
})
export class SubtaskModule {}
