import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private redisClient: Redis;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.configService.get<string>("REDIS_URL")!;

    this.redisClient = new Redis(redisUrl, {
      retryStrategy: (times) => Math.min(times * 50, 2000),
      reconnectOnError: (err) => {
        if (err.message.includes("READONLY")) return true;
        if (err.message.includes("ECONNRESET")) return true;
        if (err.message.includes("ETIMEDOUT")) return true;
        return false;
      },
    });

    await new Promise<void>((resolve, reject) => {
      this.redisClient.once("connect", () => {
        this.logger.log("Connected to Redis");
        this.isConnected = true;
        resolve();
      });

      this.redisClient.once("error", (err) => {
        this.logger.error(`Redis connection error: ${err.message}`);
        this.isConnected = false;
        reject(err);
      });
    });

    this.redisClient.on("close", () => {
      this.logger.warn("Redis connection closed");
      this.isConnected = false;
    });
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.redisClient.quit();
      this.isConnected = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      this.logger.warn(`Redis not connected, skipping GET ${key}`);
      return null;
    }

    try {
      const value = await this.redisClient.get(key);
      if (!value) return null;
      return JSON.parse(value);
    } catch (err) {
      this.logger.error(`Failed to GET ${key}: ${(err as Error).message}`);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.isConnected) {
      this.logger.warn(`Redis not connected, skipping SET ${key}`);
      return;
    }

    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.redisClient.setex(key, ttl, serializedValue);
      } else {
        await this.redisClient.set(key, serializedValue);
      }
    } catch (err) {
      this.logger.error(`Failed to SET ${key}: ${(err as Error).message}`);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) {
      this.logger.warn(`Redis not connected, skipping DEL ${key}`);
      return;
    }

    try {
      await this.redisClient.del(key);
    } catch (err) {
      this.logger.error(`Failed to DEL ${key}: ${(err as Error).message}`);
    }
  }
}
