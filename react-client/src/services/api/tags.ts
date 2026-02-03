import errors from "@/utils/appError"
import { apiService, handleError } from "."

export async function apiGetTags(): Promise<string[]> {
  try {
    const res = await apiService.get("tags")

    if (!res.ok) {
      throw errors.serverError(res.status)
    }

    return res.json()
  } catch (error) {
    // return ["TS", "Web"]
    throw handleError(error)
  }
}
