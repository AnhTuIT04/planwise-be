import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ExchangeTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "one-time-code-123456", description: "One-time code (OTC) received after OAuth login" })
  readonly otc: string;
}
