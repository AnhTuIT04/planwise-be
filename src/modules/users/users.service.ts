import { Injectable } from "@nestjs/common";

import { Prisma, User } from "prisma/client";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { DatabaseService } from "@/modules/database/database.service";

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(data: Omit<Prisma.UserCreateInput, "personalProjectId">) {
    return this.db.$transaction(async (tx) => {
      const newProject = await this.db.project.create({
        data: {
          name: "My Workspace",
          owner: {
            create: {
              ...data,
              personalProjectId: "",
            },
          },
          isPersonal: true,
          sections: {
            create: [
              {
                name: "Default",
                position: "123",
              },
            ],
          },
          roles: {
            create: [
              {
                name: DefaultRole.OWNER,
                isDefault: true,
                permissions: JSON.stringify(["ALL"]),
              },
              {
                name: DefaultRole.MEMBER,
                isDefault: true,
                permissions: JSON.stringify(["ALL"]),
              },
            ],
          },
        },
        include: {
          owner: true,
        },
      });

      return tx.user.update({
        where: { id: newProject.owner.id },
        data: { personalProjectId: newProject.id },
      });
    });
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Omit<Prisma.UserUpdateInput, "personalProjectId">) {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
