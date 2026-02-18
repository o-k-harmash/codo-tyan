import { Link, useNavigate } from "react-router"
import Comment from "@/assets/comment.svg?react"
import Important from "@/assets/important.svg?react"
import type { User } from "@/types/user"
import { redirectToLogin } from "@/services/api/user"

export default function UserActions({
  user,
  logout,
}: {
  user: User | null
  logout: () => void
}) {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
    } finally {
      navigate("/", { replace: true })
    }
  }

  if (!user) {
    return (
      <>
        <button className="nav__item" onClick={redirectToLogin}>
          <Comment /> Get started
        </button>
      </>
    )
  }

  return (
    <>
      <Link className="nav__item" to="/settings">
        <Comment /> Settings
      </Link>
      <button className="nav__item" onClick={handleLogout}>
        <Important /> Logout
      </button>
    </>
  )
}
