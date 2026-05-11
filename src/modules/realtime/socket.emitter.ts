import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";

@Injectable()
export class SocketEmitter {
  private _server!: Server;

  setServer(server: Server) {
    this._server = server;
  }

  private get server(): Server {
    if (!this._server) {
      throw new Error("Socket server not initialized");
    }
    return this._server;
  }

  emit(event: string, payload?: any) {
    return this.server.emit(event, payload);
  }

  to(room: string): ReturnType<Server["to"]> {
    return this.server.to(room);
  }

  in(room: string): ReturnType<Server["in"]> {
    return this.server.in(room);
  }

  except(room: string): ReturnType<Server["except"]> {
    return this.server.except(room);
  }
}
