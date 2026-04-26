import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NotionAdapter } from './notion.adapter';

describe('NotionAdapter', () => {
  let adapter: NotionAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotionAdapter,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'NOTION_CLIENT_ID') return 'test_id';
              if (key === 'NOTION_CLIENT_SECRET') return 'test_secret';
              if (key === 'API_PREFIX') return 'api';
              if (key === 'API_VERSION') return 'v1';
              if (key === 'DOMAIN') return 'localhost';
              if (key === 'PORT') return '3000';
              return null;
            }),
          },
        },
      ],
    }).compile();

    adapter = module.get<NotionAdapter>(NotionAdapter);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('mapNotionPageToTaskData', () => {
    it('should map a simple Notion page to task data', () => {
      const mockPage = {
        id: 'page_id',
        url: 'https://notion.so/page_id',
        properties: {
          Name: {
            type: 'title',
            title: [{ plain_text: 'Test Task' }],
          },
          Status: {
            type: 'status',
            status: { name: 'Done' },
          },
        },
      };

      const result = adapter.mapNotionPageToTaskData(mockPage);

      expect(result.title).toBe('Test Task');
      expect(result.status).toBe('DONE');
      expect(result.notionPageId).toBe('page_id');
    });

    it('should handle missing properties with defaults', () => {
      const mockPage = {
        id: 'page_id',
        url: 'https://notion.so/page_id',
        properties: {},
      };

      const result = adapter.mapNotionPageToTaskData(mockPage);

      expect(result.title).toBe('Untitled Notion Task');
      expect(result.status).toBe('TODO');
    });

    it('should map date property to deadline', () => {
      const mockPage = {
        id: 'page_id',
        url: 'https://notion.so/page_id',
        properties: {
          Date: {
            type: 'date',
            date: { start: '2023-10-01T00:00:00.000Z' },
          },
        },
      };

      const result = adapter.mapNotionPageToTaskData(mockPage);

      expect(result.deadline).toBe(new Date('2023-10-01T00:00:00.000Z').toISOString());
    });

    it('should handle select property for status', () => {
      const mockPage = {
        id: 'page_id',
        url: 'https://notion.so/page_id',
        properties: {
          Priority: {
            type: 'select',
            select: { name: 'Hoàn thành' },
          },
        },
      };

      const result = adapter.mapNotionPageToTaskData(mockPage);

      expect(result.status).toBe('DONE');
    });
  });
});
