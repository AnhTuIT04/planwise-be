import { Controller, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Permission } from "@/decorators/permission.decorator";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PermissionGuard } from "~/permission/guards/permission.guard";
import { CanManageProjectRoles } from "./handlers/can-manage-project-roles.handler";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/request/create-role.dto";
import { UpdateRoleDto } from "./dto/request/update-role.dto";
import { ChangeUserRoleDto } from "./dto/request/change-user-role.dto";
import { RoleResponse } from "./dto/response/role-response.dto";

@ApiTags("Role")
@Controller("roles")
@UseGuards(PermissionGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Permission(CanManageProjectRoles)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new role in a project" })
  @ApiResponse({
    status: 201,
    type: RoleResponse,
    description: "The role has been successfully created.",
  })
  create(@GetCurrentUserId() userId: string, @Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(userId, createRoleDto);
  }

  @Patch(":id")
  @Permission(CanManageProjectRoles)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a role in a project" })
  @ApiResponse({
    status: 200,
    type: RoleResponse,
    description: "The role has been successfully updated.",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(userId, id, updateRoleDto);
  }

  @Patch(":id/assign")
  @Permission(CanManageProjectRoles)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Change a user's role in a project" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "The user's role has been successfully changed.",
  })
  changeUserRole(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: ChangeUserRoleDto) {
    return this.roleService.changeUserRole(userId, id, dto);
  }

  @Delete(":id")
  @Permission(CanManageProjectRoles)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a role in a project" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "The role has been successfully deleted.",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.roleService.remove(userId, id);
  }
}
