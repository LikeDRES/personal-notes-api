import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class HeaderSanitizerMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction): void {
    res.removeHeader("x-powered-by");
    next();
  }
}
