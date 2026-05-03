import { Controller, Get, Post, Patch, Body, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

import { GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { NotionService } from "./notion.service";
import {
  ImportNotionTaskDto,
  QueryNotionDatabaseDto,
  CreateNotionDatabaseDto,
  CreateNotionPageDto,
  UpdateNotionPropertyDto,
} from "./dto/notion.dto";

@ApiTags("Notion Integration")
@Controller("notion")
@ApiBearerAuth()
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get("databases")
  @ApiOperation({ summary: "Search for Notion databases" })
  searchDatabases(@Query() query: QueryNotionDatabaseDto, @GetCurrentUserId() userId: string) {
    return this.notionService.searchDatabases(userId, query.query);
  }

  @Get("databases/:id/tasks")
  @ApiOperation({ summary: "Get tasks (pages) from a specific Notion database" })
  queryDatabase(@Param("id") databaseId: string, @GetCurrentUserId() userId: string) {
    return this.notionService.queryDatabase(userId, databaseId);
  }

  @Post("import")
  @ApiOperation({ summary: "Import a Notion page as a task" })
  importTask(@Body() dto: ImportNotionTaskDto, @GetCurrentUserId() userId: string) {
    // Pass user to the service if needed for permissions/ownership
    return this.notionService.importTask(dto, userId);
  }

  @Get("pages")
  @ApiOperation({ summary: "Get available Notion pages (to be used as database parents)" })
  getPages(@GetCurrentUserId() userId: string) {
    return this.notionService.getPages(userId);
  }

  @Post("databases")
  @ApiOperation({ summary: "Create a new Notion database" })
  createDatabase(@Body() dto: CreateNotionDatabaseDto, @GetCurrentUserId() userId: string) {
    return this.notionService.createDatabase(userId, dto);
  }

  @Post("pages")
  @ApiOperation({ summary: "Create a new page (task) in a Notion database" })
  createPage(@Body() dto: CreateNotionPageDto, @GetCurrentUserId() userId: string) {
    return this.notionService.createPage(userId, dto);
  }

  @Get("pages/:id")
  @ApiOperation({ summary: "Get details of a specific Notion page" })
  getPage(@Param("id") pageId: string, @GetCurrentUserId() userId: string) {
    return this.notionService.getPageDetails(userId, pageId);
  }

  @Patch("pages/:id/properties")
  @ApiOperation({ summary: "Update a Notion page property" })
  updateProperty(
    @Param("id") pageId: string,
    @Body() dto: UpdateNotionPropertyDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.notionService.updatePageProperty(userId, pageId, dto.propertyId, dto.value, dto.type);
  }
}
