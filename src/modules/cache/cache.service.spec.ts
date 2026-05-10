import { Test, TestingModule } from "@nestjs/testing";
import { CacheService } from "./cache.service";
import { RedisService } from "./redis.service";
import { MemoryService } from "./memory.service";

describe("CacheService", () => {
  let service: CacheService;
  let redisService: jest.Mocked<RedisService>;
  let memoryService: jest.Mocked<MemoryService>;

  beforeEach(async () => {
    const mockRedis = {
      connect: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };
    const mockMemory = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        { provide: RedisService, useValue: mockRedis },
        { provide: MemoryService, useValue: mockMemory },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    redisService = module.get(RedisService);
    memoryService = module.get(MemoryService);
  });

  describe("onModuleInit", () => {
    it("should use Redis if connection succeeds", async () => {
      redisService.connect.mockResolvedValue(true);
      await service.onModuleInit();
      
      redisService.get.mockResolvedValue("redis-val");
      const val = await service.get("key");
      expect(val).toBe("redis-val");
      expect(redisService.get).toHaveBeenCalled();
    });

    it("should fallback to memory if Redis connection fails", async () => {
      redisService.connect.mockResolvedValue(false);
      await service.onModuleInit();
      
      memoryService.get.mockResolvedValue("mem-val");
      const val = await service.get("key");
      expect(val).toBe("mem-val");
      expect(memoryService.get).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should fallback to memory if Redis get fails at runtime", async () => {
      // First connect successfully
      redisService.connect.mockResolvedValue(true);
      await service.onModuleInit();

      // Mock failure at runtime
      redisService.get.mockRejectedValue(new Error("Redis down"));
      memoryService.get.mockResolvedValue("fallback-val");

      const val = await service.get("key");
      expect(val).toBe("fallback-val");
      expect(memoryService.get).toHaveBeenCalled();
    });
  });
});
