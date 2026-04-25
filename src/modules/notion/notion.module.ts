import { Module } from "@nestjs/common";
import { NotionService } from "./notion.service";
import { NotionController } from "./notion.controller";
import { DatabaseModule } from "../database/database.module";
import { ConfigModule } from "@nestjs/config";
import { IntegrationModule } from "../integration/integration.module";

@Module({
  imports: [ConfigModule, DatabaseModule, IntegrationModule],
  controllers: [NotionController],
  providers: [NotionService],
  exports: [NotionService],
})
export class NotionModule {}
