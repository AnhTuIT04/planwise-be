import { ApiProperty } from "@nestjs/swagger";

import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "~/auth/dto/response/user-basic-response.dto";

interface AdminProjectSource {
  id: string;
  name: string;
  logoUrl: string | null;
  description: string | null;
  isPersonal: boolean;
  createdAt: Date;
  owner: { id: string; email: string; fullname: string; avatarUrl: string | null };
  _count: { members: number; sections: number; tasks: number };
}

export class AdminProjectDto {
  @ApiProperty({ description: "Project id" })
  readonly id: string;

  @ApiProperty({ description: "Project name" })
  readonly name: string;

  @ApiProperty({ description: "Project logo URL", nullable: true })
  readonly logoUrl: string | null;

  @ApiProperty({ description: "Project description", nullable: true })
  readonly description: string | null;

  @ApiProperty({ description: "Whether this is a personal workspace project" })
  readonly isPersonal: boolean;

  @ApiProperty({ type: () => UserBasicDto, description: "Project owner" })
  readonly owner: UserBasicDto;

  @ApiProperty({ description: "Number of members" })
  readonly memberCount: number;

  @ApiProperty({ description: "Number of sections" })
  readonly sectionCount: number;

  @ApiProperty({ description: "Number of tasks" })
  readonly taskCount: number;

  @ApiProperty({ description: "Timestamp of project creation", format: "date-time" })
  readonly createdAt: Date;

  constructor(project: AdminProjectSource) {
    this.id = project.id;
    this.name = project.name;
    this.logoUrl = project.logoUrl;
    this.description = project.description;
    this.isPersonal = project.isPersonal;
    this.owner = new UserBasicDto(project.owner);
    this.memberCount = project._count.members;
    this.sectionCount = project._count.sections;
    this.taskCount = project._count.tasks;
    this.createdAt = project.createdAt;
  }
}

export class AdminProjectsOffsetResponse extends OffsetPaginatedResponseDto<AdminProjectDto> {
  @ApiProperty({ type: () => [AdminProjectDto], description: "List of projects" })
  declare readonly data: AdminProjectDto[];

  constructor(projects: AdminProjectSource[], page: number, limit: number, totalItems: number, message?: string) {
    super(
      projects.map((project) => new AdminProjectDto(project)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}

class AdminProjectMemberDto {
  @ApiProperty({ type: () => UserBasicDto, description: "Member user information" })
  readonly user: UserBasicDto;

  @ApiProperty({ description: "Role of the member in the project" })
  readonly roleName: string;

  @ApiProperty({ description: "Whether the member is disabled by an admin" })
  readonly disabled: boolean;

  constructor(member: {
    user: { id: string; email: string; fullname: string; avatarUrl: string | null; disabledAt: Date | null };
    role: { name: string };
  }) {
    this.user = new UserBasicDto(member.user);
    this.roleName = member.role.name;
    this.disabled = member.user.disabledAt !== null;
  }
}

/**
 * Project detail for admins: GENERAL INFO ONLY.
 * Exposes metadata + member list — never tasks/sections content.
 */
export class AdminProjectDetailDto extends AdminProjectDto {
  @ApiProperty({ description: "Number of channels" })
  readonly channelCount: number;

  @ApiProperty({ type: () => [AdminProjectMemberDto], description: "Project members" })
  readonly members: AdminProjectMemberDto[];

  constructor(
    project: Omit<AdminProjectSource, "_count"> & {
      _count: { members: number; sections: number; tasks: number; channels: number };
      members: ConstructorParameters<typeof AdminProjectMemberDto>[0][];
    },
  ) {
    super(project);
    this.channelCount = project._count.channels;
    this.members = project.members.map((member) => new AdminProjectMemberDto(member));
  }
}

export class AdminProjectDetailResponse extends ResponseDto<AdminProjectDetailDto> {
  @ApiProperty({ type: () => AdminProjectDetailDto, description: "Project general information" })
  declare readonly data: AdminProjectDetailDto;

  constructor(project: ConstructorParameters<typeof AdminProjectDetailDto>[0], message?: string) {
    super(new AdminProjectDetailDto(project), message);
  }
}
