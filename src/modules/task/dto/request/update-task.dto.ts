import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsDateString, IsDefined, IsEnum, IsOptional, IsString, IsUUID, Min, ValidateIf } from "class-validator";

import { PriorityLevel } from "prisma/client/pg";

export class UpdateTaskDto {
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
  @IsEnum(PriorityLevel)
  @ApiPropertyOptional({
    enum: PriorityLevel,
    example: PriorityLevel.HIGH,
    description: "The priority level of the task",
  })
  readonly priority?: PriorityLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: "120",
    description: "The time estimate for the task in minutes",
  })
  readonly estimate?: number;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsDateString()
  @ApiPropertyOptional({
    example: "2023-10-25T10:30:00.000Z",
    description: "The deadline of the task in ISO 8601 format",
    nullable: true,
  })
  readonly deadline?: string | null;

  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the section the task belongs to",
  })
  readonly sectionId!: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the supervisor user",
  })
  readonly supervisorId?: string;
}
