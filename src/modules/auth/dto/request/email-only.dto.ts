import { IsEmail, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EmailOnlyDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email!: string;
}
