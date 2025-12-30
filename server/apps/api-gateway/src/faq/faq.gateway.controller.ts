import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FaqGatewayService } from './faq.gateway.service';
import { ArticleDTO, FaqCategoryDTO, FaqTopicDTO } from '@app/dto/faq.dto';

@Controller('faq')
export class FaqGatewayController {
  constructor(private readonly faqGatewayService: FaqGatewayService) {}

  @Post('category/save')
  saveCategory(@Body() body: FaqCategoryDTO) {
    return this.faqGatewayService.saveCategory(body);
  }

  @Get('topic/getAll')
  getAllTopics() {
    return this.faqGatewayService.getAllTopics();
  }
  @Post('topic/save')
  saveTopic(@Body() body: FaqTopicDTO) {
    return this.faqGatewayService.saveTopic(body);
  }

  @Get('category/getAll')
  getAllCategories() {
    return this.faqGatewayService.getAllCategories();
  }

  @Post('article/save')
  saveArticle(@Body() body: ArticleDTO) {
    return this.faqGatewayService.saveArticle(body);
  }

  @Get('articles/get')
  getArticles(
    @Query('category_id') category_id?: string,
    @Query('topic_id') topic_id?: string,
    @Query('search') search?: string,
  ) {
    return this.faqGatewayService.getArticle(category_id, topic_id, search);
  }
}
