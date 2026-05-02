import { type DefaultRole } from "./default-role.enum";

/**
 * Permission enum - Define all possible permissions in the system
 * Format: resource:action
 *
 * This is the single source of truth for all available permissions.
 * New permissions can be easily added here and reused throughout the app.
 */
export enum EPermission {
  // Project permissions
  PROJECT_UPDATE = "project:update",
  PROJECT_DELETE = "project:delete",
  PROJECT_MANAGE_MEMBERS = "project:manage-members",
  PROJECT_MANAGE_ROLES = "project:manage-roles",

  // Project data permissions (e.g., tasks, subtask, section)
  PROJECT_CREATE_DATA = "project:create-data",
  PROJECT_UPDATE_DATA = "project:update-data",
  PROJECT_DELETE_DATA = "project:delete-data",
}

/**
 * Default role permission mappings
 * Pre-configured roles with their associated permissions
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<DefaultRole, EPermission[]> = {
  OWNER: [
    EPermission.PROJECT_UPDATE,
    EPermission.PROJECT_DELETE,
    EPermission.PROJECT_MANAGE_MEMBERS,
    EPermission.PROJECT_MANAGE_ROLES,
    EPermission.PROJECT_CREATE_DATA,
    EPermission.PROJECT_UPDATE_DATA,
    EPermission.PROJECT_DELETE_DATA,
  ],
  MEMBER: [EPermission.PROJECT_CREATE_DATA, EPermission.PROJECT_UPDATE_DATA, EPermission.PROJECT_DELETE_DATA],
};
