import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetTasksInProjectQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "Project id",
  })
  readonly projectId: string;
}
