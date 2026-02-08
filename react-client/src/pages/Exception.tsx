import { Link } from "react-router"

const errorVM = {
  500: {
    code: "500",
    title: "Oooops, something wrong!",
    description: "The error was happen.",
  },
  404: {
    code: "404",
    title: "Not found",
    description:
      "The page you are looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.",
  },
  actions: {
    primary: "Go home",
    secondary: "Back",
  },
}

export interface ExceptionParams {
  status: 404 | 500
}

export default function Exception({ status }: ExceptionParams) {
  return (
    <main className="container-sm min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center text-center">
        <h1>{errorVM[status].code}</h1>

        <h2 className="mt-(--space-sm)">{errorVM[status].title}</h2>

        <p className="mt-(--space-md)">{errorVM[status].description}</p>

        <div className="mt-(--space-lg) flex gap-(--space-md)">
          <Link to="/" className="btn btn--filled">
            {errorVM.actions.primary}
          </Link>
        </div>
      </section>
    </main>
  )
}
