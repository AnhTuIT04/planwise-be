import { ApiProperty } from "@nestjs/swagger";

import { ChannelType } from "prisma/client/pg";
import { PaginationResponseDto, ResponseDto } from "@/common/dto/response.dto";

export class ChannelDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Channel id" })
  readonly id: string;

  @ApiProperty({ example: "General", description: "Channel name" })
  readonly name: string;

  @ApiProperty({ enum: ChannelType, example: ChannelType.TEXT, description: "Channel type" })
  readonly type: ChannelType;

  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Project id" })
  readonly projectId: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.projectId = data.projectId;
  }
}

export class ChannelResponseDto extends ResponseDto<ChannelDto> {
  @ApiProperty({ type: () => ChannelDto, description: "Channel data" })
  declare readonly data: ChannelDto;

  constructor(data: any, message?: string) {
    super(new ChannelDto(data), message);
  }
}

export class ChannelsListResponseDto extends PaginationResponseDto<ChannelDto> {
  @ApiProperty({ type: () => [ChannelDto], description: "Array of channels" })
  declare readonly data: ChannelDto[];

  constructor(data: any[], page: number, limit: number, totalItems: number, message?: string) {
    super(
      data.map((task) => new ChannelDto(task)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
