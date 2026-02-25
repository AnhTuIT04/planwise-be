import { ApiProperty } from "@nestjs/swagger";
import { InvitationStatus } from "prisma/client/pg";

import { UserDto } from "@/modules/auth/dto/response/user-response.dto";
import { ResponseDto, PaginationResponseDto } from "@/common/dto/response.dto";

export class InvitationDto {
  @ApiProperty({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "Invitee user ID",
  })
  readonly inviteeId: string;

  @ApiProperty({
    type: () => UserDto,
    description: "Invitee user information",
  })
  readonly invitee: UserDto;

  @ApiProperty({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "Inviter user ID",
  })
  readonly inviterId: string;

  @ApiProperty({
    type: () => UserDto,
    description: "Inviter user information",
  })
  readonly inviter: UserDto;

  @ApiProperty({
    example: "PENDING",
    description: "Status of the invitation",
    enum: ["PENDING", "ACCEPTED", "DECLINED"],
  })
  readonly status: InvitationStatus;

  @ApiProperty({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "Role ID that will be assigned",
  })
  readonly roleId: string;

  @ApiProperty({
    example: "Member",
    description: "Role name",
  })
  readonly roleName: string;

  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Invitation creation timestamp",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(data: any) {
    this.inviteeId = data.inviteeId;
    this.invitee = new UserDto(data.invitee);
    this.inviterId = data.inviterId;
    this.inviter = new UserDto(data.inviter);
    this.status = data.status;
    this.roleId = data.roleId;
    this.roleName = data.role?.name || "";
    this.createdAt = data.createdAt;
  }
}

export class InvitationResponseDto extends ResponseDto<InvitationDto> {
  constructor(data: any, message: string = "Invitation retrieved successfully") {
    super(new InvitationDto(data), message);
  }
}

export class InvitationsListResponseDto extends PaginationResponseDto<InvitationDto> {
  constructor(
    data: InvitationDto[],
    page: number,
    limit: number,
    totalItems: number,
    message: string = "Invitations retrieved successfully",
  ) {
    super(
      data.map((invitation) => new InvitationDto(invitation)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
