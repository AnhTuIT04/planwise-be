import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "prisma/client/pg";

@Injectable()
export class PgService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PgService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Connected to PostgreSQL database");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn("Disconnected from PostgreSQL database");
  }
}
