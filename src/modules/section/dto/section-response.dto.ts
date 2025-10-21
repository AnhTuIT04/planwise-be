import { ApiProperty } from "@nestjs/swagger";

export class SectionResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Unique identifier of the section",
  })
  readonly id: string;

  @ApiProperty({
    example: "To Do",
    description: "Name of the section",
  })
  readonly name: string;

  @ApiProperty({
    example: ["task-id-1", "task-id-2"],
    description: "Array of task IDs in order",
    type: String,
  })
  readonly listOfTask: string;

  @ApiProperty({
    example: "2023-10-19T10:30:00.000Z",
    description: "Creation timestamp",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Project ID this section belongs to",
  })
  readonly projectId: string;
}
