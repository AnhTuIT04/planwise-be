import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user-response.dto";
import { ResponseDto } from "@/common/dto/response.dto";

export class AuthDto {
  @ApiProperty({ type: () => UserDto, description: "Detailed user information" })
  readonly user: UserDto;

  @ApiProperty({ example: "jwt-token-string", description: "JWT access token" })
  readonly accessToken: string;

  constructor(data: { user: UserDto; accessToken: string }) {
    this.user = new UserDto(data.user);
    this.accessToken = data.accessToken;
  }
}

export class AuthResponseDto extends ResponseDto<AuthDto> {
  @ApiProperty({ type: () => AuthDto, description: "Authentication response data" })
  declare readonly data: AuthDto;

  constructor(data: AuthDto, message: string = "Operation completed successfully.") {
    super(new AuthDto(data), message);
  }
}
