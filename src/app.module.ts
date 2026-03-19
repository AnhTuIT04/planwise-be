import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@/app.controller";
import { configuration } from "@/config/app.config";
import { DatabaseModule } from "@/modules/database/database.module";
import { CacheModule } from "@/modules/cache/cache.module";
import { JwtGuard } from "@/modules/auth/guards/jwt.guard";
import { EmailModule } from "./modules/email/email.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { TaskModule } from "./modules/task/task.module";
import { SectionModule } from "./modules/section/section.module";
import { ProjectModule } from "./modules/project/project.module";
import { RoleModule } from "./modules/role/role.module";
import { CommentModule } from "./modules/comment/comment.module";
import { SubtaskModule } from "./modules/subtask/subtask.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { PermissionMiddlewareModule } from "@/middleware/permission-middleware.module";
import { RealtimeModule } from "./modules/realtime/realtime.module";
import { ChannelModule } from "./modules/channel/channel.module";
import { IntegrationModule } from "./modules/integration/integration.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ".env",
      load: [configuration],
      expandVariables: true,
    }),
    DatabaseModule,
    CacheModule,
    EmailModule,
    UsersModule,
    AuthModule,
    ProjectModule,
    RoleModule,
    SectionModule,
    TaskModule,
    SubtaskModule,
    CommentModule,
    PermissionModule,
    PermissionMiddlewareModule,
    RealtimeModule,
    ChannelModule,
    IntegrationModule,
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
