import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";

export class PermissionItemDto {
  @ApiProperty({ example: "project:update", description: "Permission identifier in resource:action form" })
  readonly permission: string;

  @ApiProperty({ example: "Update project", description: "Human-readable name" })
  readonly name: string;

  @ApiProperty({ example: "Edit the project's name, description, or logo.", description: "Permission description" })
  readonly description: string;

  constructor(permission: string, name: string, description: string) {
    this.permission = permission;
    this.name = name;
    this.description = description;
  }
}

export class PermissionsListResponse extends ResponseDto<PermissionItemDto[]> {
  @ApiProperty({ type: () => [PermissionItemDto], description: "All available project permissions" })
  declare readonly data: PermissionItemDto[];

  constructor(data: PermissionItemDto[], message?: string) {
    super(data, message);
  }
}
