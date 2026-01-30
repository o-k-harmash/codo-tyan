import { Link } from "react-router"
import { Logo } from "./Logo"
import GridDots from "@/assets/grid_dots.svg?react"
import Exit from "@/assets/exit.svg?react"
import Home from "@/assets/home.svg?react"
import Heart from "@/assets/heart.svg?react"
import Note from "@/assets/note.svg?react"
import Comment from "@/assets/comment.svg?react"
import Important from "@/assets/important.svg?react"
import { useReducer } from "react"
import { Overlay } from "./Overlay"

const vm = {
  navigation: [
    { icon: Home, label: "Home", href: "/home" },
    { icon: Note, label: "All Articles", href: "/articles" },
    { icon: Important, label: "About", href: "/about" },
    { icon: Heart, label: "Support us", href: "/support" },
    { icon: Comment, label: "Community", href: "/community" },
  ],
}

const TOOGLE_OVERLAY = (state: boolean) => {
  return !state
}

export function Navbar() {
  const [isOverlayOpen, setIsOverlayOpen] = useReducer(TOOGLE_OVERLAY, false)

  return (
    <>
      <nav className="h-14 border-b border-gray-300 py-(--space-sm)">
        <div className="container-sm flex items-center justify-between">
          <Logo />

          <button className="btn btn--ghost" onClick={setIsOverlayOpen}>
            <GridDots />
          </button>
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

          <Logo></Logo>

          <div className="py-(--space-md)">
            {vm.navigation.map((n, i) => (
              <Link key={i} to={n.href} className="nav__item">
                <n.icon /> {n.label}
              </Link>
            ))}
          </div>
        </div>
      </Overlay>
    </>
  )
}
