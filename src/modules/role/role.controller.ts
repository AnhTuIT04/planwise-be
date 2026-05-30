import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/request/create-role.dto";
import { UpdateRoleDto } from "./dto/request/update-role.dto";
import { RoleResponseDto, RolesListResponseDto } from "./dto/response/role-response.dto";

@ApiTags("Role")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new role in a project" })
  @ApiResponse({
    status: 201,
    type: RoleResponseDto,
    description: "The role has been successfully created.",
  })
  create(@GetCurrentUserId() userId: string, @Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(userId, createRoleDto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a role in a project" })
  @ApiResponse({
    status: 200,
    type: RoleResponseDto,
    description: "The role has been successfully updated.",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(userId, id, updateRoleDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a role in a project" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "The role has been successfully deleted.",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.roleService.remove(userId, id);
  }
}
