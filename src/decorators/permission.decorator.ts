import { SetMetadata } from "@nestjs/common";

import { type IPermissionHandler } from "~/permission/interfaces/permission-handler.interface";

export const PERMISSION_KEY = "permission_handler";

export const Permission = (handler: new (...args: any[]) => IPermissionHandler) => SetMetadata(PERMISSION_KEY, handler);
