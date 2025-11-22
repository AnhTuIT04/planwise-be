import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";
import { TaskDto } from "@/modules/task/dto/response/task-response.dto";
import { GetSectionQueryResult } from "../../query/get-section.query";

export class SectionDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Section id" })
  readonly id: string;

  @ApiProperty({ example: "To Do", description: "Section name" })
  readonly name: string;

  @ApiProperty({
    type: () => [TaskDto],
    description: "Array of task belong to this section",
  })
  readonly tasks: TaskDto[];

  @ApiProperty({
    example: "2024-06-15T12:00:00Z",
    description: "Timestamp of section creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(section: GetSectionQueryResult) {
    this.id = section.id;
    this.name = section.name;

    const taskMap = new Map(section.tasksOfSection.map((task) => [task.task.id, task]));
    const taskIds = JSON.parse(section.listOfTask) as string[];
    this.tasks = taskIds
      .map((id) => taskMap.get(id))
      .filter((task) => task !== undefined)
      .map((task) => new TaskDto(task.task));

    this.createdAt = section.createdAt;
  }
}

export class SectionResponseDto extends ResponseDto<SectionDto> {
  @ApiProperty({ type: () => SectionDto, description: "Section data" })
  declare readonly data: SectionDto;

  constructor(data: GetSectionQueryResult, message?: string) {
    super(new SectionDto(data), message);
  }
}
