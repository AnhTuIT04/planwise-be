import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectSectionOrderDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ["section-id-2", "section-id-1", "section-id-3"],
    description: "Array of section IDs in the new order",
    type: [String],
  })
  readonly listOfSection: string[];
}
