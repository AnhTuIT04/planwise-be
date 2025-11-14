import { ApiProperty } from "@nestjs/swagger";

export class SectionResponseDto {
  readonly id: string;
  readonly name: string;
  readonly listOfTask: string;
  readonly createdAt: Date;
}
