import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TaskPersonDto {
  readonly email: string;
  readonly fullname: string | null;
  readonly avatarUrl: string | null;
}

export class TaskResponseDto {
  readonly id: string;
  readonly title: string;
  readonly description: string | null;
  readonly status: string;
  readonly priority: string | null;
  readonly startDate: Date | null;
  readonly dueDate: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly parentTaskId: string | null;
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
  readonly assignees: TaskPersonDto[];
}
