import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { AppLogger } from './logger.service';
import { TRACK } from './track.decorator';
import { writeToConsole } from '../utils/writeToConsole';

@Injectable()
export class TrackInterceptor implements NestInterceptor {
  constructor(
    private logger: AppLogger,
    private reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isTracked = this.reflector.get<boolean>(TRACK, context.getHandler());

    if (!isTracked) {
      return next.handle();
    }

    const handler = context.getHandler().name;
    const className = context.getClass().name;

    const args: unknown[] = context.getArgs();

    const start = Date.now();

    this.logger.log(`→ ${className}.${handler}() called`, 'TRACK');

    try {
      const firstArg: unknown = args[0];
      let body = {};
      if (firstArg && typeof firstArg === 'object' && 'body' in firstArg) {
        body = (firstArg as { body: unknown }).body ?? {};
      }
      this.logger.debug(`Args: ${JSON.stringify(body)}`, 'TRACK');
    } catch {
      writeToConsole.error('Failed to log arguments for tracking interceptor');
    }

    return next.handle().pipe(
      tap((result) => {
        const duration = Date.now() - start;
        this.logger.log(
          `← ${className}.${handler}() completed (${duration}ms)`,
          'TRACK',
        );
        this.logger.debug(`Return: ${JSON.stringify(result)}`, 'TRACK');
      }),
    );
  }
}
