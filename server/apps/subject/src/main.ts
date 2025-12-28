import { NestFactory } from '@nestjs/core';
import { SubjectModule } from './subject.module';

async function bootstrap() {
  const app = await NestFactory.create(SubjectModule);
  await app.listen(process.env.MANAGEMENT_SUBJECT_PORT ?? 6003);
}
bootstrap();
