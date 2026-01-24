import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { RolesListResponseDto } from "@/modules/role/dto/response/role-response.dto";
import { UsersWithRoleListResponseDto } from "@/modules/auth/dto/response/user-with-role-response.dto";
import { SectionsListResponseDto } from "@/modules/section/dto/response/section-response.dto";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/request/create-project.dto";
import { UpdateProjectDto } from "./dto/request/update-project.dto";
import { InviteMemberDto, ResponseInvitationDto } from "./dto/request/invite-member.dto";
import { AssignRoleDto } from "./dto/request/assign-role.dto";
import { GetProjectTasksQueryDto } from "./dto/request/query/get-project-tasks-query.dto";
import { ProjectResponseDto, ProjectsListResponseDto } from "./dto/response/project-response.dto";
import { ProjectTasksListResponseDto } from "./dto/response/project-tasks-response.dto";
import { InvitationsListResponseDto } from "./dto/response/invitation-response.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get("invitations/received")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all received invitations" })
  @ApiResponse({
    status: 200,
    type: InvitationsListResponseDto,
    description: "Received invitations retrieved successfully",
  })
  getReceivedInvitations(@GetCurrentUserId() userId: string) {
    return this.projectService.getReceivedInvitations(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a project" })
  @ApiResponse({
    status: 201,
    type: ProjectResponseDto,
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
    type: ProjectsListResponseDto,
    description: "Projects retrieved successfully",
  })
  getAllProjects(@GetCurrentUserId() userId: string) {
    return this.projectService.getAllProjects(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get detailed project by ID" })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
    description: "Detailed project retrieved successfully",
  })
  getDetailedProject(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getDetailedProject(userId, id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a project" })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
    description: "Project updated successfully",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(userId, id, updateProjectDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a project" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
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
    type: SectionsListResponseDto,
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
    type: ProjectTasksListResponseDto,
    description: "Tasks in the project retrieved successfully",
  })
  getProjectTasks(@Param("id") id: string, @GetCurrentUserId() userId: string, @Query() dto: GetProjectTasksQueryDto) {
    return this.projectService.getProjectTasks(userId, id, dto);
  }

  @Post(":id/members")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Invite a member to the project" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
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
    type: MessageResponseDto,
    description: "Response to invitation recorded successfully",
  })
  responseInvitation(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: ResponseInvitationDto) {
    return this.projectService.responseInvitation(userId, id, dto);
  }


  @Delete(":id/members/:memberId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Remove a member from a project" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "Member removed successfully",
  })
  removeMember(@Param("id") id: string, @GetCurrentUserId() userId: string, @Param("memberId") memberId: string) {
    return this.projectService.removeMember(userId, id, memberId);
  }

  @Get(":id/members")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all members of a project" })
  @ApiResponse({
    status: 200,
    type: UsersWithRoleListResponseDto,
    description: "Members of the project retrieved successfully",
  })
  getProjectMembers(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectMembers(userId, id);
  }

  @Get(":id/roles")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all roles of a project" })
  @ApiResponse({
    status: 200,
    type: RolesListResponseDto,
    description: "Roles of the project retrieved successfully",
  })
  getProjectRoles(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectRoles(userId, id);
  }

  @Patch(":id/members/:memberId/role")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Assign a role to a project member" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
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

  @Get(":id/invitations")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all invitations sent in a project" })
  @ApiResponse({
    status: 200,
    type: InvitationsListResponseDto,
    description: "Project invitations retrieved successfully",
  })
  getProjectInvitations(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getProjectInvitations(userId, id);
  }
}
