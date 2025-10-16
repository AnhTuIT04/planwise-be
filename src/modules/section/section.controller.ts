import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { SectionService } from "./section.service";
import { CreateOrUpdateSectionDto } from "./dto/create-or-update-section.dto";
import { GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new section" })
  create(@GetCurrentUserId() userId: string, @Body() createOrUpdateSectionDto: CreateOrUpdateSectionDto) {
    return this.sectionService.create(userId, createOrUpdateSectionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all sections including tasks for the current user" })
  findAll(@GetCurrentUserId() userId: string) {
    return this.sectionService.findAll(userId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a section" })
  update(
    @Param("id") id: string,
    @Body() updateSectionDto: CreateOrUpdateSectionDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.sectionService.update(id, updateSectionDto, userId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a section" })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.sectionService.remove(id, userId);
  }
}
