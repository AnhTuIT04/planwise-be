import { IsString, IsBoolean, ValidateNested, IsDate, IsUUID, IsEmail, IsUrl, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class UserDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: "167167ca-9760-466d-adff-ede13db5d56a",
    description: "Unique identifier of the user",
    format: "uuid",
  })
  readonly id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "user@example.com",
    description: "Email address of the user",
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "John Doe",
    description: "Full name of the user",
  })
  readonly fullname: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example: "https://placehold.co/600x400/EEE/31343C",
    description: "Avatar image URL",
  })
  readonly avatarUrl: string | null;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: "Whether the user has been verified",
  })
  readonly verified: boolean;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Timestamp of user creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    example: "2025-10-22T16:01:50.014Z",
    description: "Timestamp of last user update",
    format: "date-time",
  })
  readonly updatedAt: Date;
}

export class UserResponseDto {
  @ValidateNested()
  @Type(() => UserDto)
  @ApiProperty({ type: () => UserDto, description: "User information object" })
  readonly user: UserDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "User data retrieved successfully.",
    description: "Message describing the result",
  })
  readonly message: string;
}
