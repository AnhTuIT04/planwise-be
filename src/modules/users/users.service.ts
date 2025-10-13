import { Injectable } from "@nestjs/common";
import { Prisma } from "prisma/client";

import { DatabaseService } from "@/modules/database/database.service";

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.db.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async createOrUpdate(email: string, data: Prisma.UserCreateInput) {
    return this.db.user.upsert({
      where: { email },
      create: data,
      update: data,
    });
  }

  async delete(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
