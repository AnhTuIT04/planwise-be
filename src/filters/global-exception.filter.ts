import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

import { ErrorDto } from "@/common/dto/error.dto";

function error(request: Request, response: Response, name: string, message: string, status: HttpStatus) {
  return response.status(status).json(new ErrorDto(name, message, `${status} ${request.method} ${request.url}`));
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let name = "InternalServerError";
    let message = "Internal server error";
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === "string") {
        return error(request, response, exception.name, res, status);
      }

      if (typeof res === "object" && res !== null) {
        const obj = res as Record<string, any>;
        name = obj.error || exception.name;

        if (Array.isArray(obj.message) && typeof obj.message[0] === "string") {
          message = obj.message[0].trim() || "Unexpected error occurred";
        } else if (typeof obj.message === "string") {
          message = obj.message.trim() || "Unexpected error occurred";
        } else {
          message = "Unexpected error occurred";
        }

        return error(request, response, name, message, status);
      }
    }

    return error(request, response, name, message, status);
  }
}
