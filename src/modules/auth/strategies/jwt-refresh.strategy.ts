import { AppConfig } from "@/config/app.config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

import { JwtPayloadDto } from "../dto/jwt-payload.dto";
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies["esiwnalp_referesh"]]),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfig>("env")!.REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto) {
    return { id: payload.sub, email: payload.email };
  }
}
