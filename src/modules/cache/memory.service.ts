import { Injectable, Logger } from "@nestjs/common";

import { ICacheService } from "./interfaces/cache.interface";

interface CacheItem {
  value: any;
  expiresAt?: number;
}

@Injectable()
export class MemoryService implements ICacheService {
  private readonly logger = new Logger(MemoryService.name);
  private cache = new Map<string, CacheItem>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired items every 15 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanupExpired();
      },
      15 * 60 * 1000,
    );
  }

  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  private cleanupExpired() {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (item.expiresAt && item.expiresAt <= now) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.cache.delete(key);
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if item has expired
    if (item.expiresAt && item.expiresAt <= Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
    const item: CacheItem = { value };

    if (ttl) {
      item.expiresAt = Date.now() + ttl * 1000;
    }

    this.cache.set(key, item);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }
}
