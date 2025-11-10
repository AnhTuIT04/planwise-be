import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

/**
 * Configures Swagger/OpenAPI documentation for the application
 * Sets up API docs with authentication, versioning, and REST standards
 */
export function configSwagger(app: INestApplication, apiPrefix: string, apiVersion: string): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle("API documentation for PlanWise")
    .setVersion(apiVersion)
    .addServer(`/${apiPrefix}/${apiVersion}`)
    .addCookieAuth("accessToken", {
      type: "apiKey",
      in: "cookie",
      name: "accessToken",
      description: "Cookie-based JWT authentication, auto-set after login or email verification.",
    });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: true, // Handle prefixes manually via addServer()
  });

  SwaggerModule.setup(`${apiPrefix}/${apiVersion}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Remember JWT token across page refreshes
    },
    customSiteTitle: "PlanWise API Docs",
  });
}
