import { Module } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { DatabaseModule } from "@/modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
