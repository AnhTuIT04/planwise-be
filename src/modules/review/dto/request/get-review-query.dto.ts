import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";

import { ReviewPeriod } from "../../utils/resolve-period";

export class GetReviewQueryDto {
  @IsOptional()
  @IsEnum(ReviewPeriod)
  @ApiPropertyOptional({
    enum: ReviewPeriod,
    example: ReviewPeriod.MONTH,
    description: "Granularity of the review window. Defaults to month.",
  })
  readonly period: ReviewPeriod = ReviewPeriod.MONTH;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: "2026-04-15",
    description:
      "Any date inside the desired window. Server snaps to the full calendar boundary (1st-last for month, Mon-Sun for week). Defaults to today.",
  })
  readonly date?: string;
}
