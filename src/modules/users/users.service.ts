import { Injectable } from "@nestjs/common";

import { Prisma } from "prisma/client/pg";
import { midpoint } from "@/common/utils/positioning.utils";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { DEFAULT_ROLE_PERMISSIONS } from "@/common/enum/permission.enum";
import { PgService } from "~/database/pg.service";

@Injectable()
export class UsersService {
  constructor(private pg: PgService) {}

  async create(data: Omit<Prisma.UserCreateInput, "workspaceId">) {
    return this.pg.$transaction(
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
                  name: DefaultRole.ADMIN,
                  default: true,
                  permissions: JSON.stringify(DEFAULT_ROLE_PERMISSIONS.ADMIN),
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
                roleId: newProject.roles.find((role) => role.name === (DefaultRole.ADMIN as string))!.id,
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
    return this.pg.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.pg.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Omit<Prisma.UserUpdateInput, "workspaceId">) {
    return this.pg.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.pg.user.delete({ where: { id } });
  }
}
