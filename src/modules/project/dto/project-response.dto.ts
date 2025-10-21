import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProjectResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Unique identifier of the project",
  })
  readonly id: string;

  @ApiProperty({
    example: "Website Redesign",
    description: "Name of the project",
  })
  readonly name: string;

  @ApiPropertyOptional({
    example: "Complete redesign of company website with modern UI/UX",
    description: "Description of the project",
  })
  readonly description: string | null;

  @ApiProperty({
    example: false,
    description: "Whether this is a personal project",
  })
  readonly isPersonal: boolean;

  @ApiProperty({
    example: ["section-id-1", "section-id-2"],
    description: "Array of section IDs in order",
    type: String,
  })
  readonly listOfSection: string;

  @ApiProperty({
    example: "2023-10-19T10:30:00.000Z",
    description: "Creation timestamp",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Owner user ID",
  })
  readonly owner: string;
}
