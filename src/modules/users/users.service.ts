import { Injectable } from "@nestjs/common";
import { Prisma, User } from "prisma/client";

import { DatabaseService } from "@/modules/database/database.service";
import { ProjectService } from "../project/project.service";
@Injectable()
export class UsersService {
  constructor(private db: DatabaseService , private projectService: ProjectService) {}

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

  async createOrUpdate(
    email: string,
    createData: Prisma.UserCreateInput,
    updateData: Prisma.UserUpdateInput,
  ): Promise<User>;
  async createOrUpdate(email: string, data: Prisma.UserCreateInput & Prisma.UserUpdateInput): Promise<User>;
  async createOrUpdate(
    email: string,
    createDataOrBoth: Prisma.UserCreateInput | (Prisma.UserCreateInput & Prisma.UserUpdateInput),
    updateData?: Prisma.UserUpdateInput,
  ) {
    if (updateData) {
      return this.db.user.upsert({
        where: { email },
        create: createDataOrBoth as Prisma.UserCreateInput,
        update: updateData,
      });
    }
    else {
      const user = this.db.user.upsert({
        where: { email },
        create: createDataOrBoth as Prisma.UserCreateInput,
        update: createDataOrBoth as Prisma.UserUpdateInput,
      });
      await this.projectService.createPersonalProjectForUser((await user).id);
      return user;
    }
  }

  async delete(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
