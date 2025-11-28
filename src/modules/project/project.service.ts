import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { RolesListResponseDto } from "@/modules/role/dto/response/role-response.dto";
import { UsersWithRoleListResponseDto } from "@/modules/auth/dto/response/user-with-role-response.dto";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { buildGetProjectQuery } from "./query/get-project.query";
import { InviteMemberDto } from "./dto/request/invite-member.dto";
import { ProjectResponseDto, ProjectsListResponseDto } from "./dto/response/project-response.dto";

@Injectable()
export class ProjectService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const project = await this.db.$transaction(async (tx) => {
      const newProject = await tx.project.create({
        data: {
          ownerId: userId,
          ...createProjectDto,
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
        select: {
          id: true,
          sections: true,
          roles: true,
        },
      });

      return await tx.project.update({
        where: { id: newProject.id },
        data: {
          members: {
            create: {
              userId,
              roleId: newProject.roles.find((role) => role.name === DefaultRole.OWNER)!.id,
            },
          },
        },
        ...buildGetProjectQuery(),
      });
    });

    return new ProjectResponseDto(project, "Project created successfully");
  }

  async getAllProjects(userId: string) {
    const projects = await this.db.project.findMany({
      where: {
        isPersonal: false,
        members: { some: { userId } },
      },
      ...buildGetProjectQuery(),
    });

    return new ProjectsListResponseDto(
      projects,
      0,
      projects.length,
      projects.length,
      "Projects retrieved successfully",
    );
  }

  async getDetailedProject(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      ...buildGetProjectQuery(),
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new ProjectResponseDto(project, "Detailed project retrieved successfully");
  }

  async update(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");
    if (project.isPersonal === true) throw new ForbiddenException("Cannot update personal project");

    const updatedProject = await this.db.project.update({
      where: { id: projectId },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
        logoUrl: updateProjectDto.logoUrl,
      },
      ...buildGetProjectQuery(),
    });

    return new ProjectResponseDto(updatedProject, "Project updated successfully");
  }

  async remove(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
      include: {
        _count: {
          select: {
            sections: true,
            tasks: true,
          },
        },
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");
    if (project.isPersonal === true) throw new ForbiddenException("Cannot delete personal project");
    if (project._count.sections > 0 || project._count.tasks > 0)
      throw new ForbiddenException("Cannot delete project with existing sections or tasks");

    await this.db.project.delete({
      where: { id: projectId },
    });

    return new MessageResponseDto("Project deleted successfully");
  }

  async inviteMember(userId: string, projectId: string, dto: InviteMemberDto) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      include: {
        roles: true,
        members: {
          select: {
            user: {
              select: { email: true },
            },
          },
        },
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    const memberExists = project.members.some((member) => member.user.email === dto.email);
    if (memberExists) throw new ForbiddenException("User is already a member of the project");

    const roleToInvite = dto.roleId && project.roles.find((role) => role.id === dto.roleId);
    if (dto.roleId && !roleToInvite) throw new NotFoundException("Role not found in the project");

    const userToInvite = await this.db.user.findUnique({ where: { email: dto.email } });
    if (!userToInvite) throw new NotFoundException("User with the provided email does not exist");

    await this.db.projectMember.create({
      data: {
        projectId: project.id,
        userId: userToInvite.id,
        roleId: roleToInvite ? roleToInvite.id : project.roles.find((role) => role.name === DefaultRole.MEMBER)!.id,
      },
    });

    return new MessageResponseDto("Member invited successfully");
  }

  async getProjectMembers(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      select: {
        members: {
          select: {
            user: true,
            role: true,
          },
        },
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new UsersWithRoleListResponseDto(
      project.members,
      0,
      project.members.length,
      project.members.length,
      "Members of the project retrieved successfully",
    );
  }

  async getProjectRoles(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      select: {
        roles: true,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new RolesListResponseDto(
      project.roles,
      0,
      project.roles.length,
      project.roles.length,
      "Roles of the project retrieved successfully",
    );
  }
}
