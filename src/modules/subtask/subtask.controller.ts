import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import { SubtaskService } from "./subtask.service";
import { CreateSubtaskDto } from "./dto/create-subtask.dto";
import { UpdateSubtaskDto } from "./dto/update-subtask.dto";

@Controller("subtask")
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Post()
  create(@Body() createSubtaskDto: CreateSubtaskDto) {
    return this.subtaskService.create(createSubtaskDto);
  }

  @Get()
  findAll() {
    return this.subtaskService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subtaskService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSubtaskDto: UpdateSubtaskDto) {
    return this.subtaskService.update(+id, updateSubtaskDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subtaskService.remove(+id);
  }
}
