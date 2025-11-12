import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProjectResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly logoUrl: string | null;
  readonly createdAt: Date;
  readonly owner: OwnerInfo;
  readonly sectionCount: number;
  readonly taskCount: number;
  readonly memberCount: number;
}

class OwnerInfo {
  readonly id: string;
  readonly fullname: string;
  readonly email: string;
  readonly avatarUrl: string | null;
}
