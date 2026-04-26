import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { RedisService } from './redis.service';
import { MemoryService } from './memory.service';

describe('CacheService', () => {
  let service: CacheService;
  let redisService: any;
  let memoryService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: RedisService,
          useValue: { connect: jest.fn(), get: jest.fn(), set: jest.fn(), del: jest.fn() },
        },
        {
          provide: MemoryService,
          useValue: { get: jest.fn(), set: jest.fn(), del: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    redisService = module.get<RedisService>(RedisService);
    memoryService = module.get<MemoryService>(MemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should use Redis if connected', async () => {
      redisService.connect.mockResolvedValue(true);
      await service.onModuleInit();
      // @ts-ignore
      expect(service.activeService).toBe(redisService);
    });

    it('should use Memory if Redis fails to connect', async () => {
      redisService.connect.mockResolvedValue(false);
      await service.onModuleInit();
      // @ts-ignore
      expect(service.activeService).toBe(memoryService);
    });
  });

  describe('get', () => {
    it('should get from active service', async () => {
      redisService.connect.mockResolvedValue(true);
      await service.onModuleInit();
      redisService.get.mockResolvedValue('value');
      
      const result = await service.get('key');
      expect(result).toBe('value');
      expect(redisService.get).toHaveBeenCalledWith('key');
    });

    it('should fallback to memory on redis error', async () => {
      redisService.connect.mockResolvedValue(true);
      await service.onModuleInit();
      redisService.get.mockRejectedValue(new Error('Redis Down'));
      memoryService.get.mockResolvedValue('fallback_value');

      const result = await service.get('key');
      expect(result).toBe('fallback_value');
      // @ts-ignore
      expect(service.activeService).toBe(memoryService);
    });
  });
});
