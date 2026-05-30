import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "@/app.controller";
import { configuration } from "@/config/app.config";
import { JwtGuard } from "~/auth/guards/jwt.guard";
import { RealtimeModule } from "~/realtime/realtime.module";
import { DatabaseModule } from "~/database/database.module";
import { CacheModule } from "~/cache/cache.module";
import { EmailModule } from "~/email/email.module";
import { UsersModule } from "~/users/users.module";
import { PermissionModule } from "~/permission/permission.module";
import { AuthModule } from "~/auth/auth.module";
import { ProjectModule } from "~/project/project.module";
import { RoleModule } from "~/role/role.module";
import { ChannelModule } from "./modules/channel/channel.module";
import { SectionModule } from "~/section/section.module";
import { TaskModule } from "~/task/task.module";
import { SubtaskModule } from "~/subtask/subtask.module";
import { ReviewModule } from "~/review/review.module";
import { NotificationModule } from "~/notification/notification.module";
import { IntegrationModule } from "~/integration";
import { NotionModule } from "~/notion/notion.module";
import { CommentModule } from "~/comment/comment.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ".env",
      load: [configuration],
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    RealtimeModule,
    DatabaseModule,
    CacheModule,
    EmailModule,
    UsersModule,
    AuthModule,
    PermissionModule,
    ProjectModule,
    RoleModule,
    ChannelModule,
    SectionModule,
    TaskModule,
    SubtaskModule,
    ReviewModule,
    NotificationModule,
    IntegrationModule,
    NotionModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
