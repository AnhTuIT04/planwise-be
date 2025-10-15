import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AppConfig } from "@/config/app.config";
import { UsersModule } from "@/modules/users/users.module";
import { EmailModule } from "@/modules/email/email.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleAuthGuard } from "./guards/oauth.guard";
import { GoogleStrategy } from "./strategies/google.strategy";
import { GithubStrategy } from "./strategies/github.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<AppConfig>("env")!.JWT_SECRET,
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
    EmailModule,
    PassportModule.register({ session: false })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, GoogleAuthGuard, GithubStrategy],
  exports: [AuthService],
})
export class AuthModule {}
