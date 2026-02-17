import type { ArticleResult, ArticlesResult } from "@/types/result"
import { apiService } from "."
import ApiError from "@/utils/apiError"

export async function apiGetArticles(
  page: number,
  articlesPageLimit: number,
  tags: Set<string>,
): Promise<ArticlesResult> {
  const params = {
    page: page - 1,
    limit: articlesPageLimit,
    tags: Array.from(tags),
  }

  try {
    const res = await apiService.get<ArticlesResult, unknown>(
      "/articles/list",
      params,
    )

    if (!res.ok) {
      throw new ApiError({
        message: "Failed to fetch articles",
        status: res.status,
      })
    }

    if (!res.data) {
      throw new ApiError({
        message: "Articles response is empty",
        status: res.status,
      })
    }

    return res.data
  } catch (e) {
    throw new ApiError({
      ...(e as Error),
    })
  }
}

export async function apiGetArticle(
  slug: string,
): Promise<ArticleResult | null> {
  try {
    const res = await apiService.get<ArticleResult, unknown>(
      `/articles/${slug}`,
    )

    if (!res.ok) {
      if (res.status === 404) {
        throw new ApiError({
          message: `Cannot find article with slug: ${slug}`,
          status: res.status,
        })
      }

      throw new ApiError({
        message: "Failed to fetch article",
        status: res.status,
      })
    }

    if (!res.data) {
      throw new ApiError({
        message: "Article response is empty",
        status: res.status,
      })
    }

    return res.data
  } catch (e) {
    throw new ApiError({
      ...(e as Error),
    })
  }
}
