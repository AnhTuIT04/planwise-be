import { Module } from "@nestjs/common";

import { NotionService } from "./notion.service";
import { NotionController } from "./notion.controller";
import { IntegrationModule } from "../integration/integration.module";

@Module({
  imports: [IntegrationModule],
  controllers: [NotionController],
  providers: [NotionService],
  exports: [NotionService],
})
export class NotionModule {}
