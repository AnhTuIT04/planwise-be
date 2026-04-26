import { Test, TestingModule } from '@nestjs/testing';
import { NotionService } from './notion.service';
import { PgService } from '../database/pg.service';
import { IntegrationService } from '../integration/integration.service';
import { NotionAdapter } from '../integration/adapters';
import { Client } from '@notionhq/client';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('@notionhq/client');

describe('NotionService', () => {
  let service: NotionService;
  let pgService: any;
  let integrationService: any;
  let notionAdapter: any;
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
    };

    (Client as jest.Mock).mockImplementation(() => mockNotionClient);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotionService,
        {
          provide: PgService,
          useValue: {
            task: {
              findFirst: jest.fn(),
              update: jest.fn(),
              create: jest.fn(),
            },
          },
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
    pgService = module.get<PgService>(PgService);
    integrationService = module.get<IntegrationService>(IntegrationService);
    notionAdapter = module.get<NotionAdapter>(NotionAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchDatabases', () => {
    it('should return filtered databases', async () => {
      const userId = 'user_id';
      const mockResults = [
        { object: 'database', id: 'db1' },
        { object: 'page', id: 'page1' },
        { object: 'data_source', id: 'ds1' },
      ];

      integrationService.getConnections.mockResolvedValue([{ id: 'conn_id' }]);
      integrationService.getConnection.mockResolvedValue({});
      integrationService.getValidAccessToken.mockResolvedValue('token');
      mockNotionClient.search.mockResolvedValue({ results: mockResults });

      const results = await service.searchDatabases(userId);

      expect(results).toHaveLength(2);
      expect(results[0].object).toBe('database');
      expect(results[1].object).toBe('data_source');
    });

    it('should throw exception if no connection found', async () => {
      integrationService.getConnections.mockResolvedValue([]);

      await expect(service.searchDatabases('user_id')).rejects.toThrow(HttpException);
      await expect(service.searchDatabases('user_id')).rejects.toThrow('Notion integration is not configured for this user.');
    });
  });

  describe('importTask', () => {
    it('should import a task successfully', async () => {
      const userId = 'user_id';
      const dto = { notionPageId: 'page_id', projectId: 'project_id' };
      const mockPage = { id: 'page_id', properties: {} };
      const mockTaskData = { title: 'Test' };

      integrationService.getConnections.mockResolvedValue([{ id: 'conn_id' }]);
      integrationService.getConnection.mockResolvedValue({});
      integrationService.getValidAccessToken.mockResolvedValue('token');
      pgService.task.findFirst.mockResolvedValue(null);
      mockNotionClient.pages.retrieve.mockResolvedValue(mockPage);
      notionAdapter.mapNotionPageToTaskData.mockReturnValue(mockTaskData);
      pgService.task.create.mockResolvedValue({ id: 'task_id', ...mockTaskData });

      const result = await service.importTask(dto, userId);

      expect(result.id).toBe('task_id');
      expect(pgService.task.create).toHaveBeenCalled();
    });

    it('should throw error if task already imported to the same project', async () => {
      const userId = 'user_id';
      const dto = { notionPageId: 'page_id', projectId: 'project_id' };
      const existingTask = { id: 'existing_id', projects: [{ projectId: 'project_id' }] };

      integrationService.getConnections.mockResolvedValue([{ id: 'conn_id' }]);
      integrationService.getConnection.mockResolvedValue({});
      integrationService.getValidAccessToken.mockResolvedValue('token');
      pgService.task.findFirst.mockResolvedValue(existingTask);

      await expect(service.importTask(dto, userId)).rejects.toThrow(
        new HttpException("This Notion page has already been imported to this project", HttpStatus.BAD_REQUEST)
      );
    });

    it('should update task if it exists but not in the project', async () => {
       const userId = 'user_id';
       const dto = { notionPageId: 'page_id', projectId: 'project_id' };
       const existingTask = { id: 'existing_id', projects: [] }; // already exists but different project
       const mockPage = { id: 'page_id', properties: {} };
       const mockTaskData = { title: 'Updated Test' };

       integrationService.getConnections.mockResolvedValue([{ id: 'conn_id' }]);
       integrationService.getConnection.mockResolvedValue({});
       integrationService.getValidAccessToken.mockResolvedValue('token');
       pgService.task.findFirst.mockResolvedValue(existingTask);
       mockNotionClient.pages.retrieve.mockResolvedValue(mockPage);
       notionAdapter.mapNotionPageToTaskData.mockReturnValue(mockTaskData);
       pgService.task.update.mockResolvedValue({ id: 'existing_id', ...mockTaskData });

       const result = await service.importTask(dto, userId);

       expect(result.id).toBe('existing_id');
       expect(pgService.task.update).toHaveBeenCalled();
    });
  });
});
