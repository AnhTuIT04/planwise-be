import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Connected to the database");
    
    // Log connection pool status
    const status = await this.$queryRaw`SELECT datname, count(*) as connection_count FROM pg_stat_activity GROUP BY datname;`;
    this.logger.debug("Database connection status:", status);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn("Disconnected from the database");
  }
}
