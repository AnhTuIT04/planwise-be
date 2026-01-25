import { Module } from "@nestjs/common";

import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";
@Module({
  imports: [PermissionMiddlewareModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
