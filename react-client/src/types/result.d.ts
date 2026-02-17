import type { Article, ArticlePreview } from "./article"

export interface ArticlesResult {
  articles: ArticlePreview[]
  totalPages: number
}

export type ArticleResult = Article

export type ValidationErrors = Record<string, string>

export type UpdateUserResult =
  | { ok: true; user: User }
  | { ok: false; errors: ValidationErrors }
