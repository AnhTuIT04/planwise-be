import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { PermissionUtils } from "@/common/utils/permission.utils";
import { DEFAULT_ROLE_PERMISSIONS, Permission } from "@/common/enum/permission.enum";
import { CreateRoleDto } from "./dto/request/create-role.dto";
import { UpdateRoleDto } from "./dto/request/update-role.dto";
import { RoleResponseDto, RolesListResponseDto } from "./dto/response/role-response.dto";
import { PermissionChecker } from '@/middleware/permission-checker.service';
@Injectable()
export class RoleService {
  constructor(private readonly db: DatabaseService, private readonly permissionChecker: PermissionChecker) {}

  async create(userId: string, dto: CreateRoleDto) {
    // Check if user is project owner or admin
    const project = await this.db.project.findFirst({
      where: {
        id: dto.projectId,
      },
      include: {
        members: {
          where: { userId },
          include: { role: true },
        },
      },
    });

    if (!project) {
      throw new ForbiddenException("Project not found");
    }

    const userMember = project.members[0];
    if (!userMember) {
      throw new ForbiddenException("You are not a member of this project");
    }

    // Check if user has PROJECT_MANAGE_ROLES permission
    const userPermissions = PermissionUtils.parsePermissions(userMember.role.permissions);
    if (!PermissionUtils.hasPermission(userPermissions, Permission.PROJECT_MANAGE_ROLES)) {
      throw new ForbiddenException("You do not have permission to create roles in this project");
    }

    // Check if role name already exists in the project
    const existingRole = await this.db.role.findFirst({
      where: {
        name: dto.name,
        projectId: dto.projectId,
      },
    });

    if (existingRole) {
      throw new BadRequestException("Role with this name already exists in the project");
    }

    // Validate permissions - ensure only valid permissions are used
    const permissions = dto.permissions || [];
    const invalidPermissions = permissions.filter(
      (p) => !Object.values(Permission).includes(p as Permission)
    );

    if (invalidPermissions.length > 0) {
      throw new BadRequestException(
        `Invalid permissions: ${invalidPermissions.join(", ")}. Available permissions: ${Object.values(Permission).join(", ")}`
      );
    }

    const role = await this.db.role.create({
      data: {
        name: dto.name,
        permissions: PermissionUtils.stringifyPermissions(permissions),
        projectId: dto.projectId,
      },
    });

    return new RoleResponseDto(role, "Role created successfully");
  }

  async update(userId: string, roleId: string, dto: UpdateRoleDto) {
    const existingRole = await this.db.role.findFirst({
      where: {
        id: roleId,
        project: {
          members: { some: { userId } },
        },
      },
      include: {
        project: {
          include: {
            members: {
              where: { userId },
              include: { role: true },
            },
          },
        },
      },
    });

    if (!existingRole) {
      throw new NotFoundException("Role not found or you don't have access");
    }

    await this.permissionChecker.requirePermission(
      { userId, projectId: existingRole.projectId },
      Permission.PROJECT_MANAGE_ROLES,
    );

    // Check if user has PROJECT_MANAGE_ROLES permission
    const userMember = existingRole.project.members[0];
    const userPermissions = PermissionUtils.parsePermissions(userMember.role.permissions);
    if (!PermissionUtils.hasPermission(userPermissions, Permission.PROJECT_MANAGE_ROLES)) {
      throw new ForbiddenException("You do not have permission to update roles in this project");
    }

    // If updating name, check for duplicates
    if (dto.name && dto.name !== existingRole.name) {
      const duplicateRole = await this.db.role.findFirst({
        where: {
          name: dto.name,
          projectId: existingRole.projectId,
          id: { not: roleId },
        },
      });

      if (duplicateRole) {
        throw new BadRequestException("Role with this name already exists in the project");
      }
    }

    // Validate permissions if provided
    if (dto.permissions) {
      const invalidPermissions = dto.permissions.filter(
        (p) => !Object.values(Permission).includes(p as Permission)
      );

      if (invalidPermissions.length > 0) {
        throw new BadRequestException(
          `Invalid permissions: ${invalidPermissions.join(", ")}. Available permissions: ${Object.values(Permission).join(", ")}`
        );
      }
    }

    const updatedRole = await this.db.role.update({
      where: { id: roleId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.permissions && { permissions: PermissionUtils.stringifyPermissions(dto.permissions) }),
      },
    });

    return new RoleResponseDto(updatedRole, "Role updated successfully");
  }

  async remove(userId: string, roleId: string) {
    // Check if role exists and user has access
    const role = await this.db.role.findFirst({
      where: {
        id: roleId,
        project: {
          members: { some: { userId } },
        },
      },
      include: {
        members: true,
      },
    });

    if (!role) {
      throw new NotFoundException("Role not found or you don't have access");
    }
    await this.permissionChecker.requirePermission(
      { userId, projectId: role.projectId },
      Permission.PROJECT_MANAGE_ROLES,
    );
    // Prevent deletion of default roles
    if (role.default) {
      throw new BadRequestException("Cannot delete default roles");
    }

    const defaultMemberRole = await this.db.role.findFirst({
      where: {
        name: "Member",
        default: true,
      },
    });
    if (!defaultMemberRole) {
      throw new BadRequestException("No default member role found in project");
    }

    // Reassign members to default role before deletion
    await this.db.$transaction(async (tx) => {
      if (role.members.length > 0) {
        await tx.projectMember.updateMany({
          where: {
            roleId: roleId,
          },
          data: {
            roleId: defaultMemberRole.id,
          },
        });
      }
      // Reassign invitations to default role
      await tx.projectInvitation.updateMany({
        where: { roleId: roleId },
        data: { roleId: defaultMemberRole.id },
      })

      await tx.role.delete({
        where: { id: roleId },
      });
    });

    return new MessageResponseDto(
      `Role deleted successfully. ${role.members.length} members were reassigned to the default member role.`,
    );
  }
}
