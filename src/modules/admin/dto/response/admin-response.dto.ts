import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "@/common/dto/response.dto";

export class AdminDto {
  @ApiProperty({ example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", description: "Admin id" })
  readonly id: string;

  @ApiProperty({ example: "admin@example.com", description: "Admin email" })
  readonly email: string;

  @ApiProperty({ example: "Administrator", description: "Admin display name" })
  readonly fullname: string;

  constructor(admin: { id: string; email: string; fullname: string }) {
    this.id = admin.id;
    this.email = admin.email;
    this.fullname = admin.fullname;
  }
}

export class AdminResponse extends ResponseDto<AdminDto> {
  @ApiProperty({ type: () => AdminDto, description: "Admin account information" })
  declare readonly data: AdminDto;

  constructor(admin: { id: string; email: string; fullname: string }, message?: string) {
    super(new AdminDto(admin), message);
  }
}

export class AdminListItemDto extends AdminDto {
  @ApiProperty({ description: "Timestamp of admin creation", format: "date-time" })
  readonly createdAt: Date;

  constructor(admin: { id: string; email: string; fullname: string; createdAt: Date }) {
    super(admin);
    this.createdAt = admin.createdAt;
  }
}

export class AdminsResponse extends ResponseDto<AdminListItemDto[]> {
  @ApiProperty({ type: () => [AdminListItemDto], description: "List of admin accounts" })
  declare readonly data: AdminListItemDto[];

  constructor(admins: { id: string; email: string; fullname: string; createdAt: Date }[], message?: string) {
    super(
      admins.map((admin) => new AdminListItemDto(admin)),
      message,
    );
  }
}
