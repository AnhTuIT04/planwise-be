import { ApiProperty } from "@nestjs/swagger";
import { CursorPaginationResponseDto, PaginationResponseDto, ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "@/modules/auth/dto/response/user-basic-response.dto";

class MessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  channelId: string;

  @ApiProperty({ type: () => UserBasicDto })
  sender: UserBasicDto;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.channelId = data.channelId;
    this.sender = new UserBasicDto(data.sender);
    this.content = data.content;
    this.createdAt = data.createdAt;
  }
}

export class MessagesListResponseDto extends CursorPaginationResponseDto<MessageDto> {
  @ApiProperty({ type: () => [MessageDto], description: "Array of messages" })
  declare readonly data: MessageDto[];

  constructor(data: any[], nextCursor: string | null, message?: string) {
    super(
      data.map((task) => new MessageDto(task)),
      nextCursor,
      message,
    );
  }
}
