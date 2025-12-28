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
          retryStrategy: (times) => {
            return Math.min(times * 1000, 30000);
          },
        });

        redis.on('connect', () => {
          console.log('[Redis] Connected');
        });

        redis.on('error', (err) => {
          console.error('[Redis] Error:', err.message);
        });

        redis.on('close', () => {
          console.warn('[Redis] Connection closed');
        });

        return redis;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
