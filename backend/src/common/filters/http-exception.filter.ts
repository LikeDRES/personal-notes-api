import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

interface ErrorResponse {
  error?: string;
  message?: string | string[];
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let title = "Internal Server Error";
    let detail = "Unexpected error occurred";
    let type = "https://httpstatuses.com/500";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === "string") {
        detail = res;
      } else if (typeof res === "object" && res !== null) {
        const r = res as ErrorResponse;

        if (r.error && typeof r.error === "string") {
          title = r.error;
        }

        if (typeof r.message === "string") {
          detail = r.message;
        } else if (Array.isArray(r.message)) {
          detail = r.message.join(", ");
        }

        type = `https://httpstatuses.com/${status}`;
      }
    }

    response.status(status).json({
      type,
      title,
      status,
      detail,
      instance: request.url,
    });
  }
}
