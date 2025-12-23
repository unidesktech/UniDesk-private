import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Module({
  providers: [TeacherService]
})
export class TeacherModule {}
