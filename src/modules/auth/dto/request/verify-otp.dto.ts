import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @ApiProperty({ example: "123456", description: "6-digit verification code" })
  readonly otp: string;
}
