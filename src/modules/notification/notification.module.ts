import { Global, Module } from "@nestjs/common";

import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationScheduler } from "./notification.scheduler";

@Global()
@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationScheduler],
  exports: [NotificationService],
})
export class NotificationModule {}
