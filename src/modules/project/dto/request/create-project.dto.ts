import { IsDefined, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProjectDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "Website Redesign",
    description: "Name of the project",
  })
  readonly name!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Complete redesign of company website with modern UI/UX",
    description: "Description of the project",
  })
  readonly description?: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: "Avatar URL must be a valid URL" })
  @ApiPropertyOptional({
    example: "https://example.com/logo.png",
    description: "URL of the project logo",
  })
  readonly logoUrl?: string;
}
