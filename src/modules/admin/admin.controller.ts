import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Public } from "@/decorators/public.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { AdminService } from "./admin.service";
import { AdminJwtGuard } from "./guards/admin-jwt.guard";
import { ListUsersQueryDto } from "./dto/request/list-users-query.dto";
import { ListProjectsQueryDto } from "./dto/request/list-projects-query.dto";
import { AdminUsersOffsetResponse, AdminUserDetailResponse } from "./dto/response/admin-user-response.dto";
import { AdminProjectsOffsetResponse, AdminProjectDetailResponse } from "./dto/response/admin-project-response.dto";
import { AdminStatsResponse } from "./dto/response/admin-stats-response.dto";

// NOTE: every route is marked @Public() so the globally registered user JwtGuard
// (APP_GUARD) skips it; AdminJwtGuard then enforces the admin JWT cookie.
// Projects are intentionally READ-ONLY for admins (general info only).
@ApiTags("Admin")
@Controller("admin")
@UseGuards(AdminJwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("stats")
  @Public()
  @ApiOperation({ summary: "Get admin dashboard statistics (totals, growth, daily activity, recents)" })
  @ApiResponse({ status: 200, type: AdminStatsResponse, description: "Statistics retrieved successfully." })
  getStats() {
    return this.adminService.getStats();
  }

  @Get("users")
  @Public()
  @ApiOperation({ summary: "List all users (searchable, paginated)" })
  @ApiResponse({ status: 200, type: AdminUsersOffsetResponse, description: "Users retrieved successfully." })
  listUsers(@Query() query: ListUsersQueryDto) {
    return this.adminService.listUsers(query);
  }

  @Get("users/:id")
  @Public()
  @ApiOperation({ summary: "Get detailed information about a user" })
  @ApiResponse({ status: 200, type: AdminUserDetailResponse, description: "User detail retrieved successfully." })
  getUserDetail(@Param("id") id: string) {
    return this.adminService.getUserDetail(id);
  }

  @Patch("users/:id/disable")
  @Public()
  @ApiOperation({ summary: "Disable (soft-delete) a user account" })
  @ApiResponse({ status: 200, type: MessageOnlyResponse, description: "User has been disabled." })
  disableUser(@Param("id") id: string) {
    return this.adminService.disableUser(id);
  }

  @Patch("users/:id/enable")
  @Public()
  @ApiOperation({ summary: "Re-enable a disabled user account" })
  @ApiResponse({ status: 200, type: MessageOnlyResponse, description: "User has been enabled." })
  enableUser(@Param("id") id: string) {
    return this.adminService.enableUser(id);
  }

  @Get("projects")
  @Public()
  @ApiOperation({ summary: "List all projects in the system (metadata only)" })
  @ApiResponse({ status: 200, type: AdminProjectsOffsetResponse, description: "Projects retrieved successfully." })
  listProjects(@Query() query: ListProjectsQueryDto) {
    return this.adminService.listProjects(query);
  }

  @Get("projects/:id")
  @Public()
  @ApiOperation({ summary: "Get general info of a project (metadata + members, no tasks/sections content)" })
  @ApiResponse({ status: 200, type: AdminProjectDetailResponse, description: "Project info retrieved successfully." })
  getProjectDetail(@Param("id") id: string) {
    return this.adminService.getProjectDetail(id);
  }
}
