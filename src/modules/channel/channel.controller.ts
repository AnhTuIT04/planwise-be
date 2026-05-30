import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/request/create-channel.dto";
import { ChannelResponseDto, ChannelsListResponseDto } from "./dto/response/channel-response.dto";
import { UpdateChannelDto } from "./dto/request/update-channel.dto";
import { MessagesListResponseDto } from "./dto/response/message-response.dto";

@ApiTags("Channel")
@Controller("channel")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new channel in a project" })
  @ApiResponse({
    status: 200,
    type: ChannelResponseDto,
    description: "Received invitations retrieved successfully",
  })
  create(@GetCurrentUserId() userId: string, @Body() dto: CreateChannelDto) {
    return this.channelService.create(userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all channels in a project" })
  @ApiResponse({
    status: 200,
    type: ChannelsListResponseDto,
    description: "Channels retrieved successfully",
  })
  getAllChannels(@GetCurrentUserId() userId: string, @Query("projectId") projectId: string) {
    return this.channelService.getAllChannels(userId, projectId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a channel in a project" })
  update(@GetCurrentUserId() userId: string, @Param("id") id: string, @Body() dto: UpdateChannelDto) {
    return this.channelService.update(userId, id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a channel in a project" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "Channel deleted successfully",
  })
  remove(@GetCurrentUserId() userId: string, @Param("id") id: string) {
    return this.channelService.remove(userId, id);
  }

  @Get(":id/messages")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all messages from a TEXT channel" })
  @ApiResponse({
    status: 200,
    type: MessagesListResponseDto,
    description: "Messages retrieved successfully",
  })
  getMessages(
    @GetCurrentUserId() userId: string,
    @Param("id") channelId: string,
    @Query("cursor") cursor?: string,
    @Query("limit") limit?: number,
  ) {
    return this.channelService.getMessages(userId, channelId, cursor, limit);
  }
}
