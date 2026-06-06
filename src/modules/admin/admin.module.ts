import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminJwtStrategy } from "./strategies/admin-jwt.strategy";
import { AdminJwtGuard } from "./guards/admin-jwt.guard";

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("env.ADMIN_JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("env.JWT_ACCESS_TOKEN_EXPIRATION") as any },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AdminAuthController, AdminController],
  providers: [AdminAuthService, AdminService, AdminJwtStrategy, AdminJwtGuard],
})
export class AdminModule {}
