import type { Article, ArticlePreview } from "./article"

export interface ArticlesResponse {
  articles: ArticlePreview[]
  totalPages: number
}

export type ArticleResponse = Article
