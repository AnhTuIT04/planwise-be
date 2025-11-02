import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  readonly fullname: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  @ApiProperty({ example: "Password123!", description: "Password (will be hashed)" })
  readonly password: string;
}
