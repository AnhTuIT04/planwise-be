import { Injectable, Type, mixin } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

import { IPermissionHandler } from "../interfaces/permission-handler.interface";

export function Or(...handlers: Type<IPermissionHandler>[]): Type<IPermissionHandler> {
  @Injectable()
  class OrHandler implements IPermissionHandler {
    constructor(private moduleRef: ModuleRef) {}

    async handle(params) {
      for (const Handler of handlers) {
        const instance = await this.moduleRef.create(Handler);
        if (await instance.handle(params)) return true;
      }
      return false;
    }
  }

  return mixin(OrHandler);
}
