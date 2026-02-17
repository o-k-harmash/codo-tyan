import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiError from "@/utils/apiError"
import { useUserStore } from "@/stores/userStore"

export default function useApiError() {
  const navigate = useNavigate()
  const { logout } = useUserStore()
  const [error, _setError] = useState<ApiError | null>(null)

  const setError = useCallback((err: unknown) => {
    if (err instanceof ApiError) {
      _setError(err)
      return
    }
  }, [])

  const clearError = useCallback(() => {
    _setError(null)
  }, [])

  useEffect(() => {
    if (!error) {
      return
    }

    async function handleLogout() {
      await logout()
    }

    switch (error.status) {
      case 401:
        handleLogout()
        navigate("/401", { replace: true })
        break
      case 404:
        navigate("/404", { replace: true })
        break
      case 500:
      default:
        navigate("/500", { replace: true })
    }
  }, [error, navigate])

  return {
    error,
    setError,
    clearError,
  }
}
