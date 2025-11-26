import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppLogger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler().name;
    const controller = context.getClass().name;

    const timeStart = Date.now();

    this.logger.log(`START → ${controller}.${handler}()`, 'FLOW');

    return next.handle().pipe(
      tap((data) => {
        const time = Date.now() - timeStart;
        this.logger.log(`END → ${controller}.${handler}() | ${time}ms`, 'FLOW');

        this.logger.debug(`OUTPUT: ${JSON.stringify(data)}`, 'FLOW-RESULT');
      }),
    );
  }
}
