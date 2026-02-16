import type { ArticleResponse, ArticlesResponse } from "@/types/response"
import { apiService, handleError } from "."
import errors from "@/utils/appError"

export async function apiGetArticles(
  page: number,
  articlesPageLimit: number,
  tags: Set<string>,
): Promise<ArticlesResponse> {
  try {
    const params = {
      page: page - 1,
      limit: articlesPageLimit,
      tags: Array.from(tags),
    }

    const res = await apiService.get("/articles/list", params)

    if (!res.ok) {
      throw errors.serverError(res.status)
    }

    const data = await res.json()

    return data
  } catch (error) {
    throw handleError(error)
  }
}

export async function apiGetArticle(
  articleId: string,
): Promise<ArticleResponse> {
  try {
    const res = await apiService.get(`/articles/${articleId}`)

    if (!res.ok) {
      if (res.status === 404) {
        throw errors.notfoundError()
      }

      throw errors.serverError(res.status)
    }

    return res.json()
  } catch (error) {
    throw handleError(error)
  }
}
