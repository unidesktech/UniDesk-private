import { Module } from '@nestjs/common';
import { RequestDemoController } from './request-demo.controller';
import { RequestDemoService } from './request-demo.service';
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
  controllers: [RequestDemoController],
  providers: [RequestDemoService],
})
export class RequestDemoModule {}
