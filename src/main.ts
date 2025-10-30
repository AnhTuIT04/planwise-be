import { ValidationPipe } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import compression from "compression";
import * as express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { AppModule } from "@/app.module";
import { AppConfig } from "@/config/app.config";
import { configSwagger } from "@/config/swagger.config";
import { GlobalExceptionFilter } from "@/filters/global-exception.filter";

/**
 * Bootstrap function to initialize and configure the NestJS application
 * Sets up middleware, CORS, validation, logging, and global configurations
 * @returns Promise<NestExpressApplication> The configured application instance
 */
async function bootstrap() {
  // Create NestJS application with Express adapter for enhanced express features
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  // Extract application configuration from ConfigService
  const { NODE_ENV, PORT, API_PREFIX, API_VERSION, CORS_ORIGINS } = app.get(ConfigService).get<AppConfig>("env")!;

  // Configure CORS (Cross-Origin Resource Sharing) with allowed methods and origins
  app.enableCors({
    origin: CORS_ORIGINS.split(",").filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies and authorization headers
  });

  // Set up common middleware for security, compression, logging, and request parsing
  app.enable("trust proxy"); // Only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  app.setGlobalPrefix(`${API_PREFIX}/${API_VERSION}`, { exclude: [] }); // Set global prefix for API routes
  app.use(compression());
  if (NODE_ENV === "development") {
    app.use(morgan("dev")); // Can change to 'combined' or 'common' for different logging formats
  }
  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Enable API versioning and graceful shutdown hooks
  app.enableVersioning();
  app.enableShutdownHooks();

  // Set up global exception filter for consistent error handling
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Configure global request validation pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      transform: true, // Automatically transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transformOptions: { enableImplicitConversion: true }, // Allow primitive type conversions
    }),
  );

  // Configure Swagger/OpenAPI documentation
  configSwagger(app, API_PREFIX, API_VERSION);

  // Start the HTTP server on the configured port
  await app.listen(PORT);
  const DISPLAY_URL = `http://localhost:${PORT}`;
  console.info(`Application is running on: ${DISPLAY_URL}`);
  console.info(`API documentation available at: ${DISPLAY_URL}/${API_PREFIX}/${API_VERSION}/docs`);

  return app;
}

// Start the application and handle any bootstrap errors
bootstrap().catch((err) => {
  console.error("Error during application bootstrap:", err);
  process.exit(1);
});
