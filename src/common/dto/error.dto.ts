import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
  @ApiProperty({
    description: "Error name or type",
    example: "ValidationError",
  })
  name: string;

  @ApiProperty({
    type: [String],
    description: "Detailed error messages",
    example: ["Email is required", "Password too short"],
  })
  messages: string[];

  @ApiProperty({
    description: "HTTP method and path of the request that caused the error",
    example: "404 GET /users/123",
  })
  request: string;

  @ApiProperty({
    description: "ISO timestamp of error occurrence",
    example: "2025-10-11T10:30:45.123Z",
  })
  timestamp: string;
}
