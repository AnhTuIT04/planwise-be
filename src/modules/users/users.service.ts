import { Injectable } from "@nestjs/common";

import { Prisma } from "prisma/client";
import { midpoint } from "@/common/utils";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { DatabaseService } from "@/modules/database/database.service";

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(data: Omit<Prisma.UserCreateInput, "workspaceId">) {
    return this.db.$transaction(
      async (tx) => {
        const newProject = await tx.project.create({
          data: {
            name: "My Workspace",
            owner: {
              create: {
                ...data,
                workspaceId: "",
              },
            },
            isPersonal: true,
            sections: {
              create: [
                {
                  name: "Default",
                  position: midpoint(null, null),
                },
              ],
            },
            roles: {
              create: [
                {
                  name: DefaultRole.OWNER,
                  default: true,
                  permissions: JSON.stringify(["ALL"]),
                },
                {
                  name: DefaultRole.MEMBER,
                  default: true,
                  permissions: JSON.stringify(["ALL"]),
                },
              ],
            },
          },
          include: {
            owner: true,
            roles: true,
          },
        });

        return tx.user.update({
          where: { id: newProject.owner.id },
          data: {
            workspaceId: newProject.id,
            memberships: {
              create: {
                projectId: newProject.id,
                roleId: newProject.roles.find((role) => role.name === DefaultRole.OWNER)!.id,
              },
            },
          },
        });
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Omit<Prisma.UserUpdateInput, "workspaceId">) {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
