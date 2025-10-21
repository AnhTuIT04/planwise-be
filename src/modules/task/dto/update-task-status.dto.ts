import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "prisma/client";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({
    example: TaskStatus.IN_PROGRESS,
    description: "New status for the task",
    enum: TaskStatus,
  })
  readonly status: TaskStatus;
}
