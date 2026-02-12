import { Link } from "react-router"

export function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img src="/codo_tyan.png" alt="CodoTyan logotype" />
        <span className="heading-4">{"CodoTyan"}</span>
      </div>
    </Link>
  )
}
