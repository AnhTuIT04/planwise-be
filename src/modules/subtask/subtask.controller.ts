import { Controller, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { TaskResponse } from "~/task/dto/response/task-response.dto";
import { SubtaskService } from "./subtask.service";
import { CreateSubtaskDto } from "./dto/request/create-subtask.dto";
import { UpdateSubtaskDto } from "./dto/request/update-subtask.dto";
import { MoveSubtaskDto } from "./dto/request/move-subtask.dto";
import { UpdateTaskStatusDto } from "../task/dto/request/update-task-status.dto";
import { UpdateSubtaskAssigneesDto } from "./dto/request/update-subtask-assignees.dto";

@ApiTags("Subtask")
@Controller("subtasks")
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new subtask" })
  @ApiResponse({
    status: 201,
    type: TaskResponse,
    description: "The subtask has been successfully created.",
  })
  create(@GetCurrentUserId() userId: string, @Body() createSubtaskDto: CreateSubtaskDto) {
    return this.subtaskService.create(userId, createSubtaskDto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update an existing subtask" })
  @ApiResponse({
    status: 200,
    type: TaskResponse,
    description: "The subtask has been successfully updated.",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateSubtaskDto: UpdateSubtaskDto) {
    return this.subtaskService.update(userId, id, updateSubtaskDto);
  }

  @Patch(":id/status")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Change the status of a subtask" })
  @ApiResponse({
    status: 200,
    type: TaskResponse,
    description: "The subtask status has been successfully changed.",
  })
  changeStatus(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: UpdateTaskStatusDto) {
    return this.subtaskService.changeStatus(userId, id, dto);
  }

  @Patch(":id/move")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Move a subtask to a different position within the same task" })
  @ApiResponse({
    status: 200,
    type: TaskResponse,
    description: "The subtask has been successfully moved.",
  })
  moveSubtask(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() moveSubtaskDto: MoveSubtaskDto) {
    return this.subtaskService.moveSubtask(userId, id, moveSubtaskDto);
  }

  @Patch(":id/assignees")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update the assignees of a subtask" })
  @ApiResponse({
    status: 200,
    type: TaskResponse,
    description: "The subtask assignees have been successfully updated.",
  })
  updateAssignees(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: UpdateSubtaskAssigneesDto) {
    return this.subtaskService.updateAssignees(userId, id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a subtask" })
  @ApiResponse({
    status: 200,
    type: TaskResponse,
    description: "The subtask has been successfully deleted.",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.subtaskService.remove(userId, id);
  }
}
