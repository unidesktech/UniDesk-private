import { NestFactory, Reflector } from '@nestjs/core';
import { FaqModule } from './faq.module';
import { LoggingInterceptor } from '@app/common/logger/logging.interceptor';
import { AppLogger } from '@app/common';
import { TrackInterceptor } from '@app/common/logger/track.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(FaqModule);

  app.enableCors({
    origin: process.env.FRONTENDURL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalInterceptors(
    new LoggingInterceptor(new AppLogger()),
    new TrackInterceptor(new AppLogger(), new Reflector()),
  );
  await app.listen(process.env.FAQPORT ?? 3005);
}
bootstrap();
