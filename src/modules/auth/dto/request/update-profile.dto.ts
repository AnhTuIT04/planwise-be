import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: "User's full name",
    example: "John Doe",
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: "Full name must be at least 2 characters long" })
  @MaxLength(100, { message: "Full name must not exceed 100 characters" })
  fullname?: string;

  @ApiPropertyOptional({
    description: "User's avatar URL",
    example: "https://example.com/avatar.jpg",
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: "Avatar URL must be a valid URL" })
  avatarUrl?: string;
}
