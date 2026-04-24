import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsUUID } from "class-validator";

export class UpdateSubtaskAssigneesDto {
  @IsDefined()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    type: [String],
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    description: "Array of user IDs to assign to this task",
  })
  readonly assigneeIds!: string[];
}
