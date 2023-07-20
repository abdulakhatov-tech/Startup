import { ArticleType } from '@/src/interfaces/article.interface';

export interface ArticlePageComponentProps {
  articles: ArticleType[];
}

export interface ArticleDetailedProps {
  article: ArticleType;
}
