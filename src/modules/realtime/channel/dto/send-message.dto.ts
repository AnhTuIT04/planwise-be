import { IsEnum, IsString } from "class-validator";
import { ContentType } from "prisma/client/mongo";

export class SendMessageDto {
  @IsString()
  channelId: string;

  @IsString()
  content: string;

  @IsEnum(ContentType)
  contentType: ContentType;

  @IsString()
  tempId: string;
}
