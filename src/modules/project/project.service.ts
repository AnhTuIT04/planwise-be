import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { EmailService } from "@/modules/email/email.service";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { RolesListResponseDto } from "@/modules/role/dto/response/role-response.dto";
import { UsersWithRoleListResponseDto } from "@/modules/auth/dto/response/user-with-role-response.dto";
import { buildGetSectionQuery } from "@/modules/section/query/get-section.query";
import { SectionsListResponseDto } from "@/modules/section/dto/response/section-response.dto";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { InviteMemberDto, ResponseInvitationDto } from "./dto/request/invite-member.dto";
import { AssignRoleDto } from "./dto/request/assign-role.dto";
import { GetProjectTasksQueryDto } from "./dto/request/query/get-project-tasks-query.dto";
import { buildGetProjectQuery } from "./query/get-project.query";
import { buildGetProjectTasksQuery, GetProjectTasksQueryResult } from "./query/get-project-tasks.query";
import { ProjectResponseDto, ProjectsListResponseDto } from "./dto/response/project-response.dto";
import { ProjectTasksListResponseDto } from "./dto/response/project-tasks-response.dto";
import { InvitationsListResponseDto } from "./dto/response/invitation-response.dto";
import { permission } from "process";

@Injectable()
export class ProjectService {
  constructor(
    private readonly db: DatabaseService,
    private readonly emailService: EmailService,
  ) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const project = await this.db.$transaction(
      async (tx) => {
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
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );

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

  async getProjectSections(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
    });

    if (!project) throw new ForbiddenException("Project not found or you do not have access");

    const sections = await this.db.section.findMany({
      where: {
        projectId,
      },
      orderBy: { position: "asc" },
      ...buildGetSectionQuery(),
    });

    return new SectionsListResponseDto(
      sections,
      0,
      sections.length,
      sections.length,
      "Sections retrieved successfully",
    );
  }

  async getProjectTasks(userId: string, projectId: string, dto: GetProjectTasksQueryDto) {
    if (dto.deadlineFrom && dto.deadlineTo && dto.deadlineFrom > dto.deadlineTo) {
      throw new BadRequestException("Invalid deadline range: 'deadlineFrom' cannot be later than 'deadlineTo'");
    }

    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
    });

    if (!project) throw new ForbiddenException("Project not found or you do not have access");

    const sections = await this.db.section.findMany({
      where: {
        projectId,
        project: {
          members: { some: { userId } },
        },
      },
      orderBy: { position: "asc" },
      ...buildGetProjectTasksQuery({
        qDeadlineFrom: dto.deadlineFrom,
        qDeadlineTo: dto.deadlineTo,
        qSections: dto.sections,
        qStatuses: dto.statuses,
        aPriorities: dto.priorities,
        searchQuery: dto.q,
      }),
    });

    const tasksInWorkspace = await this.db.taskProject.findMany({
      where: {
        project: {
          ownerId: userId,
          isPersonal: true,
        },
      },
      select: { taskId: true },
    });
    const taskIdsInWorkspace = tasksInWorkspace.map((tp) => tp.taskId);

    let tasksInSections: GetProjectTasksQueryResult[] = [];
    for (const section of sections) {
      const tasks = section.tasks.map((t) => t.task);
      const tasksWithExtras: GetProjectTasksQueryResult = {
        ...section,
        tasks: tasks.map((task) => {
          const originalProject = task.originalProjectId === projectId ? null : task.originalProject;
          const canImport =
            !task.originalProject.isPersonal &&
            (task.supervisorId === userId || task.assignees.some((a) => a.user.id === userId));
          const isImported = taskIdsInWorkspace.includes(task.id);
          return { task: { ...task, originalProject, canImport, isImported } };
        }),
      };
      tasksInSections.push(tasksWithExtras);
    }

    return new ProjectTasksListResponseDto(
      tasksInSections,
      0,
      sections.length,
      sections.length,
      "Tasks in project retrieved successfully",
    );
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

    const roleToAssign = roleToInvite || project.roles.find((role) => role.name === DefaultRole.MEMBER)!;

    await this.db.projectInvitation.create({
      data: {
        projectId: project.id,
        inviterId: userId,
        inviteeId: userToInvite.id,
        roleId: roleToAssign.id,
      },
    });

    // Send invitation email no await
    this.emailService
      .sendProjectInvitationEmail(dto.email, userToInvite.fullname, project.name, roleToAssign.name, projectId)
      .catch((emailError) => {
        console.error("Failed to send invitation email:", emailError);
      });

    return new MessageResponseDto("Member invited successfully");
  }

  async responseInvitation(userId: string, projectId: string, dto: ResponseInvitationDto) {
    const result = await this.db.$transaction(async (tx) => {
      const invitation = await tx.projectInvitation.findFirst({
        where: {
          projectId,
          inviteeId: userId,
          status: "PENDING",
        },
      });

      if (!invitation) throw new NotFoundException("Invitation not found or already responded to");

      await tx.projectInvitation.update({
        where: {
          inviteeId_projectId: {
            inviteeId: userId,
            projectId,
          },
        },
        data: {
          status: dto.response,
        },
      });

      if (dto.response === "ACCEPTED") {
        // Check if the role still exists
        const role = await tx.role.findUnique({ where: { id: invitation.roleId } });
        let roleId = invitation.roleId;

        // If role doesn't exist, use the default MEMBER role
        if (!role) {
          const defaultRole = await tx.role.findFirst({
            where: {
              projectId,
              name: DefaultRole.MEMBER,
            },
          });
          roleId = defaultRole!.id;
        }

        await tx.projectMember.create({
          data: {
            projectId,
            userId,
            roleId,
          },
        });
      }

      return dto.response;
    });

    return new MessageResponseDto(
      result === "ACCEPTED" ? "Invitation accepted successfully" : "Invitation declined successfully",
    );
  }

  async removeMember(userId: string, projectId: string, memberId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) throw new NotFoundException("Project not found or you don't have access");

    const member = await this.db.projectMember.findFirst({
      where: {
        projectId,
        userId: memberId,
      },
    });

    if (!member) throw new NotFoundException("Member not found in the project");

    await this.db.$transaction(async (tx) => {
      // Delete invitation if exists (deleteMany won't error if not found)
      await tx.projectInvitation.deleteMany({
        where: {
          inviteeId: memberId,
          projectId,
        },
      });

      await tx.projectMember.delete({
        where: {
          userId_projectId: {
            userId: memberId,
            projectId,
          },
        },
      });
    });

    return new MessageResponseDto("Member removed successfully");
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

  async assignRoleToMember(userId: string, projectId: string, memberId: string, dto: AssignRoleDto) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
      select: {
        id: true,
        roles: {
          select: { id: true },
        },
        members: {
          where: { userId: memberId },
          select: { userId: true },
        },
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    if (project.members.length === 0) {
      throw new NotFoundException("Member not found in the project");
    }

    const roleExists = project.roles.some((role) => role.id === dto.roleId);
    if (!roleExists) {
      throw new NotFoundException("Role not found in the project");
    }

    await this.db.projectMember.update({
      where: {
        userId_projectId: {
          userId: memberId,
          projectId,
        },
      },
      data: {
        roleId: dto.roleId,
      },
    });

    return new MessageResponseDto("Member role assigned successfully");
  }

  async getProjectInvitations(userId: string, projectId: string) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    const invitations = await this.db.projectInvitation.findMany({
      where: {
        projectId,
      },
      include: {
        inviter: true,
        invitee: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedInvitations = invitations.map((invitation) => {
      return {
        ...invitation,
        roleId: invitation.roleId,
        roleName: invitation.role?.name || "",
      };
    });

    return new InvitationsListResponseDto(
      mappedInvitations,
      0,
      invitations.length,
      invitations.length,
      "Project invitations retrieved successfully",
    );
  }

  async getReceivedInvitations(userId: string) {
    const invitations = await this.db.projectInvitation.findMany({
      where: {
        inviteeId: userId,
      },
      include: {
        inviter: true,
        invitee: true,
        project: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedInvitations = invitations.map((invitation) => {
      return {
        ...invitation,
        roleId: invitation.roleId,
        roleName: invitation.role?.name || "",
      };
    });

    return new InvitationsListResponseDto(
      mappedInvitations,
      0,
      invitations.length,
      invitations.length,
      "Received invitations retrieved successfully",
    );
  }
}
