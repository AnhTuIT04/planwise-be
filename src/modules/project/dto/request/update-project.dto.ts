import { IsString, IsOptional, IsArray } from "class-validator";
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
  @IsString()
  @ApiPropertyOptional({
    example: "https://example.com/logo.png",
    description: "URL of the project logo",
  })
  readonly logoUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    example: ["section-id-2", "section-id-1", "section-id-3"],
    description: "Array of section IDs in the new order",
  })
  readonly listOfSection?: string[];
}
