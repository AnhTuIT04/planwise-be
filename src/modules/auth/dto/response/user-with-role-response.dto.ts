import { ApiProperty } from "@nestjs/swagger";

import { PaginationResponseDto, ResponseDto } from "@/common/dto/response.dto";
import { RoleDto } from "@/modules/role/dto/response/role-response.dto";
import { UserBasicDto } from "./user-basic-response.dto";

export class UserWithRoleDto extends UserBasicDto {
  @ApiProperty({ type: () => RoleDto, description: "Role of the user" })
  readonly role: RoleDto;

  constructor(user: {
    user: {
      id: string;
      email: string;
      fullname: string;
      avatarUrl: string | null;
    };
    role: {
      id: string;
      name: string;
      permissions: string;
      default: boolean;
    };
  }) {
    super(user.user);
    this.role = new RoleDto(user.role);
  }
}

export class UserWithRoleResponseDto extends ResponseDto<UserWithRoleDto> {
  @ApiProperty({ type: () => UserWithRoleDto, description: "User information with role" })
  declare readonly data: UserWithRoleDto;

  constructor(
    user: {
      user: {
        id: string;
        email: string;
        password: string | null;
        fullname: string;
        avatarUrl: string | null;
        verified: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
      role: {
        id: string;
        name: string;
        permissions: string;
        default: boolean;
      };
    },
    message?: string,
  ) {
    super(new UserWithRoleDto(user), message);
  }
}

export class UsersWithRoleListResponseDto extends PaginationResponseDto<UserWithRoleDto> {
  @ApiProperty({ type: () => [UserWithRoleDto], description: "Array of user information with roles" })
  declare readonly data: UserWithRoleDto[];

  constructor(
    users: {
      user: {
        id: string;
        email: string;
        fullname: string;
        avatarUrl: string | null;
      };
      role: {
        id: string;
        name: string;
        permissions: string;
        default: boolean;
      };
    }[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      users.map((user) => new UserWithRoleDto(user)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
