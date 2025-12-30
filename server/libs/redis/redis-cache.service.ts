import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name);
  private readonly enabled: boolean;

  constructor(
    @Optional()
    @Inject('REDIS_CLIENT')
    private readonly redis?: Redis,
  ) {
    this.enabled = !!redis;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.enabled) return null;

    try {
      const value = await this.redis!.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (!this.enabled) return;

    try {
      await this.redis!.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch {
      this.logger.error('Unable to set redis cache');
    }
  }

  async del(key: string): Promise<void> {
    if (!this.enabled) return;

    try {
      await this.redis!.del(key);
    } catch {
      this.logger.error('Unable to delete redis cache');
    }
  }

  async delByPattern(pattern: string): Promise<void> {
    if (!this.enabled) return;

    try {
      const stream = this.redis!.scanStream({ match: pattern, count: 100 });
      for await (const keys of stream as AsyncIterable<string[]>) {
        if (keys.length) {
          await this.redis!.del(...keys);
        }
      }
    } catch {
      this.logger.error('Unable to detete by pattern redis cache');
    }
  }
}
