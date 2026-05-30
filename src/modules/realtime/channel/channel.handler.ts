import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

import { Event, Payload } from "@/decorators/socket.decorator";
import { MongoService } from "@/modules/database/mongo.service";
import { PgService } from "@/modules/database/pg.service";
import { UserBasicDto } from "@/modules/auth/dto/response/user-basic-response.dto";
import { SocketEmitter } from "../socket.emitter";
import { SendMessageDto } from "./dto/send-message.dto";

@Injectable()
export class ChannelHandler {
  constructor(
    private emitter: SocketEmitter,
    private mongo: MongoService,
    private pg: PgService,
  ) {}

  @Event("c2s:channel:send-message")
  async handleReceiveMessage(client: Socket, @Payload() dto: SendMessageDto) {
    const user = await this.pg.user.findUnique({
      where: { id: client.data.user.id },
    });
    if (!user) throw new Error("User not found");

    // skip check user belongs to project for brevity

    const channel = await this.pg.channel.findUnique({
      where: { id: dto.channelId },
    });
    if (!channel) throw new Error("Channel not found");
    if (channel.type === "VIDEO" || channel.type === "VOICE") {
      throw new Error("Cannot send message to text channel");
    }

    const msg = await this.mongo.message.create({
      data: {
        channelId: dto.channelId,
        senderId: client.data.user.id,
        content: dto.content,
      },
    });

    this.emitter.to(`channel:${dto.channelId}`).emit("s2c:channel:new-message", {
      id: msg.id,
      channelId: msg.channelId,
      sender: new UserBasicDto(user),
      content: msg.content,
      createdAt: msg.createdAt,
      tempId: dto.tempId,
    });
  }
}
