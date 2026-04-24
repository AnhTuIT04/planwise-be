import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "To Do",
    description: "The name of the section",
  })
  readonly name?: string;
}
