import { ApiProperty } from "@nestjs/swagger";

import { Project } from "prisma/client/pg";
import { ResponseDto } from "@/common/dto/response.dto";

export class ProjectBasicDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Project id" })
  readonly id: string;

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

  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Timestamp of project creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.logoUrl = project.logoUrl;
    this.createdAt = project.createdAt;
  }
}

export class ProjectBasicResponse extends ResponseDto<ProjectBasicDto> {
  @ApiProperty({ type: () => ProjectBasicDto, description: "Project data" })
  declare readonly data: ProjectBasicDto;

  constructor(data: Project, message?: string) {
    super(new ProjectBasicDto(data), message);
  }
}
