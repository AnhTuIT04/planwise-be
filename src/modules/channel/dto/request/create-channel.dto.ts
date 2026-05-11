import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsDefined } from "class-validator";

import { ChannelType } from "prisma/client/pg";

export class CreateChannelDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project this channel belongs to",
  })
  readonly projectId!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "General",
    description: "The name of the channel",
  })
  readonly name!: string;

  @IsDefined()
  @IsEnum(ChannelType)
  @ApiProperty({
    enum: ChannelType,
    example: ChannelType.TEXT,
    description: "The type of the channel",
  })
  readonly type!: ChannelType;
}
