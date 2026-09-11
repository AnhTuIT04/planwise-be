import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AppConfig } from "@/config/app.config";
import { PgService } from "~/database/pg.service";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly pgService: PgService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies["esiwnalp_keton"] as string]),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfig>("env")!.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto) {
    // Block users that have been disabled (soft-deleted) by an admin
    const user = await this.pgService.user.findUnique({
      where: { id: payload.sub },
      select: { disabledAt: true },
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    if (user.disabledAt) {
      throw new UnauthorizedException("Your account has been disabled");
    }

    return payload;
  }
}
