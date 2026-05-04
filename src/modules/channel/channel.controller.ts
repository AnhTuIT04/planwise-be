import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Permission } from "@/decorators/permission.decorator";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PermissionGuard } from "~/permission/guards/permission.guard";
import { CanCreateProjectData } from "./handlers/can-create-project-data.handler";
import { CanUpdateProjectData } from "./handlers/can-update-project-data.handler";
import { CanDeleteProjectData } from "./handlers/can-delete-project-data.handler";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/request/create-channel.dto";
import { ChannelResponse, ChannelsOffsetResponse } from "./dto/response/channel-response.dto";
import { UpdateChannelDto } from "./dto/request/update-channel.dto";
import { MessagesListResponseDto } from "./dto/response/message-response.dto";

@ApiTags("Channel")
@Controller("channel")
@UseGuards(PermissionGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @Permission(CanCreateProjectData)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new channel in a project" })
  @ApiResponse({
    status: 200,
    type: ChannelResponse,
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
    type: ChannelsOffsetResponse,
    description: "Channels retrieved successfully",
  })
  getAllChannels(@GetCurrentUserId() userId: string, @Query("projectId") projectId: string) {
    return this.channelService.getAllChannels(userId, projectId);
  }

  @Patch(":id")
  @Permission(CanUpdateProjectData)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a channel in a project" })
  update(@GetCurrentUserId() userId: string, @Param("id") id: string, @Body() dto: UpdateChannelDto) {
    return this.channelService.update(userId, id, dto);
  }

  @Delete(":id")
  @Permission(CanDeleteProjectData)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a channel in a project" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
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
