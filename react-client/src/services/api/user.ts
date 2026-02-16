import errors from "@/utils/appError"
import { apiService, handleError } from "."
import type { User } from "@/types/user"

export async function apiGetMe(): Promise<User> {
  try {
    const res = await apiService.get("/user/me")

    if (!res.ok) {
      if (res.status === 401) {
        throw errors.unauthorizedError()
      }

      throw errors.serverError(res.status)
    }

    return res.json()
  } catch (error) {
    throw handleError(error)
  }
}

export async function apiUpdateUser(
  userName: string,
  email: string,
  firstName: string,
  lastName: string,
  userAvatar: File | null,
) {
  try {
    const formData = new FormData()

    formData.append("userName", userName)
    formData.append("email", email)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)

    if (userAvatar) {
      formData.append("userAvatar", userAvatar)
    }

    const res = await apiService.post("/user", formData)

    if (!res.ok) {
      if (res.status === 422) {
        throw errors.validationError(await res.json())
      }
      throw errors.serverError(res.status)
    }

    return await res.json()
  } catch (error) {
    throw handleError(error)
  }
}

export async function apiLogout(): Promise<void> {
  try {
    const res = await apiService.get("/user/logout")

    if (!res.ok) {
      throw errors.serverError(res.status)
    }
  } catch (error) {
    throw handleError(error)
  }
}
