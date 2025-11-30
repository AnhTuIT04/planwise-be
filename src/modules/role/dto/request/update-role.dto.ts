import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray, IsBoolean } from "class-validator";

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Project Manager",
    description: "The name of the role",
  })
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    example: ["project:read", "project:write", "task:create"],
    description: "Array of permissions for this role",
  })
  readonly permissions?: string[];
}
