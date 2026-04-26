import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationService } from './integration.service';
import { PgService } from '@/modules/database/pg.service';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@/modules/cache/cache.service';
import { CalendarAdapter } from './adapters/calendar.adapter';
import { NotionAdapter } from './adapters/notion.adapter';
import { CalendarWebhookService } from './webhook/calendar.webhook';
import { IntegrationProvider } from 'prisma/client/pg';
import { BadRequestException } from '@nestjs/common';

describe('IntegrationService', () => {
  let service: IntegrationService;
  let pgService: any;
  let cacheService: any;
  let calendarAdapter: any;
  let notionAdapter: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationService,
        {
          provide: PgService,
          useValue: {
            integrationConnection: { findMany: jest.fn(), findFirst: jest.fn(), upsert: jest.fn(), update: jest.fn(), delete: jest.fn() },
            integrationSyncState: { findFirst: jest.fn(), upsert: jest.fn() },
            integrationEvent: { upsert: jest.fn(), findFirst: jest.fn(), create: jest.fn(), update: jest.fn(), deleteMany: jest.fn() },
          },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('http://localhost:3000') },
        },
        {
          provide: CacheService,
          useValue: { set: jest.fn(), get: jest.fn(), del: jest.fn() },
        },
        {
          provide: CalendarAdapter,
          useValue: { getAuthUrl: jest.fn(), exchangeCodeForTokens: jest.fn(), list: jest.fn() },
        },
        {
          provide: NotionAdapter,
          useValue: { getAuthUrl: jest.fn(), exchangeCodeForTokens: jest.fn() },
        },
        {
          provide: CalendarWebhookService,
          useValue: { registerWebhook: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<IntegrationService>(IntegrationService);
    pgService = module.get<PgService>(PgService);
    cacheService = module.get<CacheService>(CacheService);
    calendarAdapter = module.get<CalendarAdapter>(CalendarAdapter);
    notionAdapter = module.get<NotionAdapter>(NotionAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAuthUrl', () => {
    it('should return auth url and cache state', async () => {
      calendarAdapter.getAuthUrl.mockReturnValue('https://google.com/auth');
      const url = await service.getAuthUrl('user_id', IntegrationProvider.GOOGLE_CALENDAR);
      expect(url).toBe('https://google.com/auth');
      expect(cacheService.set).toHaveBeenCalled();
    });
  });

  describe('handleOAuthCallback', () => {
    it('should throw BadRequestException for invalid state', async () => {
      cacheService.get.mockResolvedValue(null);
      await expect(service.handleOAuthCallback('code', 'invalid_state')).rejects.toThrow(BadRequestException);
    });
  });

  describe('getConnections', () => {
    it('should return user connections', async () => {
      const userId = 'user_id';
      pgService.integrationConnection.findMany.mockResolvedValue([{ id: 'c1', provider: IntegrationProvider.GOOGLE_CALENDAR }]);
      const result = await service.getConnections(userId);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('c1');
    });
  });
});
