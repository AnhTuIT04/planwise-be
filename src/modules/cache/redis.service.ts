import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

import { ICacheService } from "./interfaces/cache.interface";

@Injectable()
export class RedisService implements ICacheService, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private redis: Redis | null = null;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleDestroy() {
    await this.disconnect();
  }

  async connect() {
    try {
      const redisUrl = this.configService.get<string>("REDIS_URL");

      if (!redisUrl) {
        this.logger.warn("REDIS_URL is not set. Skipping Redis connection.");
        return false;
      }

      this.redis = new Redis(redisUrl, {
        retryStrategy: () => null,
        reconnectOnError: () => false,
        maxRetriesPerRequest: 1,
      });

      await new Promise<void>((resolve, reject) => {
        if (!this.redis) {
          reject(new Error("Redis client is not initialized"));
          return;
        }

        this.redis.once("connect", () => {
          this.logger.log("Connected to Redis");
          this.isConnected = true;
          resolve();
        });

        this.redis.once("error", (err) => {
          this.logger.error(`Redis connection error: ${err.message}`);
          this.isConnected = false;
          reject(err);
        });
      });

      this.redis.on("close", () => {
        this.logger.warn("Redis connection closed");
        this.isConnected = false;
      });

      return this.isConnected;
    } catch (err) {
      this.logger.error(`Failed to connect to Redis: ${(err as Error).message}`);
      this.isConnected = false;
      return false;
    }
  }

  private async disconnect() {
    if (this.redis && this.isConnected) {
      await this.redis.quit();
      this.isConnected = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected || !this.redis) {
      throw new Error("Redis is not connected");
    }

    try {
      const value = await this.redis.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (err) {
      this.logger.error(`Failed to GET ${key}: ${(err as Error).message}`);
      return null;
    }
  }

  async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
    if (!this.isConnected || !this.redis) {
      throw new Error("Redis is not connected");
    }

    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.redis.setex(key, ttl, serializedValue);
      } else {
        await this.redis.set(key, serializedValue);
      }
    } catch (err) {
      this.logger.error(`Failed to SET ${key}: ${(err as Error).message}`);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected || !this.redis) {
      throw new Error("Redis is not connected");
    }

    try {
      await this.redis.del(key);
    } catch (err) {
      this.logger.error(`Failed to DEL ${key}: ${(err as Error).message}`);
    }
  }

  async tryLock(key: string, ttlSeconds: number): Promise<boolean> {
    if (!this.isConnected || !this.redis) {
      throw new Error("Redis is not connected");
    }

    try {
      // SET key value EX ttl NX — atomic across all app instances sharing this Redis
      const result = await this.redis.set(key, "1", "EX", ttlSeconds, "NX");
      return result === "OK";
    } catch (err) {
      this.logger.error(`Failed to LOCK ${key}: ${(err as Error).message}`);
      return false;
    }
  }
}
