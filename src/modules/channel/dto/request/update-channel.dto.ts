import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "General",
    description: "The name of the channel",
  })
  readonly name: string;
}
