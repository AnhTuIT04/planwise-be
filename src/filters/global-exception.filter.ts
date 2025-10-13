import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

import { ErrorDto } from "@/common/dto/error.dto";

/**
 * Global exception filter that catches all unhandled exceptions
 * Provides consistent error response format across the entire application
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  /**
   * Handles exceptions and formats them into a consistent error response
   * @param exception The caught exception (HttpException, Error, or unknown)
   * @param host ArgumentsHost containing request/response context
   */
  catch(exception: unknown, host: ArgumentsHost) {
    // Extract HTTP context (request/response objects)
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Default error values for unknown exceptions
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let name = "InternalServerError";
    let messages: string[] = ["Internal server error"];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      // Handle string response (simple message)
      if (typeof res === "string") {
        messages = [res];
      } else if (typeof res === "object" && res !== null) {
        // Handle object response (structured error with message/error fields)
        const responseObject = res as Record<string, any>;
        name = responseObject.error || exception.name;

        // Extract messages (can be array for validation errors or single string)
        if (Array.isArray(responseObject.message)) {
          messages = responseObject.message;
        } else if (responseObject.message) {
          messages = [responseObject.message];
        } else {
          messages = [exception.message];
        }
      }
    } else if (exception instanceof Error) {
      name = exception.name;
      messages = [exception.message];
    } else if (typeof exception === "object" && exception !== null) {
      const ex = exception as any;
      name = ex.name || "UnknownError";
      messages = [ex.message || "Unknown error occurred"];
    }

    // Create standardized error response object
    const errorResponse: ErrorDto = {
      name,
      messages,
      request: `${status} ${request.method} ${request.url}`,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
