import { TaskResponseDto } from "@/modules/task/dto";
import { ApiProperty } from "@nestjs/swagger";
import { SectionResponseDto } from "./section-response.dto";

export class DetailedSectionResponseDto extends SectionResponseDto {
  @ApiProperty({
    type: [TaskResponseDto],
    description: "Tasks in this section",
  })
  readonly tasks: TaskResponseDto[];

  // @ApiProperty({
  //   example: 5,
  //   description: "Total number of tasks in the section",
  // })
  // readonly taskCount: number;
}
