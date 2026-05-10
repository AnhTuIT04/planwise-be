import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Client } from "@notionhq/client";

import { NotionService } from "./notion.service";
import { PgService } from "~/database/pg.service";
import { IntegrationService } from "~/integration/integration.service";
import { NotionAdapter } from "~/integration/adapters";

jest.mock("@notionhq/client");

describe("NotionService", () => {
  let service: NotionService;
  let pgService: any;
  let integrationService: jest.Mocked<IntegrationService>;
  let notionAdapter: jest.Mocked<NotionAdapter>;
  let mockNotionClient: any;

  beforeEach(async () => {
    mockNotionClient = {
      search: jest.fn(),
      pages: {
        retrieve: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
      },
      databases: {
        retrieve: jest.fn(),
        create: jest.fn(),
      },
      dataSources: {
        query: jest.fn(),
      }
    };
    (Client as jest.Mock).mockImplementation(() => mockNotionClient);

    pgService = {
      task: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotionService,
        {
          provide: PgService,
          useValue: pgService,
        },
        {
          provide: IntegrationService,
          useValue: {
            getConnections: jest.fn(),
            getConnection: jest.fn(),
            getValidAccessToken: jest.fn(),
          },
        },
        {
          provide: NotionAdapter,
          useValue: {
            mapNotionPageToTaskData: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotionService>(NotionService);
    integrationService = module.get(IntegrationService);
    notionAdapter = module.get(NotionAdapter);
  });

  const setupMockConnection = () => {
    integrationService.getConnections.mockResolvedValue([{ id: "conn-1" }] as any);
    integrationService.getConnection.mockResolvedValue({} as any);
    integrationService.getValidAccessToken.mockResolvedValue("token");
  };

  describe("updateNotionPageStatus", () => {
    it("should update notion page status successfully", async () => {
      setupMockConnection();
      await service.updateNotionPageStatus("user-1", "pg-1", "Done");
      expect(mockNotionClient.pages.update).toHaveBeenCalledWith(expect.objectContaining({
        page_id: "pg-1",
        properties: expect.objectContaining({ Status: { status: { name: "Done" } } })
      }));
    });
  });

  describe("syncTaskToNotion", () => {
    it("should sync task title to notion", async () => {
      setupMockConnection();
      mockNotionClient.pages.retrieve.mockResolvedValue({ properties: { Name: { type: "title" } } });
      await service.syncTaskToNotion("user-1", "pg-1", { title: "New Title" });
      expect(mockNotionClient.pages.update).toHaveBeenCalled();
    });
  });

  describe("updatePageProperty", () => {
    it("should update checkbox property", async () => {
      setupMockConnection();
      await service.updatePageProperty("user-1", "pg-1", "prop-1", true, "checkbox");
      expect(mockNotionClient.pages.update).toHaveBeenCalledWith(expect.objectContaining({
        properties: { "prop-1": { checkbox: true } }
      }));
    });
  });
});
