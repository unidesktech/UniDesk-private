export interface ArticleDTO {
  article_id?: string;
  question: string;
  answer: string;
  points: string[];
  created_at: Date;
  updated_at: Date;
  category_id: string;
  topic_id: string;
}

export interface FaqCategoryDTO {
  faq_id?: string;
  name: string;
  desc?: string;
  icon?: string;
  color?: string;
  articles?: ArticleDTO[];
  created_at: Date;
  updated_at?: Date;
}

export interface FaqTopicDTO {
  topic_id?: string;
  name: string;
  icon?: string;
}