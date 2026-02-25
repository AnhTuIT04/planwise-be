import { Global, Module } from "@nestjs/common";

import { PgService } from "./pg.service";
import { MongoService } from "./mongo.service";

@Global()
@Module({
  providers: [PgService, MongoService],
  exports: [PgService, MongoService],
})
export class DatabaseModule {}
