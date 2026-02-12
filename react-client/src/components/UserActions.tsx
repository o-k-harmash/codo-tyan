import { Link } from "react-router"
import Comment from "@/assets/comment.svg?react"
import Important from "@/assets/important.svg?react"
import type { User } from "@/types/user"

export default function UserActions({
  user,
  logout,
  redirectToLogin,
}: {
  user: User | null
  logout: () => void
  redirectToLogin: () => void
}) {
  if (!user) {
    return (
      <button className="nav__item" onClick={redirectToLogin}>
        <Comment /> Get started
      </button>
    )
  }

  return (
    <>
      <Link className="nav__item" to="/settings">
        <Comment /> Settings
      </Link>
      <button className="nav__item" onClick={logout}>
        <Important /> Logout
      </button>
    </>
  )
}
