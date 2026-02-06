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
    /**
     * TODO: possible to add different validation for complex api contracts for example handle different statuses but
     * it is include return status to the ui and handle it for user
     * example of different reasones see: https://web.dev/articles/fetch-api-error-handling?hl=ru#when_the_network_status_code_represents_an_error
     */
    const res = await apiService.get("articles/list", params)

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
    const res = await apiService.get(`articles/${articleId}`)

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
