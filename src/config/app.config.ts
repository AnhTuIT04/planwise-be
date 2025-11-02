import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync, Min, Max } from "class-validator";

/**
 * Supported application environments
 */
enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

/**
 * Application configuration class that defines all environment variables and settings
 * required for the application to run properly.
 *
 * This class uses class-validator decorators to ensure all configuration values
 * meet the specified validation criteria. It includes settings for:
 * - Server configuration (port, environment, API routing)
 * - Authentication (JWT tokens and expiration times)
 * - CORS settings for cross-origin requests
 * - Email service configuration for notifications
 * - Database connections (PostgreSQL, MongoDB)
 * - Redis configuration for caching and sessions
 *
 * All properties should be populated from environment variables during
 * application startup and validated before the application begins serving requests.
 *
 * @example
 * ```typescript
 * const config = new AppConfig();
 * config.PORT = 3000;
 * config.NODE_ENV = Environment.Production;
 * ```
 */
export class AppConfig {
  /** Application environment (development, production, test) */
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  /** HTTP server port (valid port range: 0-65535) */
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 8080;

  /** API route prefix (e.g., 'api' for /api/v1/...) */
  @IsString()
  API_PREFIX: string = "api";

  /** API version identifier (e.g., 'v1' for /api/v1/...) */
  @IsString()
  API_VERSION: string = "v1";

  /** Comma-separated list of allowed CORS origins */
  @IsString()
  CORS_ORIGINS: string;

  /** Secret key for JWT token signing and verification */
  @IsString()
  JWT_SECRET: string;

  /** JWT access token expiration time (e.g., '15m', '1h', 3600) */
  @IsString()
  JWT_ACCESS_TOKEN_EXPIRATION: string | number;

  /** JWT refresh token expiration time (e.g., '7d', '30d', 604800) */
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION: string | number;

  /** Email service username for sending verification emails */
  @IsString()
  EMAIL_VERIFIER_USER: string;

  /** Email service password for authentication */
  @IsString()
  EMAIL_VERIFIER_PASS: string;

  /** PostgreSQL database connection URL */
  @IsString()
  POSTGRES_DATABASE_URL: string;

  /** MongoDB database connection URL */
  @IsString()
  MONGODB_DATABASE_URL: string;

  /** Redis cache/session store connection URL */
  @IsString()
  REDIS_URL: string = "";

  /** OAuth success redirect URL */
  @IsString()
  OAUTH_SUCCESS_REDIRECT_URL: string;

  /** Google OAuth client ID */
  @IsString()
  GOOGLE_CLIENT_ID: string;

  /** Google OAuth client secret */
  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  /** Google OAuth callback URL */
  @IsString()
  GOOGLE_CALLBACK_URL: string;

  /** GitHub OAuth client ID */
  @IsString()
  GITHUB_CLIENT_ID: string;

  /** GitHub OAuth client secret */
  @IsString()
  GITHUB_CLIENT_SECRET: string;

  /** GitHub OAuth callback URL */
  @IsString()
  GITHUB_CALLBACK_URL: string;
}

/**
 * Configuration factory function that validates and returns application configuration.
 *
 * This function transforms environment variables into a validated AppConfig instance
 * using class-transformer and class-validator libraries. It ensures all required
 * configuration properties are present and properly typed before the application starts.
 *
 * @returns {AppConfig} A validated configuration object containing all application settings
 * @throws {Error} Throws an error if validation fails or required properties are missing
 *
 * @example
 * ```typescript
 * // Register with ConfigModule
 * ConfigModule.forRoot({
 *   load: [configuration]
 * })
 * ```
 */
export const configuration = registerAs("env", () => {
  const validatedConfig = plainToInstance(AppConfig, process.env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
});
