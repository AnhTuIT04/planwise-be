import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { IntegrationController } from "./integration.controller";
import { IntegrationService } from "./integration.service";
import { CalendarWebhookService } from "./webhook/calendar.webhook";
import { CalendarAdapter } from "./adapters/calendar.adapter";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    CalendarWebhookService,
    CalendarAdapter,
    // NotionAdapter,
    // GmailAdapter,
  ],
  exports: [IntegrationService],
})
export class IntegrationModule {}
