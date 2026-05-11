import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { Client } from "@notionhq/client";

import { IntegrationProvider } from "prisma/client/pg";
import { PgService } from "~/database/pg.service";
import { IntegrationService } from "~/integration/integration.service";
import { NotionAdapter } from "~/integration/adapters";
import { ImportNotionTaskDto, CreateNotionDatabaseDto, CreateNotionPageDto } from "./dto/notion.dto";

@Injectable()
export class NotionService {
  private readonly logger = new Logger(NotionService.name);

  constructor(
    private pgService: PgService,
    private integrationService: IntegrationService,
    private notionAdapter: NotionAdapter,
  ) {}

  private async getNotionClientForUser(userId: string): Promise<Client> {
    try {
      // Find active notion connection
      const connections = await this.integrationService.getConnections(userId, IntegrationProvider.NOTION);
      if (!connections || connections.length === 0) {
        throw new HttpException("Notion integration is not configured for this user.", HttpStatus.NOT_IMPLEMENTED);
      }

      const connectionId = connections[0].id;
      const connection = await this.integrationService.getConnection(userId, IntegrationProvider.NOTION, connectionId);

      const accessToken = await this.integrationService.getValidAccessToken(connection, IntegrationProvider.NOTION);

      return new Client({ auth: accessToken });
    } catch (e: any) {
      if (e instanceof HttpException) throw e;
      throw new HttpException("Failed to authenticate with Notion: " + e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async searchDatabases(userId: string, query?: string) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      const response = await notion.search({
        query,
      });

      return response.results.filter((item: any) => item.object === "database" || item.object === "data_source");
    } catch (error: any) {
      this.logger.error("Error searching Notion databases", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async queryDatabase(userId: string, databaseId: string) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      const response = await notion.dataSources.query({
        data_source_id: databaseId,
      });
      return response.results;
    } catch (error: any) {
      this.logger.error(`Error querying Notion database ${databaseId}`, error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async importTask(dto: ImportNotionTaskDto, userId: string) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      // 0. Check duplicate in the CURRENT project
      const existingTask = await this.pgService.task.findFirst({
        where: { notionPageId: dto.notionPageId },
        include: {
          projects: {
            where: { projectId: dto.projectId },
          },
        },
      });

      if (existingTask && existingTask.projects.length > 0) {
        throw new HttpException("This Notion page has already been imported to this project", HttpStatus.BAD_REQUEST);
      }

      // 1. Fetch page from Notion
      const page: any = await notion.pages.retrieve({ page_id: dto.notionPageId });

      // 2. Map properties to task data
      const taskData = this.notionAdapter.mapNotionPageToTaskData(page);

      let task;
      if (existingTask) {
        // Update existing "ghost" task and link it to the project
        task = await this.pgService.task.update({
          where: { id: existingTask.id },
          data: {
            ...taskData,
            projects: {
              connectOrCreate: {
                where: { taskId_projectId: { taskId: existingTask.id, projectId: dto.projectId } },
                create: { projectId: dto.projectId },
              },
            },
            ...(dto.sectionId && {
              sections: {
                connectOrCreate: {
                  where: { taskId_sectionId: { taskId: existingTask.id, sectionId: dto.sectionId } },
                  create: {
                    sectionId: dto.sectionId,
                    position: String(Date.now()),
                  },
                },
              },
            }),
          } as any,
        });
      } else {
        // Create new task
        task = await this.pgService.task.create({
          data: {
            ...taskData,
            originalProjectId: dto.projectId,
            projects: {
              create: {
                projectId: dto.projectId,
              },
            },
            ...(dto.sectionId && {
              sections: {
                create: {
                  sectionId: dto.sectionId,
                  position: String(Date.now()),
                },
              },
            }),
          } as any,
        });
      }

      return task;
    } catch (error: any) {
      this.logger.error("Error importing from Notion", error.message);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNotionPageStatus(userId: string, notionPageId: string, statusName: string) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      await notion.pages.update({
        page_id: notionPageId,
        properties: {
          Status: {
            status: {
              name: statusName,
            },
          },
        },
      });
    } catch (error: any) {
      // If the property is actually a select property, gracefully fallback
      if (error.status === 400) {
        try {
          await notion.pages.update({
            page_id: notionPageId,
            properties: {
              Status: {
                select: {
                  name: statusName,
                },
              },
            },
          });
        } catch (fallbackError) {
          this.logger.warn(
            `Could not update Notion page status for ${notionPageId}. Ensure there is a Status or Select property named 'Status'.`,
          );
        }
      } else {
        this.logger.error(`Error updating Notion page ${notionPageId}`, error.message);
      }
    }
  }

  async syncTaskToNotion(userId: string, notionPageId: string, taskData: any) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      const page: any = await notion.pages.retrieve({ page_id: notionPageId });
      const properties: any = {};

      for (const key in page.properties) {
        const prop = page.properties[key];

        if (taskData.title && prop.type === "title") {
          properties[key] = { title: [{ text: { content: taskData.title } }] };
        }
        if (taskData.description && prop.type === "rich_text") {
          properties[key] = { rich_text: [{ text: { content: taskData.description } }] };
        }
        if (taskData.deadline && prop.type === "date") {
          properties[key] = { date: { start: new Date(taskData.deadline).toISOString() } };
        }
      }

      if (Object.keys(properties).length > 0) {
        await notion.pages.update({
          page_id: notionPageId,
          properties,
        });
      }
    } catch (error: any) {
      this.logger.warn(`Could not sync task updates to Notion page ${notionPageId}: ${error.message}`);
    }
  }

  async getPages(userId: string) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      const response = await notion.search({
        filter: {
          value: "page",
          property: "object",
        },
      });
      return response.results;
    } catch (error: any) {
      this.logger.error("Error fetching Notion pages", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createDatabase(userId: string, dto: CreateNotionDatabaseDto) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      let properties = dto.properties;

      if (!properties) {
        // Default schema if none provided
        properties = {
          Name: { title: {} },
          Status: {
            select: {
              options: [
                { name: "To-do", color: "default" },
                { name: "Done", color: "green" },
              ],
            },
          },
          Date: { date: {} },
        };
      } else {
        // Ensure at least one 'title' property exists as required by Notion API
        const hasTitle = Object.values(properties).some((prop: any) => prop.title);
        if (!hasTitle) {
          // If the user provided properties but forgot the title one, add a default 'Name' title
          properties["Name"] = { title: {} };
        }
      }

      const response = await (notion.databases as any).create({
        parent: { type: "page_id", page_id: dto.parentPageId },
        title: [{ type: "text", text: { content: dto.title } }],
        properties,
      });
      return response;
    } catch (error: any) {
      this.logger.error("Error creating Notion database", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createPage(userId: string, dto: CreateNotionPageDto) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      let finalProperties = dto.properties;

      if (!finalProperties) {
        // Fallback if no full properties are provided
        const db = (await notion.databases.retrieve({ database_id: dto.databaseId })) as any;
        const titleKey = Object.keys(db.properties || {}).find((k) => db.properties[k].type === "title") || "Name";
        finalProperties = {
          [titleKey]: {
            title: [{ text: { content: dto.title } }],
          },
        };
      }

      const response = await notion.pages.create({
        parent: { database_id: dto.databaseId },
        properties: finalProperties,
      });
      return response;
    } catch (error: any) {
      this.logger.error("Error creating Notion page", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPageDetails(userId: string, pageId: string) {
    const notion = await this.getNotionClientForUser(userId);
    try {
      const page: any = await notion.pages.retrieve({ page_id: pageId });

      // If page belongs to a database, fetch database to get property options (select, status, multi_select)
      const databaseId = page.parent?.database_id || page.parent?.data_source_id;

      if (databaseId) {
        try {
          const db: any = await notion.databases.retrieve({ database_id: databaseId });
          this.logger.debug(`Retrieved database definition. Keys: ${Object.keys(db || {}).join(", ")}`);

          // If standard properties are missing, this might be a Data Source (Synced Database)
          if (!db.properties && page.parent?.type === "data_source_id") {
            this.logger.debug(
              `Database ${databaseId} is missing properties (Synced Database). Searching for Data Source ${page.parent.data_source_id}.`,
            );

            const searchResponse = await notion.search({
              filter: { value: "data_source", property: "object" },
            });

            const dataSource: any = searchResponse.results.find((r: any) => r.id === page.parent.data_source_id);
            if (dataSource && dataSource.properties) {
              this.logger.debug(`Found properties in Data Source definition!`);
              db.properties = dataSource.properties;
            }
          }

          // Enrichment logic...
          if (db && db.properties) {
            for (const key in page.properties) {
              if (db.properties[key]) {
                const dbProp = db.properties[key];
                if (dbProp.type === "select" || dbProp.type === "status" || dbProp.type === "multi_select") {
                  const options =
                    dbProp.select?.options || dbProp.status?.options || dbProp.multi_select?.options || [];

                  // Place options where FE expects them (inside the type-specific object)
                  if (page.properties[key][dbProp.type]) {
                    page.properties[key][dbProp.type].options = options;
                  } else {
                    // Fallback for empty values where the type-specific object might be missing or null
                    page.properties[key].options = options;
                  }
                }
              }
            }
          }
        } catch (dbError: any) {
          this.logger.warn(`Could not fetch database details for page ${pageId}: ${dbError.message}`);
        }
      }

      return page;
    } catch (error: any) {
      this.logger.error(`Error retrieving Notion page ${pageId}`, error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePageProperty(userId: string, pageId: string, propertyId: string, value: any, type: string) {
    const notion = await this.getNotionClientForUser(userId);
    const properties: any = {};

    switch (type) {
      case "status":
        properties[propertyId] = { status: { name: value } };
        break;
      case "select":
        properties[propertyId] = value ? { select: { name: value } } : { select: null };
        break;
      case "multi_select":
        properties[propertyId] = { multi_select: value.map((v: string) => ({ name: v })) };
        break;
      case "date":
        properties[propertyId] = value ? { date: { start: new Date(value).toISOString() } } : { date: null };
        break;
      case "rich_text":
        properties[propertyId] = { rich_text: [{ text: { content: value } }] };
        break;
      case "title":
        properties[propertyId] = { title: [{ text: { content: value } }] };
        break;
      case "checkbox":
        properties[propertyId] = { checkbox: !!value };
        break;
      case "number":
        properties[propertyId] = { number: Number(value) };
        break;
    }

    try {
      return await notion.pages.update({
        page_id: pageId,
        properties,
      });
    } catch (error: any) {
      this.logger.error(`Error updating Notion page ${pageId} property ${propertyId}`, error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  public mapNotionPageToTaskData(page: any) {
    return this.notionAdapter.mapNotionPageToTaskData(page);
  }
}
