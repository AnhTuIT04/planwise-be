import { ApiProperty } from "@nestjs/swagger";

import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";

export class RoleDto {
  @ApiProperty({
    example: "167167ca-9760-466d-adff-ede13db5d56a",
    description: "Unique identifier of the role",
  })
  readonly id: string;

  @ApiProperty({
    example: "admin",
    description: "Name of the role",
  })
  readonly name: string;

  @ApiProperty({
    example: false,
    description: "Whether this role is the default role",
  })
  readonly default: boolean;

  @ApiProperty({
    example: ["project:create", "project:delete"],
    description: "Array of permissions associated with the role",
  })
  readonly permissions: string[];

  constructor(role: { id: string; name: string; permissions: string; default: boolean }) {
    this.id = role.id;
    this.name = role.name;
    this.default = role.default;
    this.permissions = JSON.parse(role.permissions);
  }
}

export class RoleResponse extends ResponseDto<RoleDto> {
  @ApiProperty({ type: () => RoleDto, description: "Role data" })
  declare readonly data: RoleDto;

  constructor(role: { id: string; name: string; permissions: string; default: boolean }, message?: string) {
    super(new RoleDto(role), message);
  }
}

export class RolesOffsetResponse extends OffsetPaginatedResponseDto<RoleDto> {
  @ApiProperty({ type: () => [RoleDto], description: "Array of role data" })
  declare readonly data: RoleDto[];

  constructor(
    roles: { id: string; name: string; permissions: string; default: boolean }[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      roles.map((role) => new RoleDto(role)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
