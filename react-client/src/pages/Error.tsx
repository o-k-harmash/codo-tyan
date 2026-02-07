import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router"

const errorVM = {
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

export interface ErrorParams {
  status?: number
}

export default function Error({ status }: ErrorParams) {
  const navigate = useNavigate()
  const err = useRouteError()
  /**Костыль потому что черт пойми как ошибки из компонента пробрасывать в 7 версии реакт роутера если не используешь ненужные никому акшины и лоадеры */
  const res =
    status === 404
      ? errorVM[404]
      : isRouteErrorResponse(err)
        ? errorVM[404]
        : errorVM[500]

  const handleBack = () => {
    if (window.history.length > 1 && document.referrer) {
      navigate(-1)
    } else {
      navigate("/")
    }
  }

  return (
    <main className="container-sm min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center text-center">
        <h1>{res.code}</h1>

        <h2 className="mt-(--space-sm)">{res.title}</h2>

        <p className="mt-(--space-md)">{res.description}</p>

        <div className="mt-(--space-lg) flex gap-(--space-md)">
          <Link to="/" className="btn btn--filled">
            {errorVM.actions.primary}
          </Link>

          <button className="btn btn--outlined" onClick={handleBack}>
            {errorVM.actions.secondary}
          </button>
        </div>
      </section>
    </main>
  )
}
