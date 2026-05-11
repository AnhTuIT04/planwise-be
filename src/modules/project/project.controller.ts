import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Permission } from "@/decorators/permission.decorator";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PermissionGuard } from "~/permission/guards/permission.guard";
import { RoleResponse, RolesOffsetResponse } from "~/role/dto/response/role-response.dto";
import { UsersWithRoleOffsetResponse } from "~/auth/dto/response/user-with-role-response.dto";
import { SectionsOffsetResponse } from "~/section/dto/response/section-response.dto";
import { GetSectionTasksQueryDto } from "~/section/dto/request/get-section-tasks-query.dto";
import { SectionTasksOffsetResponse } from "~/section/dto/response/section-tasks-response.dto";
import { CanUpdateProject } from "./handlers/can-update-project.handler";
import { CanDeleteProject } from "./handlers/can-delete-project.handler";
import { CanManageProjectMembers } from "./handlers/can-manage-project-members.handler";
import { CanManageProjectRoles } from "./handlers/can-manage-project-roles.handler";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { InviteMemberDto, ResponseInvitationDto } from "./dto/request/invite-member.dto";
import { AssignRoleDto } from "./dto/request/assign-role.dto";
import { ProjectResponse, ProjectsOffsetResponse } from "./dto/response/project-response.dto";
import { InvitationsOffsetResponse } from "./dto/response/invitation-response.dto";
import { PermissionsListResponse } from "./dto/response/permission-response.dto";

@ApiTags("Project")
@Controller("projects")
@UseGuards(PermissionGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a project" })
  @ApiResponse({
    status: 201,
    type: ProjectResponse,
    description: "Project created successfully",
  })
  create(@GetCurrentUserId() userId: string, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(userId, createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all projects" })
  @ApiResponse({
    status: 200,
    type: ProjectsOffsetResponse,
    description: "Projects retrieved successfully",
  })
  getAllProjects(@GetCurrentUserId() userId: string) {
    return this.projectService.getAllProjects(userId);
  }

  @Get("permissions")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all available project permissions" })
  @ApiResponse({
    status: 200,
    type: PermissionsListResponse,
    description: "Available permissions retrieved successfully",
  })
  getAvailablePermissions() {
    return this.projectService.getAvailablePermissions();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get detailed project by ID" })
  @ApiResponse({
    status: 200,
    type: ProjectResponse,
    description: "Detailed project retrieved successfully",
  })
  getDetailedProject(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getDetailedProject(userId, id);
  }

  @Patch(":id")
  @Permission(CanUpdateProject)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a project" })
  @ApiResponse({
    status: 200,
    type: ProjectResponse,
    description: "Project updated successfully",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(userId, id, updateProjectDto);
  }

  @Delete(":id")
  @Permission(CanDeleteProject)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a project" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Project deleted successfully",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.remove(userId, id);
  }

  @Get(":id/sections")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all sections in a project" })
  @ApiResponse({
    status: 200,
    type: SectionsOffsetResponse,
    description: "Sections in the project retrieved successfully",
  })
  getProjectSections(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectSections(userId, id);
  }

  @Get(":id/tasks")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all tasks in a project" })
  @ApiResponse({
    status: 200,
    type: SectionTasksOffsetResponse,
    description: "Tasks in the project retrieved successfully",
  })
  getProjectTasks(@Param("id") id: string, @GetCurrentUserId() userId: string, @Query() dto: GetSectionTasksQueryDto) {
    return this.projectService.getProjectTasks(userId, id, dto);
  }

  @Post(":id/members")
  @Permission(CanManageProjectMembers)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Invite a member to the project" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Member invited successfully",
  })
  inviteMember(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: InviteMemberDto) {
    return this.projectService.inviteMember(userId, id, dto);
  }

  @Post(":id/members/response-invitation")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Respond to a project invitation" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Response to invitation recorded successfully",
  })
  responseInvitation(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: ResponseInvitationDto) {
    return this.projectService.responseInvitation(userId, id, dto);
  }

  @Delete(":id/members/:memberId")
  @Permission(CanManageProjectMembers)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Remove a member from a project" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Member removed successfully",
  })
  removeMember(@Param("id") id: string, @GetCurrentUserId() userId: string, @Param("memberId") memberId: string) {
    return this.projectService.removeMember(userId, id, memberId);
  }

  @Get(":id/members")
  @Permission(CanManageProjectMembers)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all members of a project" })
  @ApiResponse({
    status: 200,
    type: UsersWithRoleOffsetResponse,
    description: "Members of the project retrieved successfully",
  })
  getProjectMembers(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectMembers(userId, id);
  }

  @Get(":id/my-role")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get current user's role in a project" })
  @ApiResponse({
    status: 200,
    type: RoleResponse,
    description: "Current user's role in the project retrieved successfully",
  })
  getMyRoleInProject(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getMyRoleInProject(userId, id);
  }

  @Get(":id/roles")
  @Permission(CanManageProjectRoles)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all roles of a project" })
  @ApiResponse({
    status: 200,
    type: RolesOffsetResponse,
    description: "Roles of the project retrieved successfully",
  })
  getProjectRoles(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectRoles(userId, id);
  }

  @Patch(":id/members/:memberId/role")
  @Permission(CanManageProjectRoles)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Assign a role to a project member" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Member role assigned successfully",
  })
  assignRoleToMember(
    @Param("id") id: string,
    @Param("memberId") memberId: string,
    @GetCurrentUserId() userId: string,
    @Body() dto: AssignRoleDto,
  ) {
    return this.projectService.assignRoleToMember(userId, id, memberId, dto);
  }

  @Get("invitations/received")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all received invitations" })
  @ApiResponse({
    status: 200,
    type: InvitationsOffsetResponse,
    description: "Received invitations retrieved successfully",
  })
  getReceivedInvitations(@GetCurrentUserId() userId: string) {
    return this.projectService.getReceivedInvitations(userId);
  }

  @Get(":id/invitations")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all invitations sent in a project" })
  @ApiResponse({
    status: 200,
    type: InvitationsOffsetResponse,
    description: "Project invitations retrieved successfully",
  })
  getProjectInvitations(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectInvitations(userId, id);
  }
}
