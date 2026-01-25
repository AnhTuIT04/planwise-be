import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PermissionChecker } from './permission-checker.service';
import { PermissionMiddleware } from './permission.middleware';
import { RequirePermissionMiddleware } from './require-permission.middleware';
import { DatabaseModule } from '@/modules/database/database.module';
import { PermissionModule } from '@/modules/permission/permission.module';

/**
 * PermissionModule cho permission middleware và checker service
 * Cung cấp:
 * - PermissionChecker: Service để kiểm tra permission
 * - PermissionMiddleware: Middleware để set up permission context
 * - RequirePermissionMiddleware: Middleware để enforce permission
 *
 * Usage:
 * 1. Import vào app.module
 * 2. Áp dụng middleware trong các module khác
 * 3. Dùng @RequirePermissions decorator trên endpoint
 */
@Module({
  imports: [DatabaseModule, PermissionModule],
  providers: [PermissionChecker],
  exports: [PermissionChecker],
})
export class PermissionMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware để set up permission context
    consumer
      .apply(PermissionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    // Middleware để enforce permission
    consumer
      .apply(RequirePermissionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
