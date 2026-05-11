import { Injectable } from "@nestjs/common";

import { EPermission } from "@/common/enum/permission.enum";
import { BasePermissionHandler } from "./base-permission.handler";

@Injectable()
export class CanDeleteProjectData extends BasePermissionHandler {
  protected readonly permissions = [EPermission.PROJECT_DELETE_DATA];
}
