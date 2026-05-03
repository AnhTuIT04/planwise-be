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
 * Display metadata for each permission, used by GET /projects/permissions
 * so the FE can render labels and descriptions without hard-coding them.
 */
export const PERMISSION_METADATA: Record<EPermission, { name: string; description: string }> = {
  [EPermission.PROJECT_UPDATE]: {
    name: "Update project",
    description: "Edit the project's name, description, and logo.",
  },
  [EPermission.PROJECT_DELETE]: {
    name: "Delete project",
    description: "Permanently delete the project and all of its data.",
  },
  [EPermission.PROJECT_MANAGE_MEMBERS]: {
    name: "Manage members",
    description: "Invite, remove, and view project members.",
  },
  [EPermission.PROJECT_MANAGE_ROLES]: {
    name: "Manage roles",
    description: "Create, edit, delete, and assign project roles.",
  },
  [EPermission.PROJECT_CREATE_DATA]: {
    name: "Create project data",
    description: "Create sections, tasks, and subtasks within the project.",
  },
  [EPermission.PROJECT_UPDATE_DATA]: {
    name: "Update project data",
    description: "Edit sections, tasks, and subtasks within the project.",
  },
  [EPermission.PROJECT_DELETE_DATA]: {
    name: "Delete project data",
    description: "Delete sections, tasks, and subtasks within the project.",
  },
};

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
