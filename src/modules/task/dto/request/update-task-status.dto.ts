import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsString } from "class-validator";

import { TaskStatus } from "prisma/client";

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @ApiProperty({
    example: TaskStatus.TODO,
    description: "The status of the task",
    enum: TaskStatus,
  })
  readonly status: TaskStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "sectionId_example",
    description: "The ID of the section",
  })
  readonly sectionId: string;
}
