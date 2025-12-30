import { ArticleDTO, FaqCategoryDTO, FaqTopicDTO } from '@app/dto/faq.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FaqGatewayService {
  baseUrl = `${process.env.ENDPOINT_URL}:${process.env.FAQ_PORT}/faq`;

  async saveCategory(body: FaqCategoryDTO): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/category/save`, body);

    return response.data;
  }

  async getAllCategories(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/category/getAll`);

    return response.data;
  }
  async saveTopic(body: FaqTopicDTO): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/topic/save`, body);

    return response.data;
  }

  async getAllTopics(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/topic/getAll`);

    return response.data;
  }

  async saveArticle(body: ArticleDTO): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/article/save`, body);

    return response.data;
  }

  async getArticle(
    categoryId?: string,
    topicId?: string,
    search?: string,
  ): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/article/get?category_id=${categoryId}&topic_id=${topicId}&search=${search}`,
    );

    return response.data;
  }
}
