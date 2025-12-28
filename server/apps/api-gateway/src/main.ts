import { NestFactory, Reflector } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { AppLogger } from '@app/common';
import { TrackInterceptor } from '@app/common/logger/track.interceptor';
import { LoggingInterceptor } from '@app/common/logger/logging.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH',
    credentials: true,
  });
  app.useGlobalInterceptors(
    new LoggingInterceptor(new AppLogger()),
    new TrackInterceptor(new AppLogger(), new Reflector()),
  );
  await app.listen(process.env.APIGATEWAY_PORT ?? 5000, () => {
    console.log('Server running in port', process.env.APIGATEWAY_PORT);
  });
}
bootstrap();
