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
import { TaskModule } from './modules/task/task.module';
import { SectionModule } from './modules/section/section.module';

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
    AuthModule,
    UsersModule,
    TaskModule,
    SectionModule,
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
