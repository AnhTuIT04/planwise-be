import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto, OffsetPaginatedResponseDto } from "@/common/dto/response.dto";
import { UserDto } from "~/auth/dto/response/user-response.dto";
import { GetProjectQueryResult } from "../../query/get-project.query";

export class ProjectDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Project id" })
  readonly id: string;

  @ApiProperty({
    type: () => UserDto,
    description: "Owner information object",
  })
  readonly owner: UserDto;

  @ApiProperty({ example: "Website Redesign", description: "Project name" })
  readonly name: string;

  @ApiProperty({
    example: "Complete redesign...",
    description: "Detailed description",
    nullable: true,
  })
  readonly description: string | null;

  @ApiProperty({
    example: "https://example.com",
    description: "URL link",
    format: "uri",
    nullable: true,
  })
  readonly logoUrl: string | null;

  @ApiProperty({ example: false, description: "The isPersonal property" })
  readonly isPersonal: boolean;

  @ApiProperty({ example: 2, description: "Member count" })
  readonly memberCount: number;

  @ApiProperty({ example: 3, description: "Section count" })
  readonly sectionCount: number;

  @ApiProperty({ example: 5, description: "Task count" })
  readonly taskCount: number;

  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Timestamp of project creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(project: GetProjectQueryResult) {
    this.id = project.id;
    this.owner = new UserDto(project.owner);
    this.name = project.name;
    this.description = project.description;
    this.logoUrl = project.logoUrl;
    this.isPersonal = project.isPersonal;
    this.memberCount = project._count.members;
    this.sectionCount = project._count.sections;
    this.taskCount = project._count.tasks;
    this.createdAt = project.createdAt;
  }
}

export class ProjectResponse extends ResponseDto<ProjectDto> {
  @ApiProperty({ type: () => ProjectDto, description: "Project data" })
  declare readonly data: ProjectDto;

  constructor(data: GetProjectQueryResult, message?: string) {
    super(new ProjectDto(data), message);
  }
}

export class ProjectsOffsetResponse extends OffsetPaginatedResponseDto<ProjectDto> {
  @ApiProperty({ type: () => [ProjectDto], description: "Array of project data" })
  declare readonly data: ProjectDto[];

  constructor(projects: GetProjectQueryResult[], page: number, limit: number, totalItems: number, message?: string) {
    super(
      projects.map((project) => new ProjectDto(project)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
