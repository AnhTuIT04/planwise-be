import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ImportTaskDto } from "./dto/import-task.dto";
import { GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { ApiOperation } from "@nestjs/swagger";

// task.controller.ts
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTaskDto, @GetCurrentUserId() userId: string) {
    return this.taskService.create(dto, userId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id") id: string,
    @Body() dto: UpdateTaskDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.taskService.update(id, dto, userId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param("id") id: string,
    @Query("isPersonal") isPersonal: string,
    @GetCurrentUserId() userId: string,
  ) {
    const personal = isPersonal === "true";
    return this.taskService.remove(id, userId, personal);
  }

  @Post(":id/import")
  @HttpCode(HttpStatus.CREATED)
  importTask(
    @Param("id") taskId: string,
    @Body() dto: ImportTaskDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.taskService.importTask(taskId, dto, userId);
  }
}