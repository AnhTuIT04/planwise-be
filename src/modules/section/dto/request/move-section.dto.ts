import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class MoveSectionDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({
    example: 1,
    description: "The index to move the section to (0-based)",
  })
  readonly moveTo: number;
}
