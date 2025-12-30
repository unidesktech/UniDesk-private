import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma';
import { RedisModule } from 'libs/redis/redis.module';
import { RedisCacheService } from 'libs/redis/redis-cache.service';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [FaqController],
  providers: [FaqService, RedisCacheService],
})
export class FaqModule {}
