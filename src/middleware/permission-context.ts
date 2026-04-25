import { AsyncLocalStorage } from "async_hooks";
import { Permission } from "@/common/enum/permission.enum";

export interface PermissionContext {
  userId: string;
  projectId: string;
  permissions: Permission[];
  isPersonalProject: boolean;
  isProjectOwner: boolean;
}

export const permissionAsyncStorage = new AsyncLocalStorage<PermissionContext>();

export function getPermissionContext(): PermissionContext | undefined {
  return permissionAsyncStorage.getStore();
}

export function setPermissionContext(context: PermissionContext) {
  return permissionAsyncStorage.run(context, () => context);
}
