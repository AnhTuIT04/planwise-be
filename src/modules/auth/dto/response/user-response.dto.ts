import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";
import { RoleDto } from "@/modules/role/dto/response/role-response.dto";

export class UserBasicDto {
  @ApiProperty({
    example: "167167ca-9760-466d-adff-ede13db5d56a",
    description: "Unique identifier of the user",
  })
  readonly id: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Email address of the user",
  })
  readonly email: string;

  @ApiProperty({
    example: "John Doe",
    description: "Full name of the user",
  })
  readonly fullname: string;

  @ApiProperty({
    example: "https://placehold.co/600x400/EEE/31343C",
    description: "Avatar image URL",
    nullable: true,
  })
  readonly avatarUrl: string | null;

  constructor(user: { id: string; email: string; fullname: string; avatarUrl: string | null }) {
    this.id = user.id;
    this.email = user.email;
    this.fullname = user.fullname;
    this.avatarUrl = user.avatarUrl;
  }
}

export class UserWithRoleDto extends UserBasicDto {
  @ApiProperty({ type: () => RoleDto, description: "Role of the user" })
  readonly role: RoleDto;

  constructor(user: { id: string; email: string; fullname: string; avatarUrl: string | null; role: RoleDto }) {
    super(user);
    this.role = new RoleDto(user.role);
  }
}

export class UserDto extends UserBasicDto {
  @ApiProperty({
    example: true,
    description: "Whether the user has been verified",
  })
  readonly verified: boolean;

  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Timestamp of user creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Timestamp of last user update",
    format: "date-time",
  })
  readonly updatedAt: Date;

  constructor(user: {
    id: string;
    email: string;
    fullname: string;
    avatarUrl: string | null;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(user);
    this.verified = user.verified;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export class UserBasicResponseDto extends ResponseDto<UserBasicDto> {
  @ApiProperty({ type: () => UserBasicDto, description: "User basic information" })
  declare readonly data: UserBasicDto;

  constructor(data: UserBasicDto, message: string = "Operation completed successfully.") {
    super(new UserBasicDto(data), message);
  }
}

export class UserWithRoleResponseDto extends ResponseDto<UserWithRoleDto> {
  @ApiProperty({ type: () => UserWithRoleDto, description: "User information with role" })
  declare readonly data: UserWithRoleDto;

  constructor(data: UserWithRoleDto, message?: string) {
    super(new UserWithRoleDto(data), message);
  }
}

export class UserResponseDto extends ResponseDto<UserDto> {
  @ApiProperty({ type: () => UserDto, description: "Detailed user information" })
  declare readonly data: UserDto;

  constructor(data: UserDto, message?: string) {
    super(new UserDto(data), message);
  }
}
