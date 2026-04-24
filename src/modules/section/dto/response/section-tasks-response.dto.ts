import { ApiProperty } from "@nestjs/swagger";

import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";
import { TasksOffsetResponse } from "~/task/dto/response/task-response.dto";
import { GetSectionTasksQueryResult } from "../../query/get-section-tasks.query";

export class SectionTasksDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Section id" })
  readonly id: string;

  @ApiProperty({ example: "To Do", description: "Section name" })
  readonly name: string;

  @ApiProperty({ example: 5, description: "Task count" })
  readonly taskCount: number;

  @ApiProperty({ type: () => TasksOffsetResponse, description: "List of tasks in the section" })
  readonly tasks: TasksOffsetResponse;

  @ApiProperty({
    example: "2024-06-15T12:00:00Z",
    description: "Timestamp of section creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(section: GetSectionTasksQueryResult) {
    this.id = section.id;
    this.name = section.name;
    this.taskCount = section._count.tasks;
    this.tasks = new TasksOffsetResponse(
      section.tasks.data,
      section.tasks.pagination.page,
      section.tasks.pagination.limit,
      section._count.tasks,
    );
    this.createdAt = section.createdAt;
  }
}

export class SectionTasksResponse extends ResponseDto<SectionTasksDto> {
  @ApiProperty({ type: () => SectionTasksDto, description: "Section with its tasks" })
  declare readonly data: SectionTasksDto;

  constructor(data: GetSectionTasksQueryResult, message?: string) {
    super(new SectionTasksDto(data), message);
  }
}

export class SectionTasksOffsetResponse extends OffsetPaginatedResponseDto<SectionTasksDto> {
  @ApiProperty({ type: () => [SectionTasksDto], description: "Array of sections with their tasks" })
  declare readonly data: SectionTasksDto[];

  constructor(
    sections: GetSectionTasksQueryResult[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      sections.map((section) => new SectionTasksDto(section)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
