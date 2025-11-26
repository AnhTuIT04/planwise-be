import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "To Do",
    description: "The name of the section",
    required: false,
  })
  readonly name?: string;
}
