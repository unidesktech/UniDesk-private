import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqCategoryDTO, ArticleDTO, FaqTopicDTO } from '@app/dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post('category/save')
  saveCategory(@Body() body: FaqCategoryDTO) {
    return this.faqService.saveCategory(body);
  }

  @Get('topic/getAll')
  getAllTopics() {
    return this.faqService.getAllTopics();
  }
  @Post('topic/save')
  saveTopic(@Body() body: FaqTopicDTO) {
    return this.faqService.saveTopic(body);
  }

  @Get('category/getAll')
  getAllCategories() {
    return this.faqService.getAllCategories();
  }

  @Post('article/save')
  saveArticle(@Body() body: ArticleDTO) {
    return this.faqService.saveArticle(body);
  }

  @Get('article/get')
  getArticles(
    @Query('category_id') category_id?: string,
    @Query('topic_id') topic_id?: string,
    @Query('search') search?: string,
  ) {
    return this.faqService.getArticle({
      category_id,
      topic_id,
      search,
    });
  }
}
