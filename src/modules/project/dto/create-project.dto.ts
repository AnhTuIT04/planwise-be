import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Website Redesign",
    description: "Name of the project",
  })
  
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Complete redesign of company website with modern UI/UX",
    description: "Description of the project",
  })
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    example: false,
    description: "Whether this is a personal project",
    default: false,
  })
  readonly isPersonal?: boolean;
}
