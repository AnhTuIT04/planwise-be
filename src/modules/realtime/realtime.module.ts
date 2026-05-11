import { Global, Module, ValidationPipe } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";

import { AuthModule } from "@/modules/auth/auth.module";
import { RealtimeGateway } from "./realtime.gateway";
import { SocketRegistry } from "./socket.registry";
import { SocketEmitter } from "./socket.emitter";
import { ChannelHandler } from "./channel/channel.handler";

@Global()
@Module({
  imports: [DiscoveryModule, AuthModule],
  providers: [
    {
      provide: ValidationPipe,
      useValue: new ValidationPipe({
        whitelist: true, // Strip properties that don't have decorators
        transform: true, // Automatically transform payloads to Dto instances
        forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
        transformOptions: { enableImplicitConversion: true }, // Allow primitive type conversions
      }),
    },
    RealtimeGateway,
    SocketRegistry,
    SocketEmitter,
    ChannelHandler,
  ],
  exports: [SocketEmitter],
})
export class RealtimeModule {}
