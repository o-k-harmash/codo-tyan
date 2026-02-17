import type { UpdateUserResult, ValidationErrors } from "@/types/result"
import { apiService, BASE_URL } from "."
import type { User } from "@/types/user"
import ApiError from "@/utils/apiError"

export async function apiGetMe(): Promise<User | null> {
  try {
    const res = await apiService.get<User, unknown>("/user/me")

    if (!res.ok) {
      if (res.status === 401) {
        return null
      }

      throw new ApiError({
        message: "Unexpected response from /user/me",
        status: res.status,
      })
    }

    if (!res.data) {
      throw new ApiError({
        message: "User data is missing in response",
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

export async function apiUpdateUser(
  userName: string,
  email: string,
  firstName: string,
  lastName: string,
  userAvatar: File | null,
): Promise<UpdateUserResult> {
  const formData = new FormData()

  formData.append("userName", userName)
  formData.append("email", email)
  formData.append("firstName", firstName)
  formData.append("lastName", lastName)

  if (userAvatar) {
    formData.append("userAvatar", userAvatar)
  }

  try {
    const res = await apiService.postForm<User, ValidationErrors>(
      "/user",
      formData,
    )

    if (!res.ok) {
      if (res.status === 422) {
        return {
          ok: false,
          errors: res.error,
        }
      }

      throw new ApiError({
        message: "Unexpected response from /user",
        status: res.status,
      })
    }

    if (!res.data) {
      throw new ApiError({
        message: "Updated user data is missing",
        status: res.status,
      })
    }

    return {
      ok: true,
      user: res.data,
    }
  } catch (e) {
    throw new ApiError({
      ...(e as Error),
    })
  }
}

export async function apiLogout(): Promise<void> {
  try {
    const res = await apiService.get<void, unknown>("/user/logout")

    if (!res.ok) {
      throw new ApiError({
        message: "Logout failed",
        status: res.status,
      })
    }
  } catch (e) {
    throw new ApiError({
      ...(e as Error),
    })
  }
}

export function redirectToLogin() {
  window.location.href = `${BASE_URL}/user/login?returnUrl=${location.pathname}`
}
