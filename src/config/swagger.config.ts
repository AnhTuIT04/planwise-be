import { type INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

/**
 * Configures Swagger/OpenAPI documentation for the application
 * Sets up API docs with authentication, versioning, and REST standards
 */
export function configSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle("API documentation for PlanWise")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Authorization header using Bearer token",
      },
      "bearer",
    )
    .addSecurityRequirements("bearer");

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup("api-docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Remember JWT token across page refreshes
    },
    customSiteTitle: "PlanWise API Docs",
  });
}
