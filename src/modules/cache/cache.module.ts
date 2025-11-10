import { Global, Module } from "@nestjs/common";

import { CacheService } from "./cache.service";
import { RedisService } from "./redis.service";
import { MemoryService } from "./memory.service";

@Global()
@Module({
  providers: [CacheService, RedisService, MemoryService],
  exports: [CacheService],
})
export class CacheModule {}
