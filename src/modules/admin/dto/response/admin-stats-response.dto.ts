import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "~/auth/dto/response/user-basic-response.dto";

class AdminStatsTotalsDto {
  @ApiProperty({ description: "Total registered users" })
  readonly users!: number;

  @ApiProperty({ description: "Users with a verified email" })
  readonly verifiedUsers!: number;

  @ApiProperty({ description: "Users disabled by an admin" })
  readonly disabledUsers!: number;

  @ApiProperty({ description: "Total projects" })
  readonly projects!: number;

  @ApiProperty({ description: "Personal workspace projects" })
  readonly personalProjects!: number;

  @ApiProperty({ description: "Team (non-personal) projects" })
  readonly teamProjects!: number;
}

class AdminStatsGrowthDto {
  @ApiProperty({ description: "Users created in the last 7 days" })
  readonly newUsersThisWeek!: number;

  @ApiProperty({ description: "Users created in the 7 days before that" })
  readonly newUsersLastWeek!: number;

  @ApiProperty({ description: "Projects created in the last 7 days" })
  readonly newProjectsThisWeek!: number;

  @ApiProperty({ description: "Projects created in the 7 days before that" })
  readonly newProjectsLastWeek!: number;
}

class AdminStatsDailyPointDto {
  @ApiProperty({ example: "2026-06-06", description: "Day (YYYY-MM-DD)" })
  readonly date!: string;

  @ApiProperty({ description: "Users registered that day" })
  readonly users!: number;

  @ApiProperty({ description: "Projects created that day" })
  readonly projects!: number;
}

class AdminStatsRecentUserDto extends UserBasicDto {
  @ApiProperty({ description: "Timestamp of user creation", format: "date-time" })
  readonly createdAt: Date;

  constructor(user: { id: string; email: string; fullname: string; avatarUrl: string | null; createdAt: Date }) {
    super(user);
    this.createdAt = user.createdAt;
  }
}

class AdminStatsRecentProjectDto {
  @ApiProperty({ description: "Project id" })
  readonly id: string;

  @ApiProperty({ description: "Project name" })
  readonly name: string;

  @ApiProperty({ description: "Project logo URL", nullable: true })
  readonly logoUrl: string | null;

  @ApiProperty({ description: "Whether this is a personal workspace project" })
  readonly isPersonal: boolean;

  @ApiProperty({ description: "Full name of the project owner" })
  readonly ownerName: string;

  @ApiProperty({ description: "Timestamp of project creation", format: "date-time" })
  readonly createdAt: Date;

  constructor(project: {
    id: string;
    name: string;
    logoUrl: string | null;
    isPersonal: boolean;
    owner: { fullname: string };
    createdAt: Date;
  }) {
    this.id = project.id;
    this.name = project.name;
    this.logoUrl = project.logoUrl;
    this.isPersonal = project.isPersonal;
    this.ownerName = project.owner.fullname;
    this.createdAt = project.createdAt;
  }
}

export class AdminStatsDto {
  @ApiProperty({ type: () => AdminStatsTotalsDto, description: "System-wide totals" })
  readonly totals: AdminStatsTotalsDto;

  @ApiProperty({ type: () => AdminStatsGrowthDto, description: "Week-over-week growth" })
  readonly growth: AdminStatsGrowthDto;

  @ApiProperty({ type: () => [AdminStatsDailyPointDto], description: "Daily activity for the last 30 days" })
  readonly daily: AdminStatsDailyPointDto[];

  @ApiProperty({ type: () => [AdminStatsRecentUserDto], description: "Most recent signups" })
  readonly recentUsers: AdminStatsRecentUserDto[];

  @ApiProperty({ type: () => [AdminStatsRecentProjectDto], description: "Most recently created projects" })
  readonly recentProjects: AdminStatsRecentProjectDto[];

  constructor(stats: {
    totals: AdminStatsTotalsDto;
    growth: AdminStatsGrowthDto;
    daily: AdminStatsDailyPointDto[];
    recentUsers: ConstructorParameters<typeof AdminStatsRecentUserDto>[0][];
    recentProjects: ConstructorParameters<typeof AdminStatsRecentProjectDto>[0][];
  }) {
    this.totals = stats.totals;
    this.growth = stats.growth;
    this.daily = stats.daily;
    this.recentUsers = stats.recentUsers.map((user) => new AdminStatsRecentUserDto(user));
    this.recentProjects = stats.recentProjects.map((project) => new AdminStatsRecentProjectDto(project));
  }
}

export class AdminStatsResponse extends ResponseDto<AdminStatsDto> {
  @ApiProperty({ type: () => AdminStatsDto, description: "Admin dashboard statistics" })
  declare readonly data: AdminStatsDto;

  constructor(stats: ConstructorParameters<typeof AdminStatsDto>[0], message?: string) {
    super(new AdminStatsDto(stats), message);
  }
}
