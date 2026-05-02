import { JwtService } from "@nestjs/jwt";
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { PgService } from "@/modules/database/pg.service";
import { SocketRegistry } from "./socket.registry";
import { SocketEmitter } from "./socket.emitter";

@WebSocketGateway()
export class RealtimeGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

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
      const userId = socket.data.user.id;

      const projects = await this.pg.projectMember.findMany({
        where: { userId },
        select: {
          project: { include: { channels: true } },
        },
      });

      const rooms: string[] = [`user:${userId}`];

      for (const pm of projects) {
        rooms.push(`project:${pm.project.id}`);
        for (const channel of pm.project.channels) {
          rooms.push(`channel:${channel.id}`);
        }
      }

      await Promise.all(rooms.map((room) => Promise.resolve(socket.join(room))));

      socket.onAny((event, payload) => {
        this.registry.execute(event, socket, payload).catch((err) => {
          console.error("Socket handler error:", err);
        });
      });
    });
  }
}
