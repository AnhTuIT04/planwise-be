import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "prisma/client/mongo";

@Injectable()
export class MongoService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongoService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Connected to MongoDB database");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn("Disconnected from MongoDB database");
  }
}
