import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AppConfig } from "@/config/app.config";
import { PgService } from "~/database/pg.service";
import { AdminJwtPayloadDto } from "../dto/admin-jwt-payload.dto";

export const ADMIN_COOKIE_NAME = "nimda_esiwnalp";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor(
    configService: ConfigService,
    private readonly pgService: PgService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies[ADMIN_COOKIE_NAME] as string]),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfig>("env")!.ADMIN_JWT_SECRET,
    });
  }

  async validate(payload: AdminJwtPayloadDto) {
    const admin = await this.pgService.admin.findUnique({ where: { id: payload.sub } });
    if (!admin) {
      throw new UnauthorizedException("Admin account not found");
    }

    return payload;
  }
}
