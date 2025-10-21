import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TaskPersonDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "User email",
  })
  readonly email: string;

  @ApiPropertyOptional({
    example: "John Doe",
    description: "User name",
  })
  readonly name: string | null;

  @ApiPropertyOptional({
    example: "https://example.com/avatar.jpg",
    description: "User avatar URL",
  })
  readonly avatarUrl: string | null;
}

export class TaskResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Unique identifier of the task",
  })
  readonly id: string;

  @ApiProperty({
    example: "Fix login bug",
    description: "Title of the task",
  })
  readonly title: string;

  @ApiPropertyOptional({
    example: "Users can't login with Google OAuth",
    description: "Description of the task",
  })
  readonly description: string | null;

  @ApiProperty({
    example: "TODO",
    description: "Task status",
    enum: ["TODO", "IN_PROGRESS", "DONE", "DELAYED"],
  })
  readonly status: string;

  @ApiPropertyOptional({
    example: "HIGH",
    description: "Task priority",
    enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
  })
  readonly priority: string | null;

  @ApiPropertyOptional({
    example: "2023-10-19T10:30:00.000Z",
    description: "Task start date",
  })
  readonly startDate: Date | null;

  @ApiPropertyOptional({
    example: "2023-10-25T10:30:00.000Z",
    description: "Task due date",
  })
  readonly dueDate: Date | null;

  @ApiProperty({
    example: "2023-10-19T10:30:00.000Z",
    description: "Task creation timestamp",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "2023-10-19T10:30:00.000Z",
    description: "Task last update timestamp",
  })
  readonly updatedAt: Date;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Section ID this task belongs to",
  })
  readonly sectionId: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Project ID this task belongs to",
  })
  readonly projectId: string;

  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Parent task ID (for subtasks)",
  })
  readonly parentTaskId: string | null;

  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Supervisor user ID",
  })
  readonly supervisorId: string | null;



  // @ApiProperty({
  //   example: 2,
  //   description: "Number of subtasks",
  // })
  // readonly subtaskCount: number;

  // @ApiProperty({
  //   example: 3,
  //   description: "Number of comments",
  // })
  // readonly commentCount: number;
}

export class TaskWithAssigneesResponseDto extends TaskResponseDto {
  @ApiProperty({
    type: [TaskPersonDto],
    description: "Users assigned to this task",
  })
  readonly assignees: TaskPersonDto[];
}
