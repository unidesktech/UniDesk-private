import { NestFactory } from '@nestjs/core';
import { SchoolModule } from './school.module';
import { writeToConsole } from '@app/common/utils/writeToConsole';

async function bootstrap() {
  const app = await NestFactory.create(SchoolModule);
  await app.listen(process.env.SCHOOL_PORT ?? 3004, () => {
    writeToConsole.log(
      `School Service is running on port ${process.env.SCHOOL_PORT ?? 3001}`,
    );
  });
}
bootstrap();
