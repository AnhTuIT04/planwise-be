import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { CreateRoleDto } from "./dto/request/create-role.dto";
import { UpdateRoleDto } from "./dto/request/update-role.dto";
import { RoleResponseDto, RolesListResponseDto } from "./dto/response/role-response.dto";

@Injectable()
export class RoleService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, dto: CreateRoleDto) {
    // Check if user has access to the project
    const project = await this.db.project.findFirst({
      where: {
        id: dto.projectId,
        members: { some: { userId } },
      },
    });

    if (!project) {
      throw new ForbiddenException("Project not found or you don't have access");
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

    const role = await this.db.role.create({
      data: {
        name: dto.name,
        permissions: JSON.stringify(dto.permissions || []),
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
    });

    if (!existingRole) {
      throw new NotFoundException("Role not found or you don't have access");
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

    const updatedRole = await this.db.role.update({
      where: { id: roleId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.permissions && { permissions: JSON.stringify(dto.permissions) }),
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
