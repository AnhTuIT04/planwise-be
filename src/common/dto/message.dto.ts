import { ApiProperty } from "@nestjs/swagger";

export class MessageOnlyResponse {
  @ApiProperty({
    example: "Operation completed successfully.",
    description: "Message describing the result",
  })
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
