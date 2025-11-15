import { Module } from "@nestjs/common";

import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";

@Module({
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
