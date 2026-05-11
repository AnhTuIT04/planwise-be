import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { IntegrationController } from "./integration.controller";
import { IntegrationService } from "./integration.service";
import { CalendarWebhookService } from "./webhook/calendar.webhook";
import { CalendarAdapter } from "./adapters/calendar.adapter";
import { GmailAdapter } from "./adapters/gmail.adapter";
import { NotionAdapter } from "./adapters/notion.adapter";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [IntegrationController],
  providers: [IntegrationService, CalendarWebhookService, CalendarAdapter, GmailAdapter, NotionAdapter],
  exports: [IntegrationService, NotionAdapter],
})
export class IntegrationModule {}
