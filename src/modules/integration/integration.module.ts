import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { IntegrationController } from "./integration.controller";
import { IntegrationService } from "./integration.service";
import { CalendarWebhookService } from "./webhook/calendar.webhook";
import { NotionWebhookService } from "./webhook/notion.webhook";
import { CalendarAdapter, NotionAdapter } from "./adapters";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    CalendarWebhookService,
    NotionWebhookService,
    CalendarAdapter,
    NotionAdapter,
    // GmailAdapter,
  ],
  exports: [IntegrationService, CalendarAdapter, NotionAdapter],
})
export class IntegrationModule {}
