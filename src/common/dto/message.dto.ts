import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MessageResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Operation completed successfully.",
    description: "Message describing the result",
  })
  readonly message: string;
}
