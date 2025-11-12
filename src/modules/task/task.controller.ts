import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({ summary: "Create a new task" })
  // create(@Body() createTaskDto: CreateTaskDto) {
  //   return this.taskService.create(createTaskDto);
  // }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Get all tasks for a specific section' })
  // findBySection(@Param('sectionId') sectionId: string, @GetCurrentUserId() userId: string) {
  //   return this.taskService.findBySection(sectionId, userId);
  // }

  // @Get(":id")
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: "Get a specific task" })
  // GetDetailTask(@Param("id") id: string) {
  //   return this.taskService.getDetailedTask(id);
  // }

  // @Patch(":id")
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: "Update a task, only need to provide the fields you want to update" })
  // update(
  //   @Param("id") id: string,
  //   @Query("isPersonal") isPersonal: boolean,
  //   @Body() updateTaskDto: UpdateTaskDto,
  //   @GetCurrentUserId() userId: string,
  // ) {
  //   return isPersonal
  //     ? this.taskService.updatePersonal(id, updateTaskDto, userId)
  //     : this.taskService.update(id, updateTaskDto);
  // }

  // @Post('/assign')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Assign users to a task' })
  // assignTaskToUsers(@Body('id') taskId: string, @Body('assigneeIds') assigneeIds: string[]) {
  //   return this.taskService.assignTaskToUsers(taskId, assigneeIds);
  // }

  // @Delete(":id")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({ summary: "Delete a task" })
  // remove(@Param("id") id: string, @Query("isPersonal") isPersonal: boolean, @GetCurrentUserId() userId: string) {
  //   return isPersonal ? this.taskService.removePersonal(id, userId) : this.taskService.remove(id);
  // }
}
