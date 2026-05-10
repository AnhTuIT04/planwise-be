import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { PriorityLevel, TaskStatus, IntegrationProvider } from "prisma/client/pg";
import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "~/auth/dto/response/user-basic-response.dto";
import { ProjectBasicDto } from "~/project/dto/response/project-basic-response.dto";
import { SubtaskDto } from "~/subtask/dto/response/subtask-response.dto";
import { GetTaskQueryResult } from "../../query/get-task.query";

export class TaskDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Task id" })
  readonly id: string;

  @ApiProperty({ example: "Implement authentication", description: "Task title" })
  readonly title: string;

  @ApiPropertyOptional({ example: "Detailed task description", description: "Task description", nullable: true })
  readonly description: string | null;

  @ApiProperty({ example: "TODO", description: "Task status" })
  readonly status: TaskStatus;

  @ApiPropertyOptional({ example: "NORMAL", description: "Task priority level", nullable: true })
  readonly priority: PriorityLevel;

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
    type: () => ProjectBasicDto,
    description: "Project information object",
    nullable: true,
  })
  readonly originalProject: ProjectBasicDto | null;

  @ApiProperty({ example: true, description: "Indicates if the task can be imported to my-task" })
  readonly canImport: boolean;

  @ApiProperty({ example: true, description: "Indicates if the task has been imported to my-task" })
  readonly isImported: boolean;

  @ApiProperty({ type: () => UserBasicDto, description: "Supervisor information object", nullable: true })
  readonly supervisor: UserBasicDto | null;

  @ApiProperty({ type: () => [UserBasicDto], description: "Array of assignee information objects" })
  readonly assignees: UserBasicDto[];

  @ApiPropertyOptional({ type: () => [SubtaskDto], description: "Array of sub-task objects" })
  readonly subtasks: SubtaskDto[];

  @ApiPropertyOptional({ example: "NOTION", description: "Provider the task was imported from", enum: IntegrationProvider, nullable: true })
  readonly importedFromProvider: IntegrationProvider | null;

  @ApiPropertyOptional({ example: "notion-page-id", description: "Notion page id if imported from Notion", nullable: true })
  readonly notionPageId: string | null;

  @ApiPropertyOptional({ example: "notion-database-id", description: "Notion database id if imported from Notion", nullable: true })
  readonly notionDatabaseId: string | null;

  @ApiProperty({ example: "2024-06-15T12:00:00Z", description: "Timestamp of task creation", format: "date-time" })
  readonly createdAt: Date;

  @ApiProperty({ example: "2024-06-20T12:00:00Z", description: "Timestamp of last task update", format: "date-time" })
  readonly updatedAt: Date;

  constructor(task: GetTaskQueryResult) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.priority = task.priority;
    this.estimate = task.estimate;
    this.spent = task.spent;
    this.lastStarted = task.lastStarted;
    this.deadline = task.deadline;
    this.originalProject = task.originalProject ? new ProjectBasicDto(task.originalProject) : null;
    this.canImport = task.canImport;
    this.isImported = task.isImported;
    this.supervisor = task.supervisor ? new UserBasicDto(task.supervisor) : null;
    this.assignees = task.assignees.map((assignee) => new UserBasicDto(assignee.user));
    this.subtasks = task.subtasks.map((subtask) => new SubtaskDto(subtask));
    this.importedFromProvider = task.importedFromProvider;
    this.notionPageId = task.notionPageId;
    this.notionDatabaseId = task.notionDatabaseId;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export class TaskResponse extends ResponseDto<TaskDto> {
  @ApiProperty({ type: () => TaskDto, description: "Task data" })
  declare readonly data: TaskDto;

  constructor(data: GetTaskQueryResult, message?: string) {
    super(new TaskDto(data), message);
  }
}

export class TasksOffsetResponse extends OffsetPaginatedResponseDto<TaskDto> {
  @ApiProperty({ type: () => [TaskDto], description: "Array of task data" })
  declare readonly data: TaskDto[];

  constructor(data: GetTaskQueryResult[], page: number, limit: number, totalItems: number, message?: string) {
    super(
      data.map((task) => new TaskDto(task)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
