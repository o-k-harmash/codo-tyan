import { http } from "@/utils/httpClient"

export const apiService = http.create(import.meta.env.VITE_SERVER_BASE_URL)

export function handleError(
  error: unknown,
  errorMessage?: string,
): Record<string, string> {
  return {
    _error:
      error instanceof Error
        ? error.name
        : (errorMessage ?? "unknown exception"),
  }
}
