import { Controller, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { GetProjectTasksQueryDto } from "@/modules/project/dto/request/query/get-project-tasks-query.dto";
import { TasksListResponseDto } from "@/modules/task/dto/response/task-response.dto";
import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { MoveSectionDto } from "./dto/request/move-section.dto";
import { SectionResponseDto } from "./dto/response/section-response.dto";
import { Permission } from '@/common/enum/permission.enum';
import { RequirePermission } from "@/decorators/require-permission.decorator";

@ApiTags("Section")
@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new section" })
  @ApiResponse({
    status: 201,
    type: SectionResponseDto,
    description: "The section has been successfully created.",
  })
  create(@GetCurrentUserId() userId: string, @Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(userId, createSectionDto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a section" })
  @ApiResponse({
    status: 200,
    type: SectionResponseDto,
    description: "The section has been successfully updated.",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(userId, id, updateSectionDto);
  }

  @Patch(":id/move")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Move a section" })
  @ApiResponse({
    status: 200,
    type: SectionResponseDto,
    description: "The section has been successfully moved.",
  })
  moveSection(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() moveSectionDto: MoveSectionDto) {
    return this.sectionService.moveSection(userId, id, moveSectionDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a section" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "The section has been successfully deleted.",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.sectionService.remove(userId, id);
  }

  @Get(":id/tasks")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get tasks in a section" })
  @ApiResponse({
    status: 200,
    type: TasksListResponseDto,
    description: "Tasks in the section have been successfully retrieved.",
  })
  getSectionTasks(@Param("id") id: string, @GetCurrentUserId() userId: string, @Query() dto: GetProjectTasksQueryDto) {
    return this.sectionService.getSectionTasks(userId, id, dto);
  }
}
