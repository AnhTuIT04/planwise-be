import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray, IsDefined, ArrayNotEmpty, Matches, IsUUID } from "class-validator";

export class CreateRoleDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "Project Manager",
    description: "The name of the role",
  })
  readonly name!: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[a-z-]+:[a-z-]+$/, {
    each: true,
    message: "Permission must be in format resource:action",
  })
  @ApiPropertyOptional({
    example: ["project:read", "project:write", "task:create"],
    description: "Array of permissions for this role",
  })
  readonly permissions: string[] = [];

  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project this role belongs to",
  })
  readonly projectId!: string;
}
