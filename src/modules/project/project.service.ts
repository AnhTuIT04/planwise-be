import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { type Prisma } from "prisma/client/pg";

import { DefaultRole } from "@/common/enum/default-role.enum";
import { DEFAULT_ROLE_PERMISSIONS, EPermission, PERMISSION_METADATA } from "@/common/enum/permission.enum";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PgService } from "~/database/pg.service";
import { EmailService } from "~/email/email.service";
import { NotificationService } from "~/notification/notification.service";
import { RoleResponse, RolesOffsetResponse } from "~/role/dto/response/role-response.dto";
import { UsersWithRoleOffsetResponse } from "~/auth/dto/response/user-with-role-response.dto";
import { buildGetSectionQuery } from "~/section/query/get-section.query";
import { buildGetSectionTasksQuery, GetSectionTasksQueryResult } from "~/section/query/get-section-tasks.query";
import { SectionsOffsetResponse } from "~/section/dto/response/section-response.dto";
import { GetSectionTasksQueryDto } from "~/section/dto/request/get-section-tasks-query.dto";
import { SectionTasksOffsetResponse } from "~/section/dto/response/section-tasks-response.dto";
import { buildGetProjectQuery } from "./query/get-project.query";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { InviteMemberDto, ResponseInvitationDto } from "./dto/request/invite-member.dto";
import { AssignRoleDto } from "./dto/request/assign-role.dto";
import { ProjectResponse, ProjectsOffsetResponse } from "./dto/response/project-response.dto";
import { InvitationsOffsetResponse } from "./dto/response/invitation-response.dto";
import { PermissionItemDto, PermissionsListResponse } from "./dto/response/permission-response.dto";

@Injectable()
export class ProjectService {
  constructor(
    private readonly pg: PgService,
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const project = await this.pg.$transaction(
      async (tx) => {
        // Create project with default roles
        const newProject = await tx.project.create({
          data: {
            ...createProjectDto,
            ownerId: userId,
            roles: {
              create: [
                {
                  name: DefaultRole.OWNER,
                  default: true,
                  permissions: JSON.stringify(DEFAULT_ROLE_PERMISSIONS.OWNER),
                },
                {
                  name: DefaultRole.MEMBER,
                  default: true,
                  permissions: JSON.stringify(DEFAULT_ROLE_PERMISSIONS.MEMBER),
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

        // Get owner role to assign to the project creator
        const ownerRole = newProject.roles.find((role) => role.name === (DefaultRole.OWNER as string));

        // Assign project creator as Admin with full permissions
        const updatedProject = await tx.project.update({
          where: { id: newProject.id },
          data: {
            members: {
              create: {
                userId,
                roleId: ownerRole!.id,
              },
            },
          },
          ...buildGetProjectQuery(),
        });

        return updatedProject;
      },
      {
        maxWait: 5000,
        timeout: 20000,
      },
    );

    return new ProjectResponse(project, "Project created successfully");
  }

  getAvailablePermissions() {
    const items = (Object.values(EPermission) as EPermission[]).map((permission) => {
      const meta = PERMISSION_METADATA[permission];
      return new PermissionItemDto(permission, meta.name, meta.description);
    });
    return new PermissionsListResponse(items, "Available permissions retrieved successfully");
  }

  async getAllProjects(userId: string) {
    const projects = await this.pg.project.findMany({
      where: {
        isPersonal: false,
        members: { some: { userId } },
      },
      ...buildGetProjectQuery(),
    });

    return new ProjectsOffsetResponse(projects, 0, projects.length, projects.length, "Projects retrieved successfully");
  }

  async getDetailedProject(userId: string, projectId: string) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      ...buildGetProjectQuery(),
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new ProjectResponse(project, "Detailed project retrieved successfully");
  }

  async update(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");
    if (project.isPersonal === true) throw new ForbiddenException("Cannot update personal project");

    const updatedProject = await this.pg.project.update({
      where: { id: projectId },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
        logoUrl: updateProjectDto.logoUrl,
      },
      ...buildGetProjectQuery(),
    });

    return new ProjectResponse(updatedProject, "Project updated successfully");
  }

  async remove(userId: string, projectId: string) {
    const project = await this.pg.project.findFirst({
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

    await this.pg.project.delete({
      where: { id: projectId },
    });

    return new MessageOnlyResponse("Project deleted successfully");
  }

  async getProjectSections(userId: string, projectId: string) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
    });

    if (!project) throw new ForbiddenException("Project not found or you do not have access");

    const sections = await this.pg.section.findMany({
      where: {
        projectId,
      },
      orderBy: { position: "asc" },
      ...buildGetSectionQuery(),
    });

    return new SectionsOffsetResponse(sections, 0, sections.length, sections.length, "Sections retrieved successfully");
  }

  async getProjectTasks(userId: string, projectId: string, dto: GetSectionTasksQueryDto) {
    if (dto.deadlineFrom && dto.deadlineTo && dto.deadlineFrom > dto.deadlineTo) {
      throw new BadRequestException("Invalid deadline range: 'deadlineFrom' cannot be later than 'deadlineTo'");
    }

    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
    });

    if (!project) throw new ForbiddenException("Project not found or you do not have access");

    const sectionWhere: Prisma.SectionWhereInput = {
      projectId,
      project: {
        members: { some: { userId } },
      },
      ...(dto.sections?.length && { id: { in: dto.sections } }),
    };

    const [sections, totalSection] = await this.pg.$transaction([
      this.pg.section.findMany({
        where: sectionWhere,
        orderBy: { position: "asc" },
        ...buildGetSectionTasksQuery({
          qDeadlineFrom: dto.deadlineFrom,
          qDeadlineTo: dto.deadlineTo,
          qSections: dto.sections,
          qStatuses: dto.statuses,
          qPriorities: dto.priorities,
          searchQuery: dto.q,
        }),
        skip: (dto.page - 1) * dto.limit,
        take: dto.limit,
      }),
      this.pg.section.count({
        where: sectionWhere,
      }),
    ]);

    const tasksInWorkspace = await this.pg.taskProject.findMany({
      where: {
        project: {
          ownerId: userId,
          isPersonal: true,
        },
      },
      select: { taskId: true },
    });
    const taskIdsInWorkspace = tasksInWorkspace.map((tp) => tp.taskId);

    const tasksInSections: GetSectionTasksQueryResult[] = [];
    for (const section of sections) {
      const tasks = section.tasks.map((t) => t.task);
      const tasksWithExtras: GetSectionTasksQueryResult = {
        ...section,
        tasks: {
          data: tasks.map((task) => {
            const originalProject = task.originalProject;
            const canImport =
              !task.originalProject?.isPersonal &&
              (task.supervisorId === userId || task.assignees?.some((a) => a.user?.id === userId));
            const isImported = taskIdsInWorkspace.includes(task.id);
            return { ...task, originalProject, canImport, isImported };
          }),
          pagination: {
            page: 1,
            limit: 20,
          },
        },
      };
      tasksInSections.push(tasksWithExtras);
    }

    return new SectionTasksOffsetResponse(
      tasksInSections,
      dto.page,
      dto.limit,
      totalSection,
      "Tasks in project retrieved successfully",
    );
  }

  async inviteMember(userId: string, projectId: string, dto: InviteMemberDto) {
    const project = await this.pg.project.findFirst({
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

    const userToInvite = await this.pg.user.findUnique({ where: { email: dto.email } });
    if (!userToInvite) throw new NotFoundException("User with the provided email does not exist");

    const roleToAssign = roleToInvite || project.roles.find((role) => role.name === (DefaultRole.MEMBER as string))!;

    await this.pg.projectInvitation.create({
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

    // Notify invitee in-app no await
    const inviter = await this.pg.user.findUnique({
      where: { id: userId },
      select: { id: true, fullname: true, avatarUrl: true },
    });
    if (inviter) {
      this.notificationService
        .notifyProjectInvitation({
          inviteeId: userToInvite.id,
          inviter,
          project: { id: project.id, name: project.name, description: project.description, logoUrl: project.logoUrl },
          role: { id: roleToAssign.id, name: roleToAssign.name },
        })
        .catch((err) => console.error("Failed to send invitation notification:", err));
    }

    return new MessageOnlyResponse("Member invited successfully");
  }

  async responseInvitation(userId: string, projectId: string, dto: ResponseInvitationDto) {
    const { response, inviterId, finalRoleId } = await this.pg.$transaction(async (tx) => {
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

      let roleId = invitation.roleId;

      if (dto.response === "ACCEPTED") {
        // Check if the role still exists
        const role = await tx.role.findUnique({ where: { id: invitation.roleId } });

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

      return { response: dto.response, inviterId: invitation.inviterId, finalRoleId: roleId };
    });

    // Fan out notifications no await
    void (async () => {
      try {
        const [project, invitee, role, members] = await Promise.all([
          this.pg.project.findUnique({
            where: { id: projectId },
            select: { id: true, name: true, logoUrl: true, description: true },
          }),
          this.pg.user.findUnique({
            where: { id: userId },
            select: { id: true, fullname: true, avatarUrl: true },
          }),
          this.pg.role.findUnique({ where: { id: finalRoleId }, select: { id: true, name: true } }),
          this.pg.projectMember.findMany({
            where: { projectId, NOT: { userId } },
            select: { userId: true },
          }),
        ]);
        if (!project || !invitee || !role) return;

        await this.notificationService.notifyInvitationResponse({
          inviterId,
          invitee,
          project,
          role,
          accepted: response === "ACCEPTED",
        });

        if (response === "ACCEPTED") {
          await this.notificationService.notifyProjectNewMember({
            actorId: userId,
            project,
            newMember: invitee,
            role,
            existingMemberIds: members.map((m) => m.userId),
          });
        }
      } catch (err) {
        console.error("Failed to send invitation response notifications:", err);
      }
    })();

    return new MessageOnlyResponse(
      response === "ACCEPTED" ? "Invitation accepted successfully" : "Invitation declined successfully",
    );
  }

  async removeMember(_userId: string, projectId: string, memberId: string) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        // ownerId: userId,
      },
    });
    if (!project) throw new NotFoundException("Project not found or you don't have access");

    const member = await this.pg.projectMember.findFirst({
      where: {
        projectId,
        userId: memberId,
      },
    });

    if (!member) throw new NotFoundException("Member not found in the project");

    await this.pg.$transaction(async (tx) => {
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

    return new MessageOnlyResponse("Member removed successfully");
  }

  async getProjectMembers(userId: string, projectId: string) {
    const project = await this.pg.project.findFirst({
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

    return new UsersWithRoleOffsetResponse(
      project.members,
      0,
      project.members.length,
      project.members.length,
      "Members of the project retrieved successfully",
    );
  }

  async getMyRoleInProject(userId: string, projectId: string) {
    const projectMember = await this.pg.projectMember.findFirst({
      where: {
        projectId,
        userId,
      },
      include: {
        role: true,
      },
    });

    if (!projectMember) throw new NotFoundException("Project not found or you don't have access");

    return new RoleResponse(projectMember.role, "Your role in the project retrieved successfully");
  }

  async getProjectRoles(userId: string, projectId: string) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      select: {
        roles: true,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    return new RolesOffsetResponse(
      project.roles,
      0,
      project.roles.length,
      project.roles.length,
      "Roles of the project retrieved successfully",
    );
  }

  async assignRoleToMember(_userId: string, projectId: string, memberId: string, dto: AssignRoleDto) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        // ownerId: userId,
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

    await this.pg.projectMember.update({
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

    return new MessageOnlyResponse("Member role assigned successfully");
  }

  async getProjectInvitations(userId: string, projectId: string) {
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) throw new NotFoundException("Project not found or you don't have access");

    const invitations = await this.pg.projectInvitation.findMany({
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

    return new InvitationsOffsetResponse(
      mappedInvitations,
      0,
      invitations.length,
      invitations.length,
      "Project invitations retrieved successfully",
    );
  }

  async getReceivedInvitations(userId: string) {
    const invitations = await this.pg.projectInvitation.findMany({
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
        project: {
          id: invitation.project.id,
          name: invitation.project.name,
          description: invitation.project.description,
          logoUrl: invitation.project.logoUrl,
        },
        roleId: invitation.roleId,
        roleName: invitation.role?.name || "",
        projectId: invitation.projectId,
        projectName: invitation.project.name,
      };
    });

    return new InvitationsOffsetResponse(
      mappedInvitations,
      0,
      invitations.length,
      invitations.length,
      "Received invitations retrieved successfully",
    );
  }
}
