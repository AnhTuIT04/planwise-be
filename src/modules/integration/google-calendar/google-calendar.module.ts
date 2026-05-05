import { Module } from "@nestjs/common";

import { GoogleCalendarController } from "./google-calendar.controller";
import { GoogleCalendarService } from "./google-calendar.service";

@Module({
  imports: [],
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
