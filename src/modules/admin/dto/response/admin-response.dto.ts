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
