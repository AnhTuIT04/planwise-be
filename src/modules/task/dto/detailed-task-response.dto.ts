import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TaskResponseDto, TaskPersonDto, TaskWithAssigneesResponseDto } from "./task-response.dto";
import { CommentResponseDto } from "@/modules/comment/dto";

// DTO for detailed task response including subtasks, comments, and supervisor info
export class DetailedTaskResponseDto extends TaskWithAssigneesResponseDto {
  @ApiPropertyOptional({
    type: TaskPersonDto,
    description: "Task supervisor information",
  })
  readonly supervisor: TaskPersonDto | null;

  @ApiProperty({
    type: [TaskResponseDto],
    description: "Subtasks of this task",
  })
  readonly subtasks: TaskResponseDto[];

  @ApiProperty({
    type: [CommentResponseDto],
    description: "Comments on this task",
  })
  readonly comments: CommentResponseDto[];

  // @ApiProperty({
  //   example: 75,
  //   description: "Completion percentage based on subtasks",
  // })
  // readonly completionPercentage: number;
}
