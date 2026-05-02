import { Module } from "@nestjs/common";

import { PermissionModule } from "~/permission/permission.module";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";

@Module({
  imports: [PermissionModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
