import { IsDefined, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class InviteMemberEmailDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: "user@example.com", description: "Email address", format: "email" })
  readonly email!: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "Role id, if not provided, default role `MEMBER` will be assigned",
  })
  readonly roleId?: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ example: "Project Alpha", description: "Name of the project" })
  readonly projectName!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ example: "Alice Johnson", description: "Name of the inviter" })
  readonly inviterName!: string;
}
