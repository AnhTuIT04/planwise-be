import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { TaskService } from "./task.service";
import { ImportTaskDto } from "./dto/import-task.dto";
import { CreateTaskDto } from "./dto/request/create-task.dto";
import { UpdateTaskDto } from "./dto/request/update-task.dto";
import { MoveTaskDto } from "./dto/request/move-task.dto";
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
  @ApiOperation({ summary: "Get task by id" })
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

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a task" })
  @ApiResponse({
    status: 204,
    type: MessageResponseDto,
    description: "The task has been successfully deleted.",
  })
  remove(@Param("id") id: string, @Query("isPersonal") isPersonal: boolean, @GetCurrentUserId() userId: string) {
    return this.taskService.remove(userId, id, isPersonal);
  }

  // @Post(":id/import")
  // @HttpCode(HttpStatus.CREATED)
  // importTask(@Param("id") taskId: string, @Body() dto: ImportTaskDto, @GetCurrentUserId() userId: string) {
  //   return this.taskService.importTask(taskId, dto, userId);
  // }
}
