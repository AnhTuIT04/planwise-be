import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  otp: string;

  @ApiProperty({ example: 'newStrongP@ssw0rd' })
  newPassword: string;
}
