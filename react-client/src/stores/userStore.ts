import { apiGetMe, apiLogout } from "@/services/api/user"
import type { User } from "@/types/user"
import { AppError } from "@/utils/appError"
import { create } from "zustand"

interface UserState {
  user: User | null
  appError: AppError | null
  initUser: (returnUrl: string) => Promise<void>
  logout: () => void
  redirectToLogin: () => void
}

function getUserFromStorage(): User | null {
  const stored = localStorage.getItem("user")
  return stored ? (JSON.parse(stored) as User) : null
}

function setUserToStorage(user: User) {
  localStorage.setItem("user", JSON.stringify(user))
}

function clearUserFromStorage() {
  localStorage.removeItem("user")
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  appError: null,

  redirectToLogin: () => {
    window.location.href = `http://localhost:5298/api/user/login?returnUrl=${location.pathname}`
  },

  initUser: async (returnUrl: string) => {
    try {
      const stored = getUserFromStorage()
      if (stored) {
        set({ user: stored, appError: null })
        return
      }

      const user = await apiGetMe()
      setUserToStorage(user)
      set({ user, appError: null })
    } catch (err) {
      if (err instanceof AppError) {
        set({ appError: err })
        if (err.type === "UNAUTHORIZED") {
          window.location.href = `http://localhost:5298/api/user/login?returnUrl=${returnUrl}`
        }
      }
    }
  },

  logout: async () => {
    clearUserFromStorage()
    set({ user: null, appError: null })
    await apiLogout()
  },
}))
