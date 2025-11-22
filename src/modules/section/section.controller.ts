import { Controller, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { SectionResponseDto } from "./dto/response/section-response.dto";

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

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a section" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "The section has been successfully deleted.",
  })
  remove(@Param("id") id: string, @Query("projectId") projectId: string, @GetCurrentUserId() userId: string) {
    return this.sectionService.remove(userId, projectId, id);
  }
}
