import { Link } from "react-router"

const vm = {
  title: "Join to us!",
  about:
    "The Project is funded by the community. Join us in empowering learners around the globe by supporting The Project!",
  more: "Learn more",
  now: "Join now",
}

export function Join() {
  return (
    <section className="mt-(--space-md) bg-(--bg-secondary) py-24">
      <div className="flex flex-col items-center">
        <span className="heading-1">{vm.title}</span>
        <p className="mt-(--space-md) text-center">{vm.about}</p>
        <div className="mt-(--space-md) flex gap-(--space-md)">
          <Link className="btn btn--outlined" role="button" to={""}>
            {vm.more}
          </Link>
          <Link className="btn btn--filled" role="button" to={""}>
            {vm.now}
          </Link>
        </div>
      </div>
    </section>
  )
}
