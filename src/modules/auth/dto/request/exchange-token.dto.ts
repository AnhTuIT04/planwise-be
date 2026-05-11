import { IsString, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ExchangeTokenDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ example: "one-time-code-123456", description: "One-time code (OTC) received after OAuth login" })
  readonly otc!: string;
}
