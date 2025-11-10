import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EmailOnlyDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email: string;
}
