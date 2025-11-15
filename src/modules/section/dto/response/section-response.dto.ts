import { ApiProperty } from "@nestjs/swagger";

import { PriorityLevel, TaskStatus } from "prisma/client";
import { ResponseDto, PaginationResponseDto } from "@/common/dto/response.dto";
import { TaskDto } from "@/modules/task/dto/response/task-response.dto";
import { UserBasicDto } from "@/modules/auth/dto/response/user-response.dto";

export class SectionBasicDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Section id" })
  readonly id: string;

  @ApiProperty({ example: "To Do", description: "Section name" })
  readonly name: string;

  @ApiProperty({
    example: "['550e8400-e29b-41d4-a716-446655440000']",
    description: "Array of task ids in this section",
  })
  readonly tasks: string[];

  @ApiProperty({
    example: "2024-06-15T12:00:00Z",
    description: "Timestamp of section creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(section?: { id: string; name: string; listOfTask: string; createdAt: Date }) {
    if (!section) return;

    this.id = section.id;
    this.name = section.name;
    this.tasks = JSON.parse(section.listOfTask) as string[];
    this.createdAt = section.createdAt;
  }
}

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

  constructor(section?: {
    id: string;
    name: string;
    listOfTask: string;
    createdAt: Date;
    tasksOfSection: {
      task: {
        id: string;
        description: string | null;
        createdAt: Date;
        title: string;
        status: TaskStatus;
        priority: PriorityLevel | null;
        timeEstimate: number;
        timeSpent: number;
        lastStarted: Date | null;
        deadline: Date | null;
        updatedAt: Date;
        parentTaskId: string | null;
        assignees: { user: UserBasicDto }[];
        supervisor: UserBasicDto | null;
        subtasks: {
          id: string;
          description: string | null;
          createdAt: Date;
          title: string;
          status: TaskStatus;
          priority: PriorityLevel | null;
          timeEstimate: number;
          timeSpent: number;
          lastStarted: Date | null;
          deadline: Date | null;
          updatedAt: Date;
          parentTaskId: string | null;
          assignees: { user: UserBasicDto }[];
          supervisor: UserBasicDto | null;
        }[];
      };
    }[];
  }) {
    if (!section) return;

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

export class SectionBasicResponseDto extends ResponseDto<SectionBasicDto> {
  @ApiProperty({ type: () => SectionBasicDto, description: "Section data" })
  declare readonly data: SectionBasicDto;

  constructor(data: { id: string; name: string; listOfTask: string; createdAt: Date }, message?: string) {
    super(new SectionBasicDto(data), message);
  }
}

export class SectionResponseDto extends ResponseDto<SectionDto> {
  @ApiProperty({ type: () => SectionDto, description: "Section data" })
  declare readonly data: SectionDto;

  constructor(
    data: {
      id: string;
      name: string;
      listOfTask: string;
      createdAt: Date;
      tasksOfSection: {
        task: {
          id: string;
          description: string | null;
          createdAt: Date;
          title: string;
          status: TaskStatus;
          priority: PriorityLevel | null;
          timeEstimate: number;
          timeSpent: number;
          lastStarted: Date | null;
          deadline: Date | null;
          updatedAt: Date;
          parentTaskId: string | null;
          assignees: { user: UserBasicDto }[];
          supervisor: UserBasicDto | null;
          subtasks: {
            id: string;
            description: string | null;
            createdAt: Date;
            title: string;
            status: TaskStatus;
            priority: PriorityLevel | null;
            timeEstimate: number;
            timeSpent: number;
            lastStarted: Date | null;
            deadline: Date | null;
            updatedAt: Date;
            parentTaskId: string | null;
            assignees: { user: UserBasicDto }[];
            supervisor: UserBasicDto | null;
          }[];
        };
      }[];
    },
    message?: string,
  ) {
    super(new SectionDto(data), message);
  }
}

export class SectionsListResponseDto extends PaginationResponseDto<SectionDto> {
  constructor(
    sections: {
      id: string;
      name: string;
      listOfTask: string;
      createdAt: Date;
      tasksOfSection: {
        task: {
          id: string;
          description: string | null;
          createdAt: Date;
          title: string;
          status: TaskStatus;
          priority: PriorityLevel | null;
          timeEstimate: number;
          timeSpent: number;
          lastStarted: Date | null;
          deadline: Date | null;
          updatedAt: Date;
          parentTaskId: string | null;
          assignees: { user: UserBasicDto }[];
          supervisor: UserBasicDto | null;
          subtasks: {
            id: string;
            description: string | null;
            createdAt: Date;
            title: string;
            status: TaskStatus;
            priority: PriorityLevel | null;
            timeEstimate: number;
            timeSpent: number;
            lastStarted: Date | null;
            deadline: Date | null;
            updatedAt: Date;
            parentTaskId: string | null;
            assignees: { user: UserBasicDto }[];
            supervisor: UserBasicDto | null;
          }[];
        };
      }[];
    }[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      sections.map((section) => new SectionDto(section)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
