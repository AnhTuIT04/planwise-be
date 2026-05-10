import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { IntegrationProvider } from "prisma/client/pg";

import { IntegrationService } from "./integration.service";
import { PgService } from "@/modules/database/pg.service";
import { CacheService } from "@/modules/cache/cache.service";
import { CalendarAdapter } from "./adapters/calendar.adapter";
import { GmailAdapter } from "./adapters/gmail.adapter";
import { NotionAdapter } from "./adapters/notion.adapter";
import { CalendarWebhookService } from "./webhook/calendar.webhook";

describe("IntegrationService", () => {
  let service: IntegrationService;
  let pgService: any;
  let cacheService: jest.Mocked<CacheService>;
  let calendarAdapter: jest.Mocked<CalendarAdapter>;
  let gmailAdapter: jest.Mocked<GmailAdapter>;
  let notionAdapter: jest.Mocked<NotionAdapter>;

  beforeEach(async () => {
    pgService = {
      integrationConnection: {
        upsert: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      },
      integrationEvent: {
        upsert: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findFirst: jest.fn(),
        deleteMany: jest.fn(),
      },
      integrationSyncState: {
        findFirst: jest.fn(),
        upsert: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationService,
        {
          provide: PgService,
          useValue: pgService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("http://localhost:3000"),
          },
        },
        {
          provide: CacheService,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: CalendarAdapter,
          useValue: {
            getAuthUrl: jest.fn(),
            exchangeCodeForTokens: jest.fn(),
          },
        },
        {
          provide: GmailAdapter,
          useValue: {
            getAuthUrl: jest.fn(),
          },
        },
        {
          provide: NotionAdapter,
          useValue: {
            getAuthUrl: jest.fn(),
          },
        },
        {
          provide: CalendarWebhookService,
          useValue: {
            registerWebhook: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IntegrationService>(IntegrationService);
    cacheService = module.get(CacheService);
    calendarAdapter = module.get(CalendarAdapter);
    gmailAdapter = module.get(GmailAdapter);
    notionAdapter = module.get(NotionAdapter);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAuthUrl", () => {
    it("should return auth URL from adapter", async () => {
      calendarAdapter.getAuthUrl.mockReturnValue("http://google.com/auth");

      const url = await service.getAuthUrl("user-1", IntegrationProvider.GOOGLE_CALENDAR);

      expect(calendarAdapter.getAuthUrl).toHaveBeenCalled();
      expect(cacheService.set).toHaveBeenCalled();
      expect(url).toBe("http://google.com/auth");
    });

    it("should throw BadRequestException for unsupported provider", async () => {
      await expect(service.getAuthUrl("user-1", "INVALID" as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe("getConnections", () => {
    it("should return connections for a user", async () => {
      const connections = [{ id: "conn-1", provider: IntegrationProvider.GOOGLE_CALENDAR }];
      pgService.integrationConnection.findMany.mockResolvedValue(connections);

      const result = await service.getConnections("user-1");

      expect(pgService.integrationConnection.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: "user-1" } }));
      expect(result).toEqual(connections);
    });
  });
});
