import { ApiProperty } from "@nestjs/swagger";

import { OffsetPaginatedResponseDto, ResponseDto } from "@/common/dto/response.dto";
import { UserBasicDto } from "./user-basic-response.dto";

export class UserDto extends UserBasicDto {
  @ApiProperty({
    example: true,
    description: "Whether the user has been verified",
  })
  readonly verified: boolean;

  @ApiProperty({
    example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    description: "Personal project id of the user",
  })
  readonly workspaceId: string;

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
    workspaceId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(user);
    this.verified = user.verified;
    this.workspaceId = user.workspaceId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export class UserResponse extends ResponseDto<UserDto> {
  @ApiProperty({ type: () => UserDto, description: "Detailed user information" })
  declare readonly data: UserDto;

  constructor(
    data: {
      id: string;
      email: string;
      fullname: string;
      avatarUrl: string | null;
      verified: boolean;
      workspaceId: string;
      createdAt: Date;
      updatedAt: Date;
    },
    message?: string,
  ) {
    super(new UserDto(data), message);
  }
}

export class UsersOffsetResponse extends OffsetPaginatedResponseDto<UserDto> {
  @ApiProperty({ type: () => [UserDto], description: "List of users" })
  declare readonly data: UserDto[];

  constructor(
    users: {
      id: string;
      email: string;
      fullname: string;
      avatarUrl: string | null;
      verified: boolean;
      workspaceId: string;
      createdAt: Date;
      updatedAt: Date;
    }[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      users.map((user) => new UserDto(user)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
