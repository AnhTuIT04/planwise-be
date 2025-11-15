import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";

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
    example: ["project:create", "project:delete"],
    description: "Array of permissions associated with the role",
  })
  readonly permissions: string[];

  constructor(role: { id: string; name: string; permissions: string[] }) {
    this.id = role.id;
    this.name = role.name;
    this.permissions = role.permissions;
  }
}

export class RoleResponseDto extends ResponseDto<RoleDto> {
  @ApiProperty({ type: () => RoleDto, description: "Role data" })
  declare readonly data: RoleDto;

  constructor(data: RoleDto, message?: string) {
    super(new RoleDto(data), message);
  }
}
