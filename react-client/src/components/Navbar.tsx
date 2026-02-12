import { Link, useNavigate } from "react-router"
import { Logo } from "./Logo"
import GridDots from "@/assets/grid_dots.svg?react"
import Exit from "@/assets/exit.svg?react"
import { useEffect, useState } from "react"
import { Overlay } from "./Overlay"
import { navigationVM } from "."
import { useLocation } from "react-router"
import { useUserStore } from "@/stores/userStore"
import UserActions from "./UserActions"

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const { user, appError, initUser, logout, redirectToLogin } = useUserStore()

  useEffect(() => {
    setIsOverlayOpen(false)
    initUser(location.pathname)
  }, [location.pathname, initUser])

  const toogleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }

  if (appError) {
    switch (appError.type) {
      default:
        navigate("/500", { state: { status: 500 }, replace: true })
        break
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="c-container flex items-center justify-between">
          <Logo />

          <button
            className="navbar__burger btn btn--ghost"
            onClick={toogleOverlay}
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

            {user ? (
              <div className="navbar__user">
                <img
                  className="navbar__user-avatar"
                  src={`data:image/png;base64,${user.avatar}`}
                  alt="avatar"
                />
                <div className="navbar__user-tooltip">
                  <UserActions
                    user={user}
                    logout={logout}
                    redirectToLogin={redirectToLogin}
                  />
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
            onClick={toogleOverlay}
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
            <UserActions
              user={user}
              logout={logout}
              redirectToLogin={redirectToLogin}
            />
          </div>
        </div>
      </Overlay>
    </>
  )
}
