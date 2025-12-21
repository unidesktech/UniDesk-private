import { NestFactory } from '@nestjs/core';
import { StudentModule } from './student.module';

async function bootstrap() {
  const app = await NestFactory.create(StudentModule);
  await app.listen(process.env.STUDENTPORT ?? 3006);
}
bootstrap();
