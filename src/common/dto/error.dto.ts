import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
  @ApiProperty({
    description: "Error name or type",
    example: "ValidationError",
  })
  name: string;

  @ApiProperty({
    type: String,
    description: "Detailed error message",
    example: "Email is required",
  })
  message: string;

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

  constructor(name: string, message: string, request: string) {
    this.name = name;
    this.message = message;
    this.request = request;
    this.timestamp = new Date().toISOString();
  }
}
