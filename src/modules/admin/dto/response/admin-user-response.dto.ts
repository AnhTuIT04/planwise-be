import { ApiProperty } from "@nestjs/swagger";

import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";

interface AdminUserSource {
  id: string;
  email: string;
  fullname: string;
  avatarUrl: string | null;
  verified: boolean;
  disabledAt: Date | null;
  createdAt: Date;
  _count: { ownedProjects: number; memberships: number };
}

export class AdminUserDto {
  @ApiProperty({ description: "User id" })
  readonly id: string;

  @ApiProperty({ description: "User email" })
  readonly email: string;

  @ApiProperty({ description: "User full name" })
  readonly fullname: string;

  @ApiProperty({ description: "Avatar URL", nullable: true })
  readonly avatarUrl: string | null;

  @ApiProperty({ description: "Whether the user verified their email" })
  readonly verified: boolean;

  @ApiProperty({ description: "When the user was disabled by an admin (null = active)", nullable: true })
  readonly disabledAt: Date | null;

  @ApiProperty({ description: "Number of projects the user owns" })
  readonly ownedProjectCount: number;

  @ApiProperty({ description: "Number of projects the user is a member of" })
  readonly membershipCount: number;

  @ApiProperty({ description: "Timestamp of user creation", format: "date-time" })
  readonly createdAt: Date;

  constructor(user: AdminUserSource) {
    this.id = user.id;
    this.email = user.email;
    this.fullname = user.fullname;
    this.avatarUrl = user.avatarUrl;
    this.verified = user.verified;
    this.disabledAt = user.disabledAt;
    this.ownedProjectCount = user._count.ownedProjects;
    this.membershipCount = user._count.memberships;
    this.createdAt = user.createdAt;
  }
}

export class AdminUsersOffsetResponse extends OffsetPaginatedResponseDto<AdminUserDto> {
  @ApiProperty({ type: () => [AdminUserDto], description: "List of users" })
  declare readonly data: AdminUserDto[];

  constructor(users: AdminUserSource[], page: number, limit: number, totalItems: number, message?: string) {
    super(
      users.map((user) => new AdminUserDto(user)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}

class AdminUserProjectDto {
  @ApiProperty({ description: "Project id" })
  readonly id: string;

  @ApiProperty({ description: "Project name" })
  readonly name: string;

  @ApiProperty({ description: "Project logo URL", nullable: true })
  readonly logoUrl: string | null;

  @ApiProperty({ description: "Whether this is a personal workspace project" })
  readonly isPersonal: boolean;

  @ApiProperty({ description: "Role of the user in the project" })
  readonly roleName: string;

  @ApiProperty({ description: "Whether the user owns the project" })
  readonly isOwner: boolean;

  constructor(project: {
    id: string;
    name: string;
    logoUrl: string | null;
    isPersonal: boolean;
    roleName: string;
    isOwner: boolean;
  }) {
    this.id = project.id;
    this.name = project.name;
    this.logoUrl = project.logoUrl;
    this.isPersonal = project.isPersonal;
    this.roleName = project.roleName;
    this.isOwner = project.isOwner;
  }
}

export class AdminUserDetailDto extends AdminUserDto {
  @ApiProperty({ description: "Timestamp of last user update", format: "date-time" })
  readonly updatedAt: Date;

  @ApiProperty({ description: "Connected OAuth providers", example: ["GOOGLE"], type: [String] })
  readonly oauthProviders: string[];

  @ApiProperty({ type: () => [AdminUserProjectDto], description: "Projects the user belongs to (general info only)" })
  readonly projects: AdminUserProjectDto[];

  constructor(
    user: AdminUserSource & {
      updatedAt: Date;
      oauthAccounts: { provider: string }[];
      memberships: {
        role: { name: string };
        project: { id: string; name: string; logoUrl: string | null; isPersonal: boolean; ownerId: string };
      }[];
    },
  ) {
    super(user);
    this.updatedAt = user.updatedAt;
    this.oauthProviders = user.oauthAccounts.map((account) => account.provider);
    this.projects = user.memberships.map(
      (membership) =>
        new AdminUserProjectDto({
          id: membership.project.id,
          name: membership.project.name,
          logoUrl: membership.project.logoUrl,
          isPersonal: membership.project.isPersonal,
          roleName: membership.role.name,
          isOwner: membership.project.ownerId === user.id,
        }),
    );
  }
}

export class AdminUserDetailResponse extends ResponseDto<AdminUserDetailDto> {
  @ApiProperty({ type: () => AdminUserDetailDto, description: "Detailed user information" })
  declare readonly data: AdminUserDetailDto;

  constructor(user: ConstructorParameters<typeof AdminUserDetailDto>[0], message?: string) {
    super(new AdminUserDetailDto(user), message);
  }
}
