import { IsOptional, IsString, IsUrl } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Website Redesign",
    description: "Name of the project",
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Complete redesign of company website with modern UI/UX",
    description: "Description of the project",
  })
  readonly description?: string;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    example: "https://example.com/logo.png",
    description: "URL of the project logo",
  })
  readonly logoUrl?: string;
}
