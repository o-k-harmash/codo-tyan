import { Link } from "react-router"

const joinVM = {
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
        <span className="heading-1">{joinVM.title}</span>
        <p className="mt-(--space-md) text-center">{joinVM.about}</p>
        <div className="mt-(--space-md) flex gap-(--space-md)">
          <Link className="btn btn--outlined" role="button" to={""}>
            {joinVM.more}
          </Link>
          <Link className="btn btn--filled" role="button" to={""}>
            {joinVM.now}
          </Link>
        </div>
      </div>
    </section>
  )
}
