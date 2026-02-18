import { Link } from "react-router"
import { Logo } from "./Logo"
import GridDots from "@/assets/grid_dots.svg?react"
import Exit from "@/assets/exit.svg?react"
import { useEffect, useLayoutEffect, useReducer } from "react"
import { Overlay } from "./Overlay"
import { navigationVM } from "."
import { useLocation } from "react-router"
import UserActions from "./UserActions"
import useApiError from "@/hooks/useApiError"
import { useUserStore } from "@/stores/userStore"
import { apiGetMe, redirectToLogin } from "@/services/api/user"
import Sunny from "@/assets/sunny.svg?react"
import Moon from "@/assets/moon.svg?react"

function getInitialTheme(): boolean {
  const stored = localStorage.getItem("darkTheme")
  return stored ? JSON.parse(stored) : false
}

const TOOGLE_FLAG = (state: boolean) => {
  return !state
}

export function Navbar() {
  const location = useLocation()

  const [isOverlayOpen, setIsOverlayOpen] = useReducer(TOOGLE_FLAG, false)
  const { setError } = useApiError()
  const { user, setUser, logout } = useUserStore()
  const [isDarkTheme, setIsDarkTheme] = useReducer(
    TOOGLE_FLAG,
    getInitialTheme(),
  )

  useLayoutEffect(() => {
    const root = document.documentElement

    if (isDarkTheme) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("darkTheme", JSON.stringify(isDarkTheme))
  }, [isDarkTheme])

  useEffect(() => {
    async function initUser() {
      try {
        const user = await apiGetMe()

        if (user) {
          setUser(user)
        }
      } catch (e) {
        setError(e)
      }
    }

    initUser()
  }, [setUser])

  return (
    <>
      <nav className="navbar">
        <div className="c-container flex items-center justify-between">
          <Logo />

          <button
            className="navbar__burger btn btn--ghost"
            onClick={setIsOverlayOpen}
          >
            <GridDots />
          </button>

          <div className="navbar__menu">
            <div className="navbar__links">
              {navigationVM.map((n, i) => (
                <Link
                  key={i}
                  to={n.href}
                  className="navbar__link"
                  data-current={location.pathname === n.href}
                >
                  {n.label}
                </Link>
              ))}
            </div>

            <button className="navbar__theme" onClick={setIsDarkTheme}>
              {isDarkTheme ? <Sunny /> : <Moon />}
            </button>

            {user ? (
              <div className="navbar__user">
                <img
                  className="navbar__user-avatar"
                  src={`data:image/png;base64,${user.avatarBase64}`}
                  alt="avatar"
                />
                <div className="navbar__user-tooltip">
                  <UserActions user={user} logout={logout} />
                </div>
              </div>
            ) : (
              <button
                className="navbar__login btn btn--filled"
                onClick={redirectToLogin}
              >
                Get started
              </button>
            )}
          </div>
        </div>
      </nav>

      <Overlay visible={isOverlayOpen}>
        <div className="overlay__panel">
          <button
            className="btn btn--ghost absolute left-full"
            onClick={setIsOverlayOpen}
          >
            <Exit className="text-gray-500" />
          </button>

          <Logo />

          <div className="overlay__section">
            {navigationVM.map((n, i) => (
              <Link
                key={i}
                to={n.href}
                className="nav__item"
                data-current={location.pathname === n.href}
              >
                <n.icon /> {n.label}
              </Link>
            ))}
          </div>
          <hr />
          <div className="overlay__section">
            <button className="nav__item" onClick={setIsDarkTheme}>
              {isDarkTheme ? (
                <>
                  <Sunny /> Light mode
                </>
              ) : (
                <>
                  <Moon /> Dark mode
                </>
              )}
            </button>

            <UserActions user={user} logout={logout} />
          </div>
        </div>
      </Overlay>
    </>
  )
}
