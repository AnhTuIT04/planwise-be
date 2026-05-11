import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AppConfig } from "@/config/app.config";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies["esiwnalp_keton"] as string]),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfig>("env")!.JWT_SECRET,
    });
  }

  validate(payload: JwtPayloadDto) {
    return payload;
  }
}
