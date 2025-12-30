import { Injectable } from '@nestjs/common';
import { Track } from '@app/common/logger/track.decorator';
import { PrismaService } from '@app/prisma';
import { FaqCategoryDTO, ArticleDTO, FaqTopicDTO } from '@app/dto/faq.dto';
import { ResponseDto } from '@app/dto/response.dto';
import { randomUUID } from 'crypto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { sanitizeParams } from '@app/common/utils/FormatFunctions';
import { CACHE_VERSIONS } from 'cache-keys';
import { RedisCacheService } from 'libs/redis/redis-cache.service';
@Injectable()
export class FaqService {
  constructor(
    private prismaService: PrismaService,
    private readonly cache: RedisCacheService,
  ) {}

  private faqCategoriesKey() {
    return `faq:${CACHE_VERSIONS.FAQ}:categories`;
  }

  private faqTopicsKey() {
    return `faq:${CACHE_VERSIONS.FAQ}:topics`;
  }

  private faqArticlesKey(params: {
    category_id?: string;
    topic_id?: string;
    search?: string;
  }) {
    const { category_id = 'all', topic_id = 'all', search = 'none' } = params;
    return `faq:${CACHE_VERSIONS.FAQ}:articles:${category_id}:${topic_id}:${search}`;
  }

  private async resetFaqCache() {
    await this.cache.delByPattern(`faq:${CACHE_VERSIONS.FAQ}:*`);
  }

  @Track()
  async saveCategory(body: FaqCategoryDTO): Promise<
    ResponseDto<{
      faq_id: string;
      name: string;
      desc: string;
      icon: string;
      color: string;
      created_at: Date;
      updated_at: Date;
    } | null>
  > {
    try {
      const exists = await this.prismaService.faq_categories.findFirst({
        where: {
          ...(body.faq_id && { faq_id: body.faq_id }),
          ...(body.name && {
            name: { equals: body.name, mode: 'insensitive' },
          }),
        },
      });
      if (exists) {
        const update = await this.prismaService.faq_categories.update({
          where: { faq_id: body.faq_id },
          data: { name: body.name },
        });
        await this.resetFaqCache();
        return {
          success: true,
          message: 'Faq Category updated sucessfully',
          data: update,
        };
      }

      const category = await this.prismaService.faq_categories.create({
        data: {
          name: body.name || '',
          desc: body.desc || '',
          icon: body.icon || '',
          color: body.color || '',
        },
      });

      await this.resetFaqCache();

      return {
        success: true,
        message: 'Faq Category created sucessfully',
        data: category,
      };
    } catch (error) {
      writeToConsole.error(
        `Error during Faq Category Saving: ${String(error)}`,
      );
      return {
        success: false,
        message: 'Faq Category Saving Failed',
        data: null,
      };
    }
  }

  async getAllCategories(): Promise<ResponseDto<any>> {
    const cacheKey = this.faqCategoriesKey();

    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return {
        success: true,
        message: 'Categories fetched successfully',
        data: cached,
      };
    }

    const categories = await this.prismaService.faq_categories.findMany({
      include: { _count: { select: { articles: true } } },
    });

    const formatted = categories.map((cat) => ({
      faq_id: cat.faq_id,
      name: cat.name,
      desc: cat.desc,
      icon: cat.icon,
      color: cat.color,
      created_at: cat.created_at,
      updated_at: cat.updated_at,
      articles_count: cat._count.articles,
    }));

    await this.cache.set(cacheKey, formatted, 3600);

    return {
      success: true,
      message: 'Categories fetched successfully',
      data: formatted,
    };
  }

  @Track()
  async saveTopic(body: FaqTopicDTO): Promise<ResponseDto<any>> {
    try {
      const exists = await this.prismaService.faq_topics.findFirst({
        where: {
          ...(body.topic_id && { topic_id: body.topic_id }),
          ...(body.name && {
            name: { equals: body.name, mode: 'insensitive' },
          }),
        },
      });
      if (exists) {
        const updated = await this.prismaService.faq_topics.update({
          where: { topic_id: exists.topic_id },
          data: { name: body.name },
        });
        await this.resetFaqCache();
        return {
          success: true,
          message: 'Faq Topic updated successfully',
          data: updated,
        };
      }
      const created = await this.prismaService.faq_topics.create({
        data: {
          name: body.name || '',
          icon: body.icon || '',
        },
      });
      await this.resetFaqCache();
      return {
        success: true,
        message: 'Faq Topic created successfully',
        data: created,
      };
    } catch (error) {
      writeToConsole.error(`Error in saveTopic: ${String(error)}`);
      return {
        success: false,
        message: 'Faq Topic save failed',
        data: null,
      };
    }
  }

  async getAllTopics(): Promise<ResponseDto<any>> {
    const cacheKey = this.faqTopicsKey();

    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return {
        success: true,
        message: 'Topics fetched successfully',
        data: cached,
      };
    }

    const topics = await this.prismaService.faq_topics.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { articles: true } } },
    });

    const formatted = topics.map((t) => ({
      topic_id: t.topic_id,
      name: t.name,
      icon: t.icon,
      articles_count: t._count.articles,
    }));

    await this.cache.set(cacheKey, formatted, 3600);

    return {
      success: true,
      message: 'Topics fetched successfully',
      data: formatted,
    };
  }

  @Track()
  async saveArticle(body: ArticleDTO): Promise<ResponseDto<any>> {
    try {
      const exists = await this.prismaService.articles.findFirst({
        where: {
          OR: [{ article_id: body.article_id }, { question: body.question }],
        },
      });

      if (exists) {
        const updated = await this.prismaService.articles.update({
          where: { article_id: exists.article_id },
          data: {
            question: body.question,
            answer: body.answer,
            points: body.points,
            category_id: body.category_id,
            topic_id: body.topic_id,
          },
        });
        await this.resetFaqCache();
        return {
          success: true,
          message: 'Article updated successfully',
          data: updated,
        };
      }

      const article = await this.prismaService.articles.create({
        data: {
          article_id: randomUUID(),
          question: body.question,
          answer: body.answer,
          points: body.points,
          topic_id: body.topic_id,
          category_id: body.category_id,
        },
      });
      await this.resetFaqCache();
      return {
        success: true,
        message: 'Article created successfully',
        data: article,
      };
    } catch (error) {
      writeToConsole.error(`Error in FaqService.saveArticle: ${String(error)}`);
      return {
        success: false,
        message: 'Operation failed',
        data: null,
      };
    }
  }

  async getArticle(params: {
    category_id?: string;
    topic_id?: string;
    search?: string;
  }): Promise<ResponseDto<any>> {
    const category_id = sanitizeParams(params.category_id);
    const topic_id = sanitizeParams(params.topic_id);
    const search = sanitizeParams(params.search);

    const cacheKey = this.faqArticlesKey({
      category_id,
      topic_id,
      search,
    });

    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return {
        success: true,
        message: 'Articles fetched successfully',
        data: cached,
      };
    }

    const articles = await this.prismaService.articles.findMany({
      where: {
        ...(category_id && { category_id }),
        ...(topic_id && { topic_id }),
        ...(search && {
          OR: [
            { article_id: search },
            { question: { contains: search, mode: 'insensitive' } },
            { answer: { contains: search, mode: 'insensitive' } },
            { points: { has: search } },
          ],
        }),
      },
      orderBy: { created_at: 'desc' },
    });

    await this.cache.set(cacheKey, articles, 1800); // 30 min

    return {
      success: true,
      message: 'Articles fetched successfully',
      data: articles,
    };
  }
}
