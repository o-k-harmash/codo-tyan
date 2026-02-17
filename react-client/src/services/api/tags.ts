import ApiError from "@/utils/apiError"
import { apiService } from "."

export async function apiGetTags(): Promise<string[]> {
  try {
    const res = await apiService.get<string[], unknown>("/tags")

    if (!res.ok) {
      throw new ApiError({
        message: "Failed to fetch tags",
        status: res.status,
      })
    }

    if (!res.data) {
      throw new ApiError({
        message: "Tags response is empty",
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
