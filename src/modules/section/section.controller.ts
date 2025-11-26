import { Controller, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/request/create-section.dto";
import { UpdateSectionDto } from "./dto/request/update-section.dto";
import { SectionResponseDto, SectionsListResponseDto } from "./dto/response/section-response.dto";
import { GetSectionsQueryDto } from "./dto/request/query/get-sections-query.dto";
import { MoveSectionDto } from "./dto/request/move-section.dto";

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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all sections in a project" })
  @ApiResponse({
    status: 200,
    type: SectionsListResponseDto,
    description: "Sections retrieved successfully",
  })
  getAllSections(@GetCurrentUserId() userId: string, @Query() query: GetSectionsQueryDto) {
    return this.sectionService.getAllSections(userId, query.projectId);
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
}
