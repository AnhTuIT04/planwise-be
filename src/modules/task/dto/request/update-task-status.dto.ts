import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsUUID } from "class-validator";

import { TaskStatus } from "prisma/client/pg";

export class UpdateTaskStatusDto {
  @IsDefined()
  @IsEnum(TaskStatus)
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.TODO,
    description: "The status of the task",
  })
  readonly status!: TaskStatus;

  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "sectionId_example",
    description: "The ID of the section",
  })
  readonly sectionId!: string;
}
