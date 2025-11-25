import { AppConfig } from "@/config/app.config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

import { JwtPayloadDTO } from "../dto/jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies["esiwnalp_keton"]]),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfig>("env")!.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDTO) {
    return { id: payload.sub, email: payload.email };
  }
}
