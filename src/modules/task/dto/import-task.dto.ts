import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID, IsString, IsOptional } from "class-validator";

export class ImportTaskDto {
  @IsUUID()
  @ApiPropertyOptional({})
  toSectionId: string;

  @IsUUID()
  projectId: string;
}
