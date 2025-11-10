import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

import { ICacheService } from "./interfaces/cache.interface";
import { RedisService } from "./redis.service";
import { MemoryService } from "./memory.service";

@Injectable()
export class CacheService implements ICacheService, OnModuleInit {
  private readonly logger = new Logger(CacheService.name);
  private activeService: ICacheService;

  constructor(
    private readonly redisService: RedisService,
    private readonly memoryService: MemoryService,
  ) {}

  async onModuleInit() {
    const isRedisConnected = await this.redisService.connect();

    if (isRedisConnected) {
      this.activeService = this.redisService;
      this.logger.log("Using Redis as cache service");
    } else {
      this.logger.log("Falling back to memory as cache service");
      this.activeService = this.memoryService;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      return await this.activeService.get(key);
    } catch (error) {
      if (this.activeService === this.redisService) {
        this.logger.warn("Switching to memory cache due to Redis error");
        this.activeService = this.memoryService;
        return await this.memoryService.get(key);
      }
      throw error;
    }
  }

  async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.activeService.set(key, value, ttl);
    } catch (error) {
      if (this.activeService === this.redisService) {
        this.logger.warn("Switching to memory cache due to Redis error");
        this.activeService = this.memoryService;
        await this.memoryService.set(key, value, ttl);
      } else {
        throw error;
      }
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.activeService.del(key);
    } catch (error) {
      if (this.activeService === this.redisService) {
        this.logger.warn("Switching to memory cache due to Redis error");
        this.activeService = this.memoryService;
        await this.memoryService.del(key);
      } else {
        throw error;
      }
    }
  }
}
