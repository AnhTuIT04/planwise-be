import { Injectable, Logger, OnModuleInit, ValidationPipe } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";
import { Socket } from "socket.io";

import { SOCKET_EVENT, SOCKET_PAYLOAD } from "@/decorators/socket.decorator";

type HandlerRecord = {
  fn: (client: Socket, payload?: any) => Promise<void> | void;
  payloadType?: any;
  hasPayload: boolean;
  hasPayloadDecorator: boolean;
};

@Injectable()
export class SocketRegistry implements OnModuleInit {
  private handlers = new Map<string, HandlerRecord>();
  private readonly logger = new Logger(SocketRegistry.name);

  constructor(
    private discovery: DiscoveryService,
    private validator: ValidationPipe,
  ) {}

  onModuleInit() {
    const providers = this.discovery.getProviders().filter((p) => p.metatype);

    for (const wrapper of providers) {
      const instance = wrapper.instance;
      if (!instance) continue;
      const constructorName = instance.constructor?.name;
      if (typeof constructorName !== "string" || !constructorName.endsWith("Handler")) continue;

      const proto = Object.getPrototypeOf(instance);

      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key === "constructor") continue;

        const fn = proto[key] as (...args: any[]) => any;
        if (typeof fn !== "function") continue;

        const event = Reflect.getMetadata(SOCKET_EVENT, fn);
        if (!event) continue;

        const hasPayloadDecorator = Reflect.getMetadata(SOCKET_PAYLOAD, proto, key) !== undefined;
        const paramTypes = Reflect.getMetadata("design:paramtypes", proto, key);

        const hasPayload = paramTypes && paramTypes.length > 1;
        const payloadType = hasPayloadDecorator ? paramTypes?.[1] : undefined;

        this.handlers.set(event, {
          fn: fn.bind(instance),
          payloadType,
          hasPayload,
          hasPayloadDecorator,
        });
        this.logger.log(`Registered socket event: "${event}"`);
      }
    }
  }

  async execute(event: string, client: Socket, payload: any) {
    const record = this.handlers.get(event);
    if (!record) return;

    // If has @Payload() decorator, validate and transform the payload
    if (record.hasPayloadDecorator) {
      payload = await this.validator.transform(payload, {
        type: "body",
        metatype: record.payloadType,
      });

      return record.fn(client, payload);
    }

    // If no @Payload() decorator but has payload parameter, pass it directly
    if (record.hasPayload) {
      return record.fn(client, payload);
    }

    // No payload parameter
    return record.fn(client);
  }
}
