import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a project" })
  create(@GetCurrentUserId() userId: string, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all projects" })
  getAllProjects(@GetCurrentUserId() userId: string) {
    return this.projectService.getAllProjects(userId);
  }

  @Get("personal")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get personal project - my-tasks page" })
  getPersonalProject(@GetCurrentUserId() userId: string) {
    return this.projectService.getPersonalProject(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get detailed project by ID" })
  getDetailedProject(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.getDetailedProject(id, userId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a project" })
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a project" })
  remove(@Param("id") id: string, @GetCurrentUserId() userId: string) {
    return this.projectService.remove(id, userId);
  }
}
