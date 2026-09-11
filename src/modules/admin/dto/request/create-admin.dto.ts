import { IsString, IsEmail, Length, IsDefined, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAdminDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: "admin2@example.com", description: "Email of the new admin", format: "email" })
  readonly email!: string;

  @IsDefined()
  @IsString()
  @Length(6, 100)
  @ApiProperty({ example: "Password123!", description: "Password for the new admin" })
  readonly password!: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional({ example: "Jane Admin", description: "Display name of the new admin" })
  readonly fullname?: string;
}
