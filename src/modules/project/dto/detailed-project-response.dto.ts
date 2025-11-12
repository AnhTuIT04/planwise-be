import { DetailedSectionResponseDto } from "@/modules/section/dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DetailedProjectResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly logoUrl: string | null;
  readonly isPersonal: boolean;
  readonly listOfSection: string;
  readonly createdAt: Date;
  readonly sections: DetailedSectionResponseDto[];
  readonly taskCount: number;
}
