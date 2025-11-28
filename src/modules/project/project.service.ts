import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";
import { DefaultRole } from "@/common/enum/default-role.enum";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { RolesListResponseDto } from "@/modules/role/dto/response/role-response.dto";
import { UsersWithRoleListResponseDto } from "@/modules/auth/dto/response/user-with-role-response.dto";
import { buildGetSectionQuery } from "@/modules/section/query/get-section.query";
import { SectionsListResponseDto } from "@/modules/section/dto/response/section-response.dto";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { InviteMemberDto } from "./dto/request/invite-member.dto";
import { GetProjectTasksQueryDto } from "./dto/request/query/get-project-tasks-query.dto";
import { buildGetProjectQuery } from "./query/get-project.query";
import { buildGetProjectTasksQuery, GetProjectTasksQueryResult } from "./query/get-project-tasks.query";
import { ProjectResponseDto, ProjectsListResponseDto } from "./dto/response/project-response.dto";
import { ProjectTasksListResponseDto } from "./dto/response/project-tasks-response.dto";

@Injectable()
export class ProjectService {
  constructor(private readonly db: DatabaseService) {}

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
            !originalProject && (task.supervisorId === userId || task.assignees.some((a) => a.user.id === userId));
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
