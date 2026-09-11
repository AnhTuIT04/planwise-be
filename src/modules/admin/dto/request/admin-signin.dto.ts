import { IsString, IsEmail, Length, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdminSignInDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: "admin@example.com", description: "Admin email address", format: "email" })
  readonly email!: string;

  @IsDefined()
  @IsString()
  @Length(6, 100)
  @ApiProperty({ example: "Password123!", description: "Admin password" })
  readonly password!: string;
}
