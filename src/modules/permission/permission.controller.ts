import { Controller, Get, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { PermissionService } from "./permission.service";
import { PermissionDto, UserPermissionsDto } from "./dto/permission.dto";
import { PermissionUtils } from "@/common/utils/permission.utils";
import { PgService } from "@/modules/database/pg.service";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly pg: PgService,
  ) {}

  @Get("available")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all available permissions" })
  @ApiResponse({
    status: 200,
    description: "List of all available permissions",
    schema: {
      type: "array",
      items: {
        $ref: "#/components/schemas/PermissionDto",
      },
    },
  })
  getAvailablePermissions() {
    const permissions = this.permissionService.getAvailablePermissions();
    return {
      data: permissions.map((p) => new PermissionDto(p)),
      total: permissions.length,
    };
  }

  @Get("groups")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get permissions organized by category" })
  @ApiResponse({
    status: 200,
    description: "Permissions grouped by category",
  })
  getPermissionGroups() {
    const groups = this.permissionService.getPermissionGroups();
    return Object.entries(groups).reduce(
      (acc, [category, permissions]) => {
        acc[category] = permissions.map((p) => new PermissionDto(p));
        return acc;
      },
      {} as Record<string, PermissionDto[]>,
    );
  }

  @Get("my-permissions/:projectId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get current user's permissions in a project" })
  @ApiResponse({
    status: 200,
    description: "User's permissions in the specified project",
    schema: {
      $ref: "#/components/schemas/UserPermissionsDto",
    },
  })
  async getMyPermissions(@GetCurrentUserId() userId: string, @Param("projectId") projectId: string) {
    const projectMember = await this.pg.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      include: {
        role: true,
      },
    });

    if (!projectMember) {
      return {
        roleId: null,
        roleName: null,
        permissions: [],
      };
    }

    const permissions = PermissionUtils.parsePermissions(projectMember.role.permissions);
    return new UserPermissionsDto(projectMember.role.id, projectMember.role.name, permissions);
  }

  @Get("roles/:projectId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all roles and their permissions in a project" })
  @ApiResponse({
    status: 200,
    description: "List of all roles with their permissions",
  })
  async getRolesPermissions(@GetCurrentUserId() userId: string, @Param("projectId") projectId: string) {
    const projectMember = await this.pg.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      include: {
        role: true,
      },
    });

    if (!projectMember) {
      return [];
    }

    const roles = await this.pg.role.findMany({
      where: { projectId },
      orderBy: { default: "desc" },
    });

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      default: role.default,
      permissions: PermissionUtils.parsePermissions(role.permissions).map((p) => new PermissionDto(p)),
    }));
  }
}
