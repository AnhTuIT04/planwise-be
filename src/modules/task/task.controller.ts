import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/request/create-task.dto";
import { UpdateTaskDto } from "./dto/request/update-task.dto";
import { UpdateTaskStatusDto } from "./dto/request/update-task-status.dto";
import { MoveTaskDto } from "./dto/request/move-task.dto";
import { ImportTaskDto } from "./dto/request/import-task.dto";
import { DeleteTaskDto } from "./dto/request/delete-task.dto";
import { TaskResponseDto } from "./dto/response/task-response.dto";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({
    status: 201,
    type: TaskResponseDto,
    description: "The task has been successfully created.",
  })
  create(@GetCurrentUserId() userId: string, @Body() dto: CreateTaskDto) {
    return this.taskService.create(userId, dto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get task by id (not subtask)" })
  @ApiResponse({
    status: 200,
    type: TaskResponseDto,
    description: "The task has been successfully retrieved.",
  })
  getById(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.taskService.getById(userId, id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a task (not subtask)" })
  @ApiResponse({
    status: 200,
    type: TaskResponseDto,
    description: "The task has been successfully updated.",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(userId, id, dto);
  }

  @Patch(":id/status")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update task status  (not subtask)" })
  @ApiResponse({
    status: 200,
    type: TaskResponseDto,
    description: "The task status has been successfully updated.",
  })
  updateStatus(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: UpdateTaskStatusDto) {
    return this.taskService.updateStatus(userId, id, dto);
  }

  @Patch(":id/move")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Move a task to a different section (not subtask)" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "The task has been successfully moved.",
  })
  moveTask(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: MoveTaskDto) {
    return this.taskService.moveTask(userId, id, dto);
  }

  @Post(":id/import")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Import a task to a different project (not subtask)" })
  @ApiResponse({
    status: 201,
    type: MessageResponseDto,
    description: "The task has been successfully imported.",
  })
  importTask(@Param("id") taskId: string, @GetCurrentUserId() userId: string, @Body() dto: ImportTaskDto) {
    return this.taskService.importTask(userId, taskId, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a task" })
  @ApiResponse({
    status: 204,
    type: MessageResponseDto,
    description: "The task has been successfully deleted.",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() dto: DeleteTaskDto) {
    return this.taskService.remove(userId, id, dto);
  }
}
