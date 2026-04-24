import { IsString, Length, IsEmail, IsDefined, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email!: string;

  @IsDefined()
  @IsString()
  @Length(6, 100)
  @ApiProperty({ example: "Password123!", description: "Password (will be hashed)" })
  readonly newPassword!: string;

  @IsDefined()
  @Matches(/^\d{6}$/, {
    message: "OTP must be exactly 6 digits",
  })
  @ApiProperty({ example: "123456", description: "6-digit verification code" })
  readonly otp!: string;
}
