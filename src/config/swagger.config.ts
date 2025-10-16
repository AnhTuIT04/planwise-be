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
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "accessToken",
    );
  // .addCookieAuth("accessToken", {
  //   type: "apiKey",
  //   in: "cookie",
  //   name: "accessToken",
  //   description: "Cookie-based JWT authentication, auto-set after login or email verification.",
  // });

  // Generate OpenAPI document from decorators and configuration
  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: true, // Handle prefixes manually via addServer()
  });

  // Apply global security scheme (cookie auth) to all endpoints by default
  // Individual endpoints can override with @Public() decorator
  document.security = [{ accessToken: [] }];

  // Setup Swagger UI at /api/v1/docs endpoint
  SwaggerModule.setup(`${apiPrefix}/${apiVersion}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Remember JWT token across page refreshes
    },
    customSiteTitle: "PlanWise API Docs",
  });
}
