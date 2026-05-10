import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDefined } from "class-validator";

export class UpdateChannelDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "General",
    description: "The name of the channel",
  })
  readonly name!: string;
}
