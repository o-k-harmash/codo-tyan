import errors, { AppError } from "@/utils/appError"
import { http } from "@/utils/httpClient"

export const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

export const apiService = http.create(BASE_URL)

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  return errors.networkError(error)
}
