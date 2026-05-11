export interface IPermissionHandler {
  handle(params: { user: any; request: any }): boolean | Promise<boolean>;
}
