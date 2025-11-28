import { ApiProperty } from "@nestjs/swagger";

import { PaginationResponseDto } from "@/common/dto/response.dto";
import { TaskDto } from "./task-response.dto";
import { GetTasksInProjectQueryResult } from "../../query/get-tasks-in-project.query";

export class TasksInProjectDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Section id" })
  readonly id: string;

  @ApiProperty({ example: "To Do", description: "Section name" })
  readonly name: string;

  @ApiProperty({ example: 5, description: "Task count" })
  readonly taskCount: number;

  @ApiProperty({ type: () => [TaskDto], description: "Array of tasks in the section" })
  readonly tasks: TaskDto[];

  @ApiProperty({
    example: "2024-06-15T12:00:00Z",
    description: "Timestamp of section creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(section: GetTasksInProjectQueryResult) {
    this.id = section.id;
    this.name = section.name;
    this.taskCount = section.tasks.length;
    this.tasks = section.tasks.map((t) => new TaskDto(t.task));
    this.createdAt = section.createdAt;
  }
}

export class TasksInProjectListResponseDto extends PaginationResponseDto<TasksInProjectDto> {
  @ApiProperty({ type: () => [TasksInProjectDto], description: "Array of sections with their tasks" })
  declare readonly data: TasksInProjectDto[];

  constructor(
    sections: GetTasksInProjectQueryResult[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      sections.map((section) => new TasksInProjectDto(section)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
