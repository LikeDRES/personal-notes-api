import { Injectable, NestMiddleware, BadRequestException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { validate as isUuid } from "uuid";

@Injectable()
export class UuidValidationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const id = req.params?.id;

    if (id && !isUuid(id)) {
      throw new BadRequestException("Invalid UUID format for 'id' parameter");
    }
    next();
  }
}
