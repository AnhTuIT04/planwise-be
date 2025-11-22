import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project the task belongs to",
  })
  readonly projectId: string;
}
