import { Module } from "@nestjs/common";

import { PermissionModule } from "~/permission/permission.module";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";

@Module({
  imports: [PermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
