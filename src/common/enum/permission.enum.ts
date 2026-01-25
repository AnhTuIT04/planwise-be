/**
 * Permission enum - Define all possible permissions in the system
 * Format: resource:action
 * 
 * This is the single source of truth for all available permissions.
 * New permissions can be easily added here and reused throughout the app.
 */
export enum Permission {
  ALL = "all",
  // Project permissions
  PROJECT_READ = "project:read",
  PROJECT_UPDATE = "project:update",
  PROJECT_DELETE = "project:delete",
  PROJECT_VIEW_MEMBERS = "project:view-members",
  PROJECT_MANAGE_MEMBERS = "project:manage-members",
  PROJECT_MANAGE_ROLES = "project:manage-roles",

  // Task permissions
  TASK_CREATE = "task:create",
  TASK_READ = "task:read",
  TASK_UPDATE = "task:update",
  TASK_DELETE = "task:delete",
  TASK_ARCHIVE = "task:archive",
  TASK_ASSIGN = "task:assign",

  // Subtask permissions
  SUBTASK_CREATE = "subtask:create",
  SUBTASK_READ = "subtask:read",
  SUBTASK_UPDATE = "subtask:update",
  SUBTASK_DELETE = "subtask:delete",

  // Section permissions
  SECTION_CREATE = "section:create",
  SECTION_READ = "section:read",
  SECTION_UPDATE = "section:update",
  SECTION_DELETE = "section:delete",

  // Comment permissions
  COMMENT_CREATE = "comment:create",
  COMMENT_READ = "comment:read",
  COMMENT_UPDATE = "comment:update",
  COMMENT_DELETE = "comment:delete",
}

/**
 * Default role permission mappings
 * Pre-configured roles with their associated permissions
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: [
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_DELETE,
    Permission.PROJECT_VIEW_MEMBERS,
    Permission.PROJECT_MANAGE_MEMBERS,
    Permission.PROJECT_MANAGE_ROLES,
    Permission.TASK_CREATE,
    Permission.TASK_READ,
    Permission.TASK_UPDATE,
    Permission.TASK_DELETE,
    Permission.TASK_ARCHIVE,
    Permission.TASK_ASSIGN,
    Permission.SUBTASK_CREATE,
    Permission.SUBTASK_READ,
    Permission.SUBTASK_UPDATE,
    Permission.SUBTASK_DELETE,
    Permission.SECTION_CREATE,
    Permission.SECTION_READ,
    Permission.SECTION_UPDATE,
    Permission.SECTION_DELETE,
    Permission.COMMENT_CREATE,
    Permission.COMMENT_READ,
    Permission.COMMENT_UPDATE,
    Permission.COMMENT_DELETE,
  ],
  EDITOR: [
    Permission.PROJECT_READ,
    Permission.PROJECT_VIEW_MEMBERS,
    Permission.TASK_CREATE,
    Permission.TASK_READ,
    Permission.TASK_UPDATE,
    Permission.TASK_DELETE,
    Permission.TASK_ARCHIVE,
    Permission.SUBTASK_CREATE,
    Permission.SUBTASK_READ,
    Permission.SUBTASK_UPDATE,
    Permission.SUBTASK_DELETE,
    Permission.SECTION_CREATE,
    Permission.SECTION_READ,
    Permission.SECTION_UPDATE,
    Permission.SECTION_DELETE,
    Permission.COMMENT_CREATE,
    Permission.COMMENT_READ,
    Permission.COMMENT_UPDATE,
    Permission.COMMENT_DELETE,
  ],
  VIEWER: [
    Permission.PROJECT_READ,
    Permission.PROJECT_VIEW_MEMBERS,
    Permission.TASK_READ,
    Permission.SUBTASK_READ,
    Permission.SECTION_READ,
    Permission.COMMENT_READ,
    Permission.COMMENT_CREATE,
  ],
};
