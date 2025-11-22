import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";

import { TaskStatus } from "prisma/client";

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @ApiPropertyOptional({
    example: TaskStatus.TODO,
    description: "The status of the task",
    enum: TaskStatus,
  })
  readonly status: TaskStatus;
}
