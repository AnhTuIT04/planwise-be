import { ApiProperty } from "@nestjs/swagger";

import { PaginationResponseDto, ResponseDto } from "@/common/dto/response.dto";

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

export class UserBasicResponseDto extends ResponseDto<UserBasicDto> {
  @ApiProperty({ type: () => UserBasicDto, description: "User basic information" })
  declare readonly data: UserBasicDto;

  constructor(
    user: { id: string; email: string; fullname: string; avatarUrl: string | null },
    message: string = "Operation completed successfully.",
  ) {
    super(new UserBasicDto(user), message);
  }
}

export class UsersBasicListResponseDto extends PaginationResponseDto<UserBasicDto> {
  @ApiProperty({ type: () => [UserBasicDto], description: "Array of user basic information" })
  declare readonly data: UserBasicDto[];

  constructor(
    users: { id: string; email: string; fullname: string; avatarUrl: string | null }[],
    page: number,
    limit: number,
    totalItems: number,
    message?: string,
  ) {
    super(
      users.map((user) => new UserBasicDto(user)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
