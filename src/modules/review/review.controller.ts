import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";

import { GetReviewQueryDto } from "./dto/request/get-review-query.dto";
import { ReviewResponse } from "./dto/response/review-response.dto";
import { ReviewService } from "./review.service";

@ApiTags("Review")
@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get("me")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get a summary of the current user's activity in a chosen period" })
  @ApiResponse({
    status: 200,
    type: ReviewResponse,
    description: "The review summary has been successfully retrieved.",
  })
  getMyReview(@GetCurrentUserId() userId: string, @Query() dto: GetReviewQueryDto) {
    return this.reviewService.getMyReview(userId, dto);
  }
}
