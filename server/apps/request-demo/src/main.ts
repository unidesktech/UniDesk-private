import { NestFactory, Reflector } from '@nestjs/core';
import { RequestDemoModule } from './request-demo.module';
import { LoggingInterceptor } from '@app/common/logger/logging.interceptor';
import { AppLogger } from '@app/common';
import { TrackInterceptor } from '@app/common/logger/track.interceptor';
import { writeToConsole } from '@app/common/utils/writeToConsole';

async function bootstrap() {
  const app = await NestFactory.create(RequestDemoModule);
  app.useGlobalInterceptors(
    new LoggingInterceptor(new AppLogger()),
    new TrackInterceptor(new AppLogger(), new Reflector()),
  );
  await app.listen(process.env.REQUESTDEMOPORT ?? 3003, () => {
    writeToConsole.log(
      `Request Demo Service is running on port ${process.env.REQUESTDEMOPORT ?? 3003}`,
    );
  });
}
bootstrap();
