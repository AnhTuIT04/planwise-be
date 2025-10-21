import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSectionTaskOrderDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ["task-id-2", "task-id-1", "task-id-3"],
    description: "Array of task IDs in the new order",
    type: [String],
  })
  readonly listOfTask: string[];
}
