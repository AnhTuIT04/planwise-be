import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

import { PgService } from "~/database/pg.service";
import { AdminJwtPayloadDto } from "./dto/admin-jwt-payload.dto";
import { AdminSignInDto } from "./dto/request/admin-signin.dto";
import { AdminResponse } from "./dto/response/admin-response.dto";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly pgService: PgService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(adminSignInDto: AdminSignInDto) {
    const admin = await this.pgService.admin.findUnique({ where: { email: adminSignInDto.email } });
    if (!admin || !(await compare(adminSignInDto.password, admin.password))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload: AdminJwtPayloadDto = { sub: admin.id, email: admin.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, admin };
  }

  async getAdminData(adminId: string) {
    const admin = await this.pgService.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    return new AdminResponse(admin, "Admin data retrieved successfully.");
  }
}
