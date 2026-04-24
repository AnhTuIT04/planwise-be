import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: "Full name must be at least 6 characters long" })
  @MaxLength(100, { message: "Full name must not exceed 100 characters" })
  @ApiPropertyOptional({
    description: "User's full name",
    example: "John Doe",
    minLength: 2,
    maxLength: 100,
  })
  fullname?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_tld: false }, { message: "Avatar URL must be a valid URL" })
  @ApiPropertyOptional({
    description: "User's avatar URL",
    example: "https://example.com/avatar.jpg",
  })
  avatarUrl?: string;
}
