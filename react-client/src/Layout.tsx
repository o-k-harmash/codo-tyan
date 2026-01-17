import { useState } from "react"
import { Outlet } from "react-router"
import GridDots from "@/assets/grid_dots.svg?react"
import Exit from "@/assets/exit.svg?react"
import Home from "@/assets/home.svg?react"
import Heart from "@/assets/heart.svg?react"
import Sunny from "@/assets/sunny.svg?react"
import Moon from "@/assets/moon.svg?react"
import Note from "@/assets/note.svg?react"
import Phone from "@/assets/phone.svg?react"
import Comment from "@/assets/comment.svg?react"
import Important from "@/assets/important.svg?react"
import Filter from "@/assets/filter.svg?react"

type Layout = {
  isDarkTheme: boolean
  isOverlayOpen: boolean
}

const initialState: Layout = {
  isDarkTheme: false,
  isOverlayOpen: false,
}

/** Модель текста / контента для страницы */
const vm = {
  logo: "CodoTyan",

  navbar: {
    navigation: [
      { icon: Home, label: "Home", href: "#" },
      { icon: Note, label: "All Articles", href: "#" },
      { icon: Important, label: "About", href: "#" },
      { icon: Heart, label: "Support us", href: "#" },
      { icon: Comment, label: "Community", href: "#" },
    ],
  },

  overlay: {
    signIn: "Sign in",
    theme: {
      dark: "Dark mode",
      light: "Light mode",
    },
  },

  join: {
    title: "Join to us!",
    about:
      "The Project is funded by the community. Join us in empowering learners around the globe by supporting The Project!",
    more: "Learn more",
    now: "Join now",
  },

  footer: {
    contacts: {
      description:
        "High quality coding education maintained by an open source community.",
      links: [
        { icon: Home, href: "#" },
        { icon: Heart, href: "#" },
        { icon: Important, href: "#" },
        { icon: Filter, href: "#" },
      ],
    },
    navigation: [
      {
        heading: "Heading",
        links: [
          { label: "About", href: "#" },
          { label: "Team", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Success Stories", href: "#" },
        ],
      },
      {
        heading: "Heading",
        links: [
          { label: "About", href: "#" },
          { label: "Team", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Success Stories", href: "#" },
        ],
      },
    ],
  },
}

const logo = (
  <div className="flex items-center gap-2">
    <img src="/codo_tyan.png" alt="" />
    <span className="heading-4">{vm.logo}</span>
  </div>
)

export default function LayoutPageView() {
  const [state, setState] = useState<Layout>(initialState)

  const openOverlay = () =>
    setState((prev) => ({ ...prev, isOverlayOpen: true }))
  const closeOverlay = () =>
    setState((prev) => ({ ...prev, isOverlayOpen: false }))
  const toggleTheme = () =>
    setState((prev) => ({ ...prev, isDarkTheme: !prev.isDarkTheme }))

  return (
    <>
      {/* Navbar */}
      <nav className="h-14 border-b border-gray-300 py-2">
        <div className="container-sm flex items-center justify-between">
          {logo}

          <button className="btn btn--ghost" onClick={openOverlay}>
            <GridDots />
          </button>
        </div>
      </nav>

      <main className="container-sm min-h-screen">
        <Outlet />
      </main>

      {/* Join Section */}
      <section className="mt-8 bg-(--bg-secondary) py-28">
        <div className="flex flex-col items-center">
          <h1>{vm.join.title}</h1>
          <p className="mt-4 text-center">{vm.join.about}</p>
          <div className="mt-6 flex gap-4">
            <a className="btn btn--outlined">{vm.join.more}</a>
            <a className="btn btn--filled">{vm.join.now}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 py-8">
        <div className="container-sm flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {logo}
            <p className="text-gray-600">{vm.footer.contacts.description}</p>
            <ul className="flex gap-8">
              {vm.footer.contacts.links.map((l, i) => (
                <li key={i}>
                  <a href={l.href}>
                    <l.icon className="text-gray-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {vm.footer.navigation.map((n, i) => (
            <div key={i}>
              <h5>{n.heading}</h5>
              <ul className="mt-4 flex flex-col gap-4">
                {n.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href} className="text-gray-500">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {/* Overlay (перенесён вниз) */}
      <div data-visible={state.isOverlayOpen} className="overlay">
        {/* Blur */}
        <div className="overlay__backdrop" />

        {/* Side panel */}
        <div className="overlay__panel">
          <button
            className="btn btn--ghost absolute left-full"
            onClick={closeOverlay}
          >
            <Exit className="text-gray-500" />
          </button>

          {logo}

          <ul className="py-4">
            {vm.navbar.navigation.map((n, i) => (
              <li key={i}>
                <a className="nav__item" href={n.href}>
                  <n.icon /> {n.label}
                </a>
              </li>
            ))}
          </ul>

          <hr className="text-gray-300" />

          <div className="flex flex-col pt-4">
            <button className="nav__item">
              <Phone /> {vm.overlay.signIn}
            </button>

            <button className="nav__item" onClick={toggleTheme}>
              {state.isDarkTheme ? <Sunny /> : <Moon />}{" "}
              {state.isDarkTheme
                ? vm.overlay.theme.light
                : vm.overlay.theme.dark}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
