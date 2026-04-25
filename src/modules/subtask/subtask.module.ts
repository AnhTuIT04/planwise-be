import { Module } from "@nestjs/common";
import { SubtaskService } from "./subtask.service";
import { SubtaskController } from "./subtask.controller";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";
@Module({
  imports: [PermissionMiddlewareModule],
  controllers: [SubtaskController],
  providers: [SubtaskService],
})
export class SubtaskModule {}
