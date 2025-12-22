import { NestFactory } from '@nestjs/core';
import { ParentModule } from './parent.module';

async function bootstrap() {
  const app = await NestFactory.create(ParentModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
