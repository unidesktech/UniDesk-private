import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from '../logger/logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Incoming Request: ${req.method} ${req.originalUrl}`,
      'HTTP',
    );
    next();
  }
}
