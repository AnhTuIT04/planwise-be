import { Permission } from "@/common/enum/permission.enum";


export class PermissionUtils {
  static hasPermission(userPermissions: string[], requiredPermission: Permission): boolean {
    return userPermissions.includes(requiredPermission);
  }

  static hasAnyPermission(userPermissions: string[], permissions: Permission[]): boolean {
    return permissions.some((permission) => userPermissions.includes(permission));
  }

  static hasAllPermissions(userPermissions: string[], permissions: Permission[]): boolean {
    return permissions.every((permission) => userPermissions.includes(permission));
  }

  static parsePermissions(permissionsJson: string): string[] {
    try {
      return JSON.parse(permissionsJson) || [];
    } catch {
      return [];
    }
  }

  static stringifyPermissions(permissions: string[]): string {
    return JSON.stringify(permissions);
  }

  static filterActionsByPermissions<T extends { permission?: Permission }>(
    actions: T[],
    userPermissions: string[]
  ): T[] {
    return actions.filter((action) => !action.permission || this.hasPermission(userPermissions, action.permission));
  }
}
