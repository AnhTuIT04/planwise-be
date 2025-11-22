import { ApiProperty } from "@nestjs/swagger";

import { DefaultRole } from "@/common/enum/default-role.enum";
import { UserWithRoleDto } from "@/modules/auth/dto/response/user-response.dto";
import { SectionDto } from "@/modules/section/dto/response/section-response.dto";
import { RoleDto } from "@/modules/role/dto/response/role-response.dto";
import { ResponseDto, PaginationResponseDto } from "@/common/dto/response.dto";
import { GetProjectQueryResult } from "../../query/get-project.query";

export class ProjectDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Project id" })
  readonly id: string;

  @ApiProperty({
    type: () => UserWithRoleDto,
    description: "Owner information object",
    nullable: true,
  })
  readonly owner: UserWithRoleDto | null;

  @ApiProperty({ type: () => [UserWithRoleDto], description: "Array of member information objects" })
  readonly members: UserWithRoleDto[];

  @ApiProperty({ type: () => [RoleDto], description: "Array of role information objects" })
  readonly roles: RoleDto[];

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

  @ApiProperty({ type: [SectionDto], description: "Array of sections objects" })
  readonly sections: SectionDto[];

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

    // Map owner
    const owner = project.memberships.find((member) => member.role.name === DefaultRole.OWNER);
    this.owner = owner ? new UserWithRoleDto(owner.user, owner.role) : null;
    // Map members
    this.members = project.memberships.map((membership) => new UserWithRoleDto(membership.user, membership.role));
    // Map roles
    this.roles = project.roles.map((role) => new RoleDto(role));

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
      .map((section) => new SectionDto(section));

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

  constructor(data: GetProjectQueryResult, message?: string) {
    super(new ProjectDto(data), message);
  }
}

export class ProjectsListResponseDto extends PaginationResponseDto<ProjectDto> {
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
