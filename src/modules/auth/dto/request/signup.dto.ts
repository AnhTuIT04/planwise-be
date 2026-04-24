import { IsString, IsEmail, Length, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email!: string;

  @IsDefined()
  @IsString()
  @Length(6, 50)
  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  readonly fullname!: string;

  @IsDefined()
  @IsString()
  @Length(6, 100)
  @ApiProperty({ example: "Password123!", description: "Password (will be hashed)" })
  readonly password!: string;
}
