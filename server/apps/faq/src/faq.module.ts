import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
