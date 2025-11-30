import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Project Manager",
    description: "The name of the role",
  })
  readonly name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    example: ["project:read", "project:write", "task:create"],
    description: "Array of permissions for this role",
  })
  readonly permissions?: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project this role belongs to",
  })
  readonly projectId: string;
}
