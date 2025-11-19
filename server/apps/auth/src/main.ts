import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  console.log(process.env.AUTHPORT);
  const app = await NestFactory.create(AuthModule);
  await app.listen(process.env.AUTHPORT ?? 3002);
}
bootstrap();
