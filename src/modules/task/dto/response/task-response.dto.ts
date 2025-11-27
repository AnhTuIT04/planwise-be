import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { PriorityLevel, TaskStatus } from "prisma/client";
import { ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "@/modules/auth/dto/response/user-basic-response.dto";
import { GetTaskQueryResult } from "../../query/get-task.query";

export class TaskDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Task id" })
  readonly id: string;

  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Parent Task id", nullable: true })
  readonly parentTaskId: string | null;

  @ApiProperty({ example: "Implement authentication", description: "Task title" })
  readonly title: string;

  @ApiPropertyOptional({ example: "Detailed task description", description: "Task description", nullable: true })
  readonly description: string | null;

  @ApiProperty({ example: "TODO", description: "Task status" })
  readonly status: TaskStatus;

  @ApiPropertyOptional({ example: "NORMAL", description: "Task priority level", nullable: true })
  readonly priority: PriorityLevel | null;

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

  @ApiPropertyOptional({
    example: "2024-07-15T12:00:00Z",
    description: "Deadline for the task",
    format: "date-time",
    nullable: true,
  })
  readonly deadline: Date | null;

  @ApiProperty({
    example: "aam",
    description: "position string for ordering tasks",
    format: "string",
    nullable: false,
  })
  readonly position: string;

  // TODO: add comment latter

  @ApiProperty({ type: () => UserBasicDto, description: "Supervisor information object", nullable: true })
  readonly supervisor: UserBasicDto | null;

  @ApiProperty({ type: () => [UserBasicDto], description: "Array of assignee information objects" })
  readonly assignees: UserBasicDto[];

  @ApiPropertyOptional({ type: () => [TaskDto], description: "Array of sub-task objects" })
  readonly subtasks: TaskDto[];

  @ApiProperty({ example: "2024-06-15T12:00:00Z", description: "Timestamp of task creation", format: "date-time" })
  readonly createdAt: Date;

  @ApiProperty({ example: "2024-06-20T12:00:00Z", description: "Timestamp of last task update", format: "date-time" })
  readonly updatedAt: Date;

  constructor(task: GetTaskQueryResult) {
    this.id = task.id;
    this.parentTaskId = task.parentTaskId;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.priority = task.priority;
    this.estimate = task.estimate;
    this.spent = task.spent;
    this.lastStarted = task.lastStarted;
    this.deadline = task.deadline;
    this.supervisor = task.supervisor ? new UserBasicDto(task.supervisor) : null;
    this.assignees = task.assignees.map((assignee) => new UserBasicDto(assignee.user));
    this.subtasks = task.subtasks.map((subtask) => new TaskDto({ ...subtask, subtasks: [] }));
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export class TaskResponseDto extends ResponseDto<TaskDto> {
  @ApiProperty({ type: () => TaskDto, description: "Task data" })
  declare readonly data: TaskDto;

  constructor(data: GetTaskQueryResult, message?: string) {
    super(new TaskDto(data), message);
  }
}
