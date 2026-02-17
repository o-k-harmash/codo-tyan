import { apiLogout } from "@/services/api/user"
import type { User } from "@/types/user"
import { create } from "zustand"

interface UserState {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
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
  user: getUserFromStorage(),

  setUser: (user: User) => {
    setUserToStorage(user)
    set({ user })
  },

  logout: async () => {
    await apiLogout()
    clearUserFromStorage()
    set({ user: null })
  },
}))
