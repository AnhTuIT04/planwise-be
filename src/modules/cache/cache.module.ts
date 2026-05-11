import { Global, Module } from "@nestjs/common";

import { CacheService } from "./cache.service";
import { RedisService } from "./redis.service";
import { MemoryService } from "./memory.service";

@Global()
@Module({
  providers: [RedisService, MemoryService, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
