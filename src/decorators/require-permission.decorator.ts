import { SetMetadata, applyDecorators } from "@nestjs/common";
import { type Permission } from "@/common/enum/permission.enum";

export const PERMISSION_KEY = "required_permissions";
export const REQUIRE_ALL_PERMISSIONS_KEY = "require_all_permissions";
export const ALLOW_PERSONAL_OWNER_KEY = "allow_personal_owner";

export interface PermissionConfig {
  permissions: Permission | Permission[];
  requireAll?: boolean; // false = ANY, true = ALL
  allowPersonalProjectOwner?: boolean; // Default: true
}

export function RequirePermissions(config: PermissionConfig) {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, config.permissions),
    SetMetadata(REQUIRE_ALL_PERMISSIONS_KEY, config.requireAll ?? true),
    SetMetadata(ALLOW_PERSONAL_OWNER_KEY, config.allowPersonalProjectOwner ?? true),
  );
}

export function RequirePermission(permission: Permission) {
  return RequirePermissions({ permissions: permission });
}

export function RequireAnyPermission(permissions: Permission[]) {
  return RequirePermissions({ permissions, requireAll: false });
}
