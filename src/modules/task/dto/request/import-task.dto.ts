import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsUUID, Min } from "class-validator";

export class ImportTaskDto {
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the source project from which the task is imported",
  })
  readonly fromProjectId!: string;

  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the target section to move the task to",
  })
  readonly toSectionId!: string;

  @IsDefined()
  @IsInt()
  @Min(0)
  @ApiProperty({
    example: 1,
    description: "Insert the task at this index (0-based) in the target section",
  })
  readonly insertAt!: number;
}
