import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Permission } from "@/decorators/permission.decorator";
import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { PermissionGuard } from "~/permission/guards/permission.guard";
import { CanCreateProjectData } from "./handlers/can-create-project-data.handler";
import { CanUpdateProjectData } from "./handlers/can-update-project-data.handler";
import { CanDeleteProjectData } from "./handlers/can-delete-project-data.handler";
import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { MoveSectionDto } from "./dto/request/move-section.dto";
import { GetSectionTasksQueryDto } from "./dto/request/get-section-tasks-query.dto";
import { SectionResponse } from "./dto/response/section-response.dto";
import { SectionTasksResponse } from "./dto/response/section-tasks-response.dto";

@ApiTags("Section")
@Controller("sections")
@UseGuards(PermissionGuard)
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @Permission(CanCreateProjectData)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new section" })
  @ApiResponse({
    status: 201,
    type: SectionResponse,
    description: "The section has been successfully created.",
  })
  create(@GetCurrentUserId() userId: string, @Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(userId, createSectionDto);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get a section by ID, including its tasks" })
  @ApiResponse({
    status: 200,
    type: SectionTasksResponse,
    description: "Tasks in the section have been successfully retrieved.",
  })
  getSectionTasks(@Param("id") id: string, @GetCurrentUserId() userId: string, @Query() dto: GetSectionTasksQueryDto) {
    return this.sectionService.getSectionTasks(userId, id, dto);
  }

  @Patch(":id")
  @Permission(CanUpdateProjectData)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a section" })
  @ApiResponse({
    status: 200,
    type: SectionResponse,
    description: "The section has been successfully updated.",
  })
  update(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(userId, id, updateSectionDto);
  }

  @Patch(":id/move")
  @Permission(CanUpdateProjectData)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Move a section" })
  @ApiResponse({
    status: 200,
    type: SectionResponse,
    description: "The section has been successfully moved.",
  })
  moveSection(@Param("id") id: string, @GetCurrentUserId() userId: string, @Body() moveSectionDto: MoveSectionDto) {
    return this.sectionService.moveSection(userId, id, moveSectionDto);
  }

  @Delete(":id")
  @Permission(CanDeleteProjectData)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a section" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "The section has been successfully deleted.",
  })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.sectionService.remove(userId, id);
  }
}
