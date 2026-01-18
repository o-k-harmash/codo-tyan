import { Link } from "react-router"

const vm = {
  code: "500",
  title: "Page not found",
  description:
    "The page you are looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.",
  actions: {
    primary: "Go home",
    secondary: "Back",
  },
}

export default function ErrorPageView() {
  return (
    <main className="container-sm min-h-screen flex items-center">
      <section className="flex flex-col items-center text-center">
        <h1>{vm.code}</h1>

        <h2 className="mt-2">{vm.title}</h2>

        <p className="mt-4">{vm.description}</p>

        <div className="mt-(--space-lg) flex gap-(--space-md)">
          <Link to="/" className="btn btn--filled">
            {vm.actions.primary}
          </Link>

          <button className="btn btn--outlined" onClick={() => history.back()}>
            {vm.actions.secondary}
          </button>
        </div>
      </section>
    </main>
  )
}
