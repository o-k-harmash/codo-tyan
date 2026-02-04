import { Link } from "react-router"
import { Logo } from "./Logo"
import GridDots from "@/assets/grid_dots.svg?react"
import Exit from "@/assets/exit.svg?react"
import { useEffect, useState } from "react"
import { Overlay } from "./Overlay"
import { navigationVM } from "."
import { useLocation } from "react-router"

export function Navbar() {
  const location = useLocation()

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  useEffect(() => {
    setIsOverlayOpen(false)
  }, [location.pathname])

  const toogleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }

  return (
    <>
      <nav className="h-14 border-b border-gray-300 py-(--space-sm)">
        <div className="container-sm flex items-center justify-between">
          <Logo />

          <button className="btn btn--ghost" onClick={toogleOverlay}>
            <GridDots />
          </button>
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

          <Logo></Logo>

          <div className="py-(--space-md)">
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
        </div>
      </Overlay>
    </>
  )
}
