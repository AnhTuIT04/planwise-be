import { Module } from "@nestjs/common";

import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";
@Module({
  imports: [PermissionMiddlewareModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}