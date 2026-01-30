import type { Article } from "./article"

export interface ArticlesResponse {
  articles: Article[]
  totalPages: number
}
