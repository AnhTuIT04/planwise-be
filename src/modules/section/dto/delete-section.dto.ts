import { IsUUID, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteSectionDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Project ID to verify ownership",
  })
  readonly projectId: string;
}