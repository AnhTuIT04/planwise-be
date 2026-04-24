import { Module } from "@nestjs/common";

import { SubtaskService } from "./subtask.service";
import { SubtaskController } from "./subtask.controller";

@Module({
  imports: [],
  controllers: [SubtaskController],
  providers: [SubtaskService],
})
export class SubtaskModule {}
