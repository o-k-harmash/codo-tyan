import { BASE_URL } from "@/services/api"
import { apiGetMe, apiLogout, apiUpdateUser } from "@/services/api/user"
import type { User } from "@/types/user"
import { create } from "zustand"

interface UserState {
  user: User | null
  initUser: () => Promise<void>
  logout: () => void
  redirectToLogin: () => void
  updateUser: (
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    userAvatar: File | null,
  ) => Promise<void>
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

export const useUserStore = create<UserState>((set, get) => ({
  user: getUserFromStorage(),
  appError: null,

  redirectToLogin: () => {
    window.location.href = `${BASE_URL}/user/login?returnUrl=${location.pathname}`
  },

  initUser: async () => {
    if (get().user) {
      return
    }

    const user = await apiGetMe()
    setUserToStorage(user)
    set({ user })
  },

  updateUser: async (
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    userAvatar: File | null,
  ) => {
    const user = await apiUpdateUser(
      userName,
      email,
      firstName,
      lastName,
      userAvatar,
    )
    setUserToStorage(user)
    set({ user })
  },

  logout: async () => {
    clearUserFromStorage()
    set({ user: null })
    await apiLogout()
  },
}))
