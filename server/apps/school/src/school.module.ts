import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
