import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { TaskStatus } from "prisma/client";
import { ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "@/modules/auth/dto/response/user-basic-response.dto";
import { GetSubtaskQueryResult } from "../../query/get-subtask.query";

export class SubtaskDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Task id" })
  readonly id: string;

  @ApiProperty({ example: "Implement authentication", description: "Task title" })
  readonly title: string;

  @ApiProperty({ example: "TODO", description: "Task status" })
  readonly status: TaskStatus;

  @ApiProperty({ example: 20, description: "Estimated time to complete the task in minutes" })
  readonly estimate: number;

  @ApiProperty({ example: 15, description: "Time spent on the task in minutes" })
  readonly spent: number;

  @ApiPropertyOptional({
    example: "2024-07-01T12:00:00Z",
    description: "Timestamp of when the task was last started",
    format: "date-time",
    nullable: true,
  })
  readonly lastStarted: Date | null;

  @ApiProperty({ type: () => [UserBasicDto], description: "Array of assignee information objects" })
  readonly assignees: UserBasicDto[];

  @ApiProperty({ example: "2024-06-15T12:00:00Z", description: "Timestamp of task creation", format: "date-time" })
  readonly createdAt: Date;

  @ApiProperty({ example: "2024-06-20T12:00:00Z", description: "Timestamp of last task update", format: "date-time" })
  readonly updatedAt: Date;

  constructor(task: GetSubtaskQueryResult) {
    this.id = task.id;
    this.title = task.title;
    this.status = task.status;
    this.estimate = task.estimate;
    this.spent = task.spent;
    this.lastStarted = task.lastStarted;
    this.assignees = task.assignees.map((assignee) => new UserBasicDto(assignee.user));
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export class SubtaskResponseDto extends ResponseDto<SubtaskDto> {
  @ApiProperty({ type: () => SubtaskDto, description: "Subtask data" })
  declare readonly data: SubtaskDto;

  constructor(data: GetSubtaskQueryResult, message?: string) {
    super(new SubtaskDto(data), message);
  }
}
