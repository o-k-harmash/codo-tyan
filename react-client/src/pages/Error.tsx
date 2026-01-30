import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router"

const vm = {
  500: {
    code: "500",
    title: "Oooops, something wrong!",
    description: "The error was happen.",
  },
  404: {
    code: "404",
    title: "Page not found",
    description:
      "The page you are looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.",
  },
  actions: {
    primary: "Go home",
    secondary: "Back",
  },
}

export default function Error() {
  const nav = useNavigate()
  const err = useRouteError()
  const res = isRouteErrorResponse(err) ? vm[404] : vm[500]

  return (
    <main className="container-sm min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center text-center">
        <h1>{res.code}</h1>

        <h2 className="mt-(--space-sm)">{res.title}</h2>

        <p className="mt-(--space-md)">{res.description}</p>

        <div className="mt-(--space-lg) flex gap-(--space-md)">
          <Link to="/" className="btn btn--filled">
            {vm.actions.primary}
          </Link>

          <button className="btn btn--outlined" onClick={() => nav(-1)}>
            {vm.actions.secondary}
          </button>
        </div>
      </section>
    </main>
  )
}
