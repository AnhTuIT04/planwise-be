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
  @IsString()
  @ApiPropertyOptional({
    example: "Users can't login with Google OAuth",
    description: "The description of the task",
  })
  readonly description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the subtask in minutes",
  })
  readonly timeEstimate?: number;
}
