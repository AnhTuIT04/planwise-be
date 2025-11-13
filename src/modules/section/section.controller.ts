import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { SectionService } from "./section.service";
import { GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { ApiOperation } from "@nestjs/swagger";
import { CreateSectionDto, UpdateSectionDto,DeleteSectionDto } from "./dto";

@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new section" })
  create(@GetCurrentUserId() userId: string, @Body() createSectionDto: CreateSectionDto) {
    console.log("Received request to create section:", createSectionDto);
    return this.sectionService.create(userId, createSectionDto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a section" })
  update(@Param("id") id: string, @Body() updateSectionDto: UpdateSectionDto, @GetCurrentUserId() userId: string) {
    return this.sectionService.update(id, updateSectionDto, userId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a section" })
  remove(@Param("id") id: string,@Body() dto: DeleteSectionDto, @GetCurrentUserId() userId: string) {
    return this.sectionService.remove(id,dto, userId);
  }
}
