/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import { IoAdapter } from "@nestjs/platform-socket.io";
import type { Server } from "socket.io";

export class SocketAdapter extends IoAdapter {
  constructor(
    private readonly PORT: number,
    private readonly CORS_ORIGIN: string,
  ) {
    super();
  }

  createIOServer(_port: number, _options: any): Server {
    return super.createIOServer(this.PORT, {
      cors: {
        origin: this.CORS_ORIGIN,
        credentials: true,
      },
    });
  }
}
