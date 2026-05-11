import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto, OffsetPaginatedResponseDto } from "@/common/dto/response.dto";
import { GetSectionQueryResult } from "../../query/get-section.query";

export class SectionDto {
  @ApiProperty({ example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7", description: "Section id" })
  readonly id: string;

  @ApiProperty({ example: "To Do", description: "Section name" })
  readonly name: string;

  @ApiProperty({ example: 5, description: "Task count" })
  readonly taskCount: number;

  @ApiProperty({
    example: "2024-06-15T12:00:00Z",
    description: "Timestamp of section creation",
    format: "date-time",
  })
  readonly createdAt: Date;

  constructor(section: GetSectionQueryResult) {
    this.id = section.id;
    this.name = section.name;
    this.taskCount = section._count.tasks;
    this.createdAt = section.createdAt;
  }
}

export class SectionResponse extends ResponseDto<SectionDto> {
  @ApiProperty({ type: () => SectionDto, description: "Section data" })
  declare readonly data: SectionDto;

  constructor(data: GetSectionQueryResult, message?: string) {
    super(new SectionDto(data), message);
  }
}

export class SectionsOffsetResponse extends OffsetPaginatedResponseDto<SectionDto> {
  @ApiProperty({ type: () => [SectionDto], description: "Array of sections" })
  declare readonly data: SectionDto[];

  constructor(data: GetSectionQueryResult[], page: number, limit: number, totalItems: number, message?: string) {
    super(
      data.map((section) => new SectionDto(section)),
      page,
      limit,
      totalItems,
      message,
    );
  }
}
