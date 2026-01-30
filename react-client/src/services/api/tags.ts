import { apiService, handleError } from "."

export async function apiGetTags(): Promise<string[]> {
  try {
    const response = await apiService.get("tags")
    return response.json()
  } catch (err) {
    // return ["TS", "Web"]
    throw handleError(err, "error while fetching tags")
  }
}
