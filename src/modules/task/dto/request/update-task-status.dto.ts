import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsString } from "class-validator";

import { TaskStatus } from "prisma/client/pg";

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.TODO,
    description: "The status of the task",
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
