import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, Min } from "class-validator";

export class UpdateSubtaskDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: "Fix login bug",
    description: "The title of the task",
  })
  readonly title?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the subtask in minutes",
  })
  readonly estimate?: number;
}
