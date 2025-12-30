import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redis = new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: Number(process.env.REDIS_PORT) || 6379,

          lazyConnect: true,
          enableOfflineQueue: false,
          maxRetriesPerRequest: 3,
          connectTimeout: 2000,

          retryStrategy: () => null,
        });

        redis.connect().catch(() => {
          console.warn('[Redis] Disabled (connection failed)');
        });

        return redis;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
