import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common";

import { EPermission } from "@/common/enum/permission.enum";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PgService } from "~/database/pg.service";
import { CreateRoleDto } from "./dto/request/create-role.dto";
import { UpdateRoleDto } from "./dto/request/update-role.dto";
import { ChangeUserRoleDto } from "./dto/request/change-user-role.dto";
import { RoleResponse } from "./dto/response/role-response.dto";

@Injectable()
export class RoleService {
  constructor(private readonly pg: PgService) {}

  async create(userId: string, dto: CreateRoleDto) {
    // Check if user is project owner or admin
    const project = await this.pg.project.findFirst({
      where: {
        id: dto.projectId,
        members: { some: { userId } },
      },
      select: {
        roles: true,
      },
    });

    if (!project) {
      throw new NotFoundException("Project not found or you don't have access");
    }

    // Check if role name already exists in the project
    const existingRole = project.roles.find((r) => r.name === dto.name);

    if (existingRole) {
      throw new ConflictException("Role with this name already exists in the project");
    }

    // Validate permissions - ensure only valid permissions are used
    const permissions = dto.permissions || [];
    const invalidPermissions = permissions.filter((p) => !Object.values(EPermission).includes(p as EPermission));

    if (invalidPermissions.length > 0) {
      throw new BadRequestException(
        `Invalid permissions: ${invalidPermissions.join(", ")}. Available permissions: ${Object.values(EPermission).join(", ")}`,
      );
    }

    const role = await this.pg.role.create({
      data: {
        name: dto.name,
        permissions: JSON.stringify(dto.permissions || []),
        projectId: dto.projectId,
      },
    });

    return new RoleResponse(role, "Role created successfully");
  }

  async update(userId: string, roleId: string, dto: UpdateRoleDto) {
    const existingRole = await this.pg.role.findFirst({
      where: {
        id: roleId,
        project: {
          members: { some: { userId } },
        },
      },
    });

    if (!existingRole) {
      throw new NotFoundException("Role not found or you don't have access");
    }

    // Prevent updates to default roles
    if (existingRole.default) {
      throw new BadRequestException("Cannot update default roles");
    }

    // If updating name, check for duplicates
    if (dto.name === existingRole.name) {
      throw new ConflictException("Role with this name already exists in the project");
    }

    // Validate permissions if provided
    if (dto.permissions) {
      const invalidPermissions = dto.permissions.filter((p) => !Object.values(EPermission).includes(p as EPermission));

      if (invalidPermissions.length > 0) {
        throw new BadRequestException(
          `Invalid permissions: ${invalidPermissions.join(", ")}. Available permissions: ${Object.values(EPermission).join(", ")}`,
        );
      }
    }

    const updatedRole = await this.pg.role.update({
      where: { id: roleId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.permissions && { permissions: JSON.stringify(dto.permissions) }),
      },
    });

    return new RoleResponse(updatedRole, "Role updated successfully");
  }

  async changeUserRole(ussrId, roleId: string, dto: ChangeUserRoleDto) {
    // Check if role exists and user has access
    const role = await this.pg.role.findFirst({
      where: {
        id: roleId,
        project: {
          members: { some: { userId: ussrId } },
        },
      },
    });

    if (!role) {
      throw new NotFoundException("Role not found or you don't have access");
    }

    // Check if user is a member of the project
    const member = await this.pg.projectMember.findFirst({
      where: {
        userId: dto.userId,
        projectId: role.projectId,
      },
    });

    if (!member) {
      throw new NotFoundException("User is not a member of the project");
    }

    await this.pg.projectMember.update({
      where: {
        userId_projectId: {
          userId: dto.userId,
          projectId: role.projectId,
        },
      },
      data: {
        roleId,
      },
    });

    return new MessageOnlyResponse("User role changed successfully");
  }

  async remove(userId: string, roleId: string) {
    // Check if role exists and user has access
    const role = await this.pg.role.findFirst({
      where: {
        id: roleId,
        project: {
          members: { some: { userId } },
        },
      },
    });

    if (!role) {
      throw new NotFoundException("Role not found or you don't have access");
    }

    // Prevent deletion of default roles
    if (role.default) {
      throw new BadRequestException("Cannot delete default roles");
    }

    const defaultMemberRole = await this.pg.role.findFirst({
      where: {
        name: DefaultRole.MEMBER,
        default: true,
        projectId: role.projectId,
      },
    });

    if (!defaultMemberRole) {
      throw new BadRequestException("No default member role found in project");
    }

    // Reassign members to default role before deletion
    await this.pg.$transaction(async (tx) => {
      await tx.projectMember.updateMany({
        where: {
          roleId,
        },
        data: {
          roleId: defaultMemberRole.id,
        },
      });

      // Reassign invitations to default role
      await tx.projectInvitation.updateMany({
        where: { roleId },
        data: { roleId: defaultMemberRole.id },
      });

      await tx.role.delete({
        where: { id: roleId },
      });
    });

    return new MessageOnlyResponse(
      `Role deleted successfully. All members and pending invitations have been reassigned to the default member role (${defaultMemberRole.name}).`,
    );
  }
}
