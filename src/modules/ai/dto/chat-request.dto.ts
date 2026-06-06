import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, IsUUID } from "class-validator";

export class ChatRequestDto {
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the project/workspace context",
  })
  readonly projectId!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    example: "Help me break down the user registration task",
    description: "The message prompt from the user",
  })
  readonly message!: string;
}
