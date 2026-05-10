import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";

import { PgService } from "@/modules/database/pg.service";
import { MongoService } from "@/modules/database/mongo.service";
import { SocketEmitter } from "@/modules/realtime/socket.emitter";
import { CreateChannelDto } from "./dto/request/create-channel.dto";
import { ChannelResponse, ChannelsOffsetResponse } from "./dto/response/channel-response.dto";
import { UpdateChannelDto } from "./dto/request/update-channel.dto";
import { MessagesListResponseDto } from "./dto/response/message-response.dto";

@Injectable()
export class ChannelService {
  constructor(
    private readonly pg: PgService,
    private readonly mongo: MongoService,
    private readonly emitter: SocketEmitter,
  ) {}

  async create(userId: string, dto: CreateChannelDto) {
    // temporary skip permission check

    const channel = await this.pg.channel.create({
      data: {
        name: dto.name,
        type: dto.type,
        projectId: dto.projectId,
      },
    });

    const response = new ChannelResponse(channel, "Channel created successfully");

    this.emitter.to(`project:${dto.projectId}`).emit("s2c:project:new-channel", response.data);
    const sockets = await this.emitter.in(`project:${dto.projectId}`).fetchSockets();
    for (const socket of sockets) {
      socket.join(`channel:${channel.id}`);
    }

    return response;
  }

  async getAllChannels(userId: string, projectId: string) {
    // temporary skip permission check

    const channels = await this.pg.channel.findMany({
      where: { projectId },
    });

    return new ChannelsOffsetResponse(channels, 1, channels.length, channels.length, "Channels retrieved successfully");
  }

  async update(userId: string, id: string, dto: UpdateChannelDto) {
    // temporary skip permission check

    const channel = await this.pg.channel.findUnique({ where: { id } });
    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    const updatedChannel = await this.pg.channel.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });

    const response = new ChannelResponse(updatedChannel, "Channel updated successfully");
    this.emitter.to(`project:${channel.projectId}`).emit("s2c:project:update-channel", response.data);
    return response;
  }

  async remove(userId: string, id: string) {
    // temporary skip permission check

    const channel = await this.pg.channel.findUnique({ where: { id } });
    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    await this.pg.channel.delete({ where: { id } });

    this.emitter.to(`project:${channel.projectId}`).emit("s2c:project:delete-channel", { id });
    return { message: "Channel deleted successfully" };
  }

  async getMessages(userId: string, channelId: string, cursor?: string, limit: number = 20) {
    // temporary skip permission check

    // Verify channel exists and is TEXT type
    const channel = await this.pg.channel.findUnique({ where: { id: channelId } });
    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    if (channel.type !== "TEXT") {
      throw new BadRequestException("Only TEXT channels support messages");
    }

    // Get messages from MongoDB with pagination
    const messages = await this.mongo.message.findMany({
      where: { channelId },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    const hasNextPage = messages.length > limit;
    const data = hasNextPage ? messages.slice(0, limit) : messages;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    // Fetch sender details from PostgreSQL
    const senderIds = [...new Set(messages.map((msg) => msg.senderId))];
    const senders = await this.pg.user.findMany({
      where: { id: { in: senderIds } },
    });

    // Map senders to messages
    const senderMap = new Map(senders.map((sender) => [sender.id, sender]));
    const messagesWithSenders = messages.map((msg) => ({
      ...msg,
      sender: senderMap.get(msg.senderId),
    }));

    return new MessagesListResponseDto(messagesWithSenders, nextCursor);
  }
}
