import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class InviteMemberDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "Role id, if not provided, default role `MEMBER` will be assigned",
  })
  readonly roleId?: string;
}
