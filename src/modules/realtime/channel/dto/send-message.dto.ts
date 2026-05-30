import { IsString } from "class-validator";

export class SendMessageDto {
  @IsString()
  channelId: string;

  @IsString()
  content: string;

  @IsString()
  tempId: string;
}
