import { SetMetadata } from "@nestjs/common";

export const SOCKET_EVENT = "SOCKET_EVENT";
export const SOCKET_PAYLOAD = "SOCKET_PAYLOAD";

export const Event = (event: string) => SetMetadata(SOCKET_EVENT, event);

export function Payload(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) return;

    Reflect.defineMetadata(SOCKET_PAYLOAD, parameterIndex, target, propertyKey);
  };
}
