import { Injectable } from '@nestjs/common';
import { Track } from '@app/common/logger/track.decorator';
import { PrismaService } from '@app/prisma';
import { FaqCategoryDTO, ArticleDTO, FaqTopicDTO } from '@app/dto/faq.dto';
import { ResponseDto } from '@app/dto/response.dto';
import { randomUUID } from 'crypto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { equal } from 'assert';

@Injectable()
export class FaqService {
  constructor(private prismaService: PrismaService) {}

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
      const exists = await this.prismaService.faqCategory.findFirst({
        where: {
          ...(body.faq_id && { faq_id: body.faq_id }),
          ...(body.name && {
            name: { equals: body.name, mode: 'insensitive' },
          }),
        },
      });
      if (exists) {
        const update = await this.prismaService.faqCategory.update({
          where: { faq_id: body.faq_id },
          data: { name: body.name },
        });
        return {
          success: true,
          message: 'Faq Category updated sucessfully',
          data: update,
        };
      }

      const category = await this.prismaService.faqCategory.create({
        data: {
          name: body.name || '',
          desc: body.desc || '',
          icon: body.icon || '',
          color: body.color || '',
        },
      });
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
    try {
      const categories = await this.prismaService.faqCategory.findMany({
        include: {
          _count: {
            select: { articles: true },
          },
        },
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

      return {
        success: true,
        message: 'Categories fetched successfully',
        data: formatted,
      };
    } catch (error) {
      writeToConsole.error(
        `Error in FaqService.getAllCategories: ${String(error)}`,
      );
      return {
        success: false,
        message: 'Failed to fetch categories',
        data: null,
      };
    }
  }

  @Track()
  async saveTopic(body: FaqTopicDTO): Promise<ResponseDto<any | null>> {
    try {
      const exists = await this.prismaService.faqTopic.findFirst({
        where: {
          ...(body.topic_id && { topic_id: body.topic_id }),
          ...(body.name && {
            name: { equals: body.name, mode: 'insensitive' },
          }),
        },
      });
      if (exists) {
        const updated = await this.prismaService.faqTopic.update({
          where: { topic_id: exists.topic_id },
          data: { name: body.name },
        });

        return {
          success: true,
          message: 'Faq Topic updated successfully',
          data: updated,
        };
      }
      const created = await this.prismaService.faqTopic.create({
        data: {
          name: body.name || "",
          icon: body.icon || "",
        },
      });

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
    try {
      const topics = await this.prismaService.faqTopic.findMany({
        orderBy: { name: 'asc' },
        include: {
          _count: { select: { articles: true } },
        },
      });

      const formatted = topics.map((t) => ({
        topic_id: t.topic_id,
        name: t.name,
        icon: t.icon,
        articles_count: t._count.articles,
      }));

      return {
        success: true,
        message: 'Topics fetched successfully',
        data: formatted,
      };
    } catch (error) {
      writeToConsole.error(`Error in getAllTopics: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to fetch topics',
        data: null,
      };
    }
  }

  @Track()
  async saveArticle(body: ArticleDTO): Promise<ResponseDto<any>> {
    try {
      const exists = await this.prismaService.article.findFirst({
        where: {
          OR: [{ article_id: body.article_id }, { question: body.question }],
        },
      });

      if (exists) {
        const updated = await this.prismaService.article.update({
          where: { article_id: exists.article_id },
          data: {
            question: body.question,
            answer: body.answer,
            points: body.points,
            category_id: body.category_id,
            topic_id: body.topic_id,
          },
        });

        return {
          success: true,
          message: 'Article updated successfully',
          data: updated,
        };
      }

      const article = await this.prismaService.article.create({
        data: {
          article_id: randomUUID(),
          question: body.question,
          answer: body.answer,
          points: body.points,
          topic_id: body.topic_id,
          category_id: body.category_id,
        },
      });

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
  }): Promise<ResponseDto<any | null>> {
    try {
      const articles = await this.prismaService.article.findMany({
        where: {
          ...(params.category_id && { category_id: params.category_id }),
          ...(params.topic_id && { topic_id: params.topic_id }),
          ...(params.search && {
            OR: [
              { article_id: params.search },
              { question: { contains: params.search, mode: 'insensitive' } },
              { answer: { contains: params.search, mode: 'insensitive' } },
              { points: { has: params.search } },
            ],
          }),
        },
        orderBy: { created_at: 'desc' },
      });

      return {
        success: true,
        message: 'Articles fetched successfully',
        data: articles,
      };
    } catch (error) {
      writeToConsole.error(`Error in FaqService.getArticlesByBody: ${error}`);
      return {
        success: false,
        message: 'Failed to fetch articles',
        data: null,
      };
    }
  }
}
