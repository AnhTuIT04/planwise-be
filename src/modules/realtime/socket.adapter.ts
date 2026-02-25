import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";

export class SocketAdapter extends IoAdapter {
  constructor(
    private readonly PORT: number,
    private readonly CORS_ORIGIN: string,
  ) {
    super();
  }

  createIOServer(port: number, options: any) {
    return super.createIOServer(this.PORT, {
      cors: {
        // origin: this.CORS_ORIGIN,
        origin: true,
        credentials: true,
      },
    });
  }
}
