import { Module } from "@nestjs/common";

import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
