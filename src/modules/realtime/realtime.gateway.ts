import { JwtService } from "@nestjs/jwt";
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { PgService } from "@/modules/database/pg.service";
import { SocketRegistry } from "./socket.registry";
import { SocketEmitter } from "./socket.emitter";

@WebSocketGateway()
export class RealtimeGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private registry: SocketRegistry,
    private emitter: SocketEmitter,
    private jwt: JwtService,
    private pg: PgService,
  ) {}

  afterInit(server: Server) {
    this.emitter.setServer(server);

    server.use((socket, next) => {
      try {
        const token =
          socket.handshake.headers.cookie
            ?.split("; ")
            .find((x) => x.startsWith("esiwnalp_keton="))
            ?.split("=")[1] || "";

        const payload = this.jwt.verify(token);
        socket.data.user = {
          id: payload.sub,
          email: payload.email,
        };

        next();
      } catch {
        next(new Error("Unauthorized"));
      }
    });

    server.on("connection", async (socket) => {
      socket.join(`user:${socket.data.user.id}`);

      const projects = await this.pg.projectMember.findMany({
        where: { userId: socket.data.user.id },
        select: {
          project: { include: { channels: true } },
        },
      });

      for (const pm of projects) {
        socket.join(`project:${pm.project.id}`);
        for (const channel of pm.project.channels) {
          socket.join(`channel:${channel.id}`);
        }
      }

      socket.onAny(async (event, payload) => {
        await this.registry.execute(event, socket, payload);
      });
    });
  }
}
