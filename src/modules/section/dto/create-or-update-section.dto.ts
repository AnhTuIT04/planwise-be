import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrUpdateSectionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Work", description: "The name of the section" })
  name: string;
}
