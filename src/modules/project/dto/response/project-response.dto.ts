import { ApiProperty } from "@nestjs/swagger";

import { Project, Section } from "prisma/client";
import { UserBasicDto } from "@/modules/auth/dto/response/user-response.dto";
import { SectionBasicDto } from "@/modules/section/dto/response/section-response.dto";
import { ResponseDto, PaginationResponseDto } from "@/common/dto/response.dto";

export class ProjectDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Project id" })
  readonly id: string;

  @ApiProperty({ type: () => UserBasicDto, description: "Owner information object" })
  readonly owner: UserBasicDto;

  @ApiProperty({ type: () => [UserBasicDto], description: "Array of member information objects" })
  readonly members: UserBasicDto[];

  @ApiProperty({ example: "Website Redesign", description: "Project name" })
  readonly name: string;

  @ApiProperty({
    example: "Complete redesign...",
    description: "Detailed description",
    nullable: true,
  })
  readonly description: string | null;

  @ApiProperty({ example: "https://example.com", description: "URL link", format: "uri" })
  readonly logoUrl: string | null;

  @ApiProperty({ example: false, description: "The isPersonal property" })
  readonly isPersonal: boolean;

  @ApiProperty({ type: [SectionBasicDto], description: "Array of sections objects" })
  readonly sections: SectionBasicDto[];

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

  // TODO: add role later
  constructor(
    project: Project & {
      owner: UserBasicDto;
      memberships: { user: UserBasicDto }[];
      sections: Pick<Section, "id" | "name" | "listOfTask" | "createdAt">[];
    },
  ) {
    this.id = project.id;
    this.owner = new UserBasicDto(project.owner);
    this.members = project.memberships.map((membership) => new UserBasicDto(membership.user));
    this.name = project.name;
    this.description = project.description;
    this.logoUrl = project.logoUrl;
    this.isPersonal = project.isPersonal;

    // Sort sections according to the order in sectionIds
    const sectionMap = new Map(project.sections.map((section) => [section.id, section]));
    const sectionIds = JSON.parse(project.listOfSection) as string[];
    this.sections = sectionIds
      .map((id) => sectionMap.get(id))
      .filter((section) => section !== undefined)
      .map((section) => new SectionBasicDto(section));

    this.sectionCount = project.sections.length;
    this.taskCount = project.sections.reduce((total, section) => {
      const tasks = JSON.parse(section.listOfTask) as string[];
      return total + tasks.length;
    }, 0);
    this.createdAt = project.createdAt;
  }
}

export class ProjectResponseDto extends ResponseDto<ProjectDto> {
  @ApiProperty({ type: () => ProjectDto, description: "Project data" })
  declare readonly data: ProjectDto;

  constructor(
    data: Project & {
      owner: UserBasicDto;
      memberships: { user: UserBasicDto }[];
      sections: Pick<Section, "id" | "name" | "listOfTask" | "createdAt">[];
    },
    message: string = "Operation completed successfully.",
  ) {
    super(new ProjectDto(data), message);
  }
}

export class ProjectsListResponseDto extends PaginationResponseDto<ProjectDto> {
  constructor(
    projects: (Project & {
      owner: UserBasicDto;
      memberships: { user: UserBasicDto }[];
      sections: Pick<Section, "id" | "name" | "listOfTask" | "createdAt">[];
    })[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      projects.map((project) => new ProjectDto(project)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
