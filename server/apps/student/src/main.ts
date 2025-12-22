import { StudentModule } from './student.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { LoggingInterceptor } from '@app/common/logger/logging.interceptor';
import { AppLogger } from '@app/common';
import { TrackInterceptor } from '@app/common/logger/track.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(StudentModule);
    app.useGlobalInterceptors(
    new LoggingInterceptor(new AppLogger()),
    new TrackInterceptor(new AppLogger(), new Reflector()),
  );
  await app.listen(process.env.STUDENTPORT ?? 3007);
}
bootstrap();