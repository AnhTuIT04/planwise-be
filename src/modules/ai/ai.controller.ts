import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { AiService } from "./ai.service";
import { ChatRequestDto } from "./dto/chat-request.dto";

@ApiTags("AI")
@ApiBearerAuth()
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("chat")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Chat with PlanWise AI for task decomposition or prioritization" })
  @ApiResponse({
    status: 200,
    description: "AI response successfully generated",
  })
  chat(@GetCurrentUserId() userId: string, @Body() dto: ChatRequestDto) {
    return this.aiService.chat(userId, dto.projectId, dto.message);
  }
}
