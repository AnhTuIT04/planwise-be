import { Permission } from "@/common/enum/permission.enum";

/**
 * Permission details with human-readable descriptions
 */
export const PERMISSION_DESCRIPTIONS: Record<Permission, { name: string; description: string }> = {
  [Permission.PROJECT_READ]: {
    name: "View Project",
    description: "Can view project details and information",
  },
  [Permission.PROJECT_UPDATE]: {
    name: "Edit Project",
    description: "Can update project information",
  },
  [Permission.PROJECT_DELETE]: {
    name: "Delete Project",
    description: "Can delete the entire project",
  },
  [Permission.PROJECT_VIEW_MEMBERS]: {
    name: "View Members",
    description: "Can view project members and their roles",
  },
  [Permission.PROJECT_MANAGE_MEMBERS]: {
    name: "Manage Members",
    description: "Can invite, remove, and manage project members",
  },
  [Permission.PROJECT_MANAGE_ROLES]: {
    name: "Manage Roles",
    description: "Can create, edit, and delete project roles",
  },
  [Permission.TASK_CREATE]: {
    name: "Create Tasks",
    description: "Can create new tasks in the project",
  },
  [Permission.TASK_READ]: {
    name: "View Tasks",
    description: "Can view all tasks",
  },
  [Permission.TASK_UPDATE]: {
    name: "Edit Tasks",
    description: "Can edit task details",
  },
  [Permission.TASK_DELETE]: {
    name: "Delete Tasks",
    description: "Can permanently delete tasks",
  },
  [Permission.TASK_ARCHIVE]: {
    name: "Archive Tasks",
    description: "Can archive and restore tasks",
  },
  [Permission.TASK_ASSIGN]: {
    name: "Assign Tasks",
    description: "Can assign tasks to users",
  },
  [Permission.SUBTASK_CREATE]: {
    name: "Create Subtasks",
    description: "Can create subtasks under tasks",
  },
  [Permission.SUBTASK_READ]: {
    name: "View Subtasks",
    description: "Can view all subtasks",
  },
  [Permission.SUBTASK_UPDATE]: {
    name: "Edit Subtasks",
    description: "Can edit subtask details",
  },
  [Permission.SUBTASK_DELETE]: {
    name: "Delete Subtasks",
    description: "Can delete subtasks",
  },
  [Permission.SECTION_CREATE]: {
    name: "Create Sections",
    description: "Can create new project sections",
  },
  [Permission.SECTION_READ]: {
    name: "View Sections",
    description: "Can view all sections",
  },
  [Permission.SECTION_UPDATE]: {
    name: "Edit Sections",
    description: "Can edit section details",
  },
  [Permission.SECTION_DELETE]: {
    name: "Delete Sections",
    description: "Can delete sections",
  },
  [Permission.COMMENT_CREATE]: {
    name: "Create Comments",
    description: "Can comment on tasks and subtasks",
  },
  [Permission.COMMENT_READ]: {
    name: "View Comments",
    description: "Can view all comments",
  },
  [Permission.COMMENT_UPDATE]: {
    name: "Edit Comments",
    description: "Can edit own comments",
  },
  [Permission.COMMENT_DELETE]: {
    name: "Delete Comments",
    description: "Can delete comments",
  },
  [Permission.ALL]: {
    name: "Full Access",
    description: "Grants all permissions without restrictions",
  },
};

/**
 * DTO for returning permission information
 */
export class PermissionDto {
  readonly permission: string;
  readonly name: string;
  readonly description: string;

  constructor(permission: string | Permission) {
    this.permission = permission as string;
    const details = PERMISSION_DESCRIPTIONS[permission as Permission];
    this.name = details?.name || permission;
    this.description = details?.description || "";
  }
}

/**
 * DTO for returning user permissions with role information
 */
export class UserPermissionsDto {
  readonly roleId: string;
  readonly roleName: string;
  readonly permissions: PermissionDto[];

  constructor(roleId: string, roleName: string, permissions: string[]) {
    this.roleId = roleId;
    this.roleName = roleName;
    this.permissions = permissions.map((p) => new PermissionDto(p as Permission));
  }
}
