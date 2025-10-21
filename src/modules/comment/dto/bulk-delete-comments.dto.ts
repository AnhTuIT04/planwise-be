import { IsArray, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BulkDeleteCommentsDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    example: ["550e8400-e29b-41d4-a716-446655440000", "550e8400-e29b-41d4-a716-446655440001"],
    description: "Array of comment IDs to delete",
    type: [String],
  })
  readonly commentIds: string[];
}
