import { useState } from "react"
import { Link, Outlet } from "react-router"
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
      { icon: Home, label: "Home", href: "/home" },
      { icon: Note, label: "All Articles", href: "/articles" },
      { icon: Important, label: "About", href: "/about" },
      { icon: Heart, label: "Support us", href: "/support" },
      { icon: Comment, label: "Community", href: "/community" },
    ],
  },

  overlay: {
    signIn: { href: "signin", label: "Sign in", icon: Phone },
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
        { icon: Home, href: "https://youtube.com" },
        { icon: Heart, href: "https://instagram.com" },
        { icon: Important, href: "https://google.com" },
        { icon: Filter, href: "https://facebook.com" },
      ],
    },
    navigation: [
      {
        heading: "Pages",
        links: [
          { label: "About", href: "/about" },
          { label: "Team", href: "/team" },
          { label: "Blog", href: "/blog" },
          { label: "Success Stories", href: "/stories" },
        ],
      },
      {
        heading: "SEO",
        links: [
          { label: "Contact us", href: "/us" },
          { label: "Channel", href: "/channel" },
          { label: "Email", href: "/email" },
          { label: "Our Projects", href: "/projects" },
        ],
      },
    ],
  },
}

const logo = (
  <div className="flex items-center gap-2">
    <img src="/codo_tyan.png" alt="Website logotype" />
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
      {/** TODO: add proper react accessibility and fix it*/}
      <div id="main-content" aria-hidden={state.isOverlayOpen}>
        {/* Navbar */}
        <nav
          className="h-14 border-b border-gray-300 py-(--space-sm)"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="container-sm flex items-center justify-between">
            {logo}

            <button
              className="btn btn--ghost"
              onClick={openOverlay}
              aria-haspopup="true"
              aria-expanded={state.isOverlayOpen}
              aria-controls="overlay-menu"
              aria-label="Open menu"
            >
              <GridDots />
            </button>
          </div>
        </nav>

        <main className="container-sm min-h-screen" role="main">
          <Outlet />
        </main>

        {/* Join Section */}
        <section
          className="mt-(--space-md) bg-(--bg-secondary) py-24"
          aria-labelledby="join-section-title"
        >
          <div className="flex flex-col items-center">
            <h1>{vm.join.title}</h1>
            <p className="mt-(--space-md) text-center">{vm.join.about}</p>
            <div className="mt-(--space-md) flex gap-(--space-md)">
              <Link className="btn btn--outlined" role="button" to={""}>
                {vm.join.more}
              </Link>
              <Link className="btn btn--filled" role="button" to={""}>
                {vm.join.now}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="mt-(--space-lg) py-(--space-lg)"
          role="contentinfo"
          aria-labelledby="footer-heading"
        >
          <div className="container-sm flex flex-col gap-(--space-lg)">
            <div className="flex flex-col gap-(--space-lg)">
              {logo}
              <p className="text-gray-600">{vm.footer.contacts.description}</p>
              <ul className="flex gap-(--space-lg)">
                {vm.footer.contacts.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.href}>
                      <l.icon className="text-gray-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {vm.footer.navigation.map((n, i) => (
              <div key={i}>
                <h5 id={`footer-nav-${i}`}>{n.heading}</h5>
                <ul
                  className="mt-(--space-md) flex flex-col gap-(--space-md)"
                  aria-labelledby={`footer-nav-${i}`}
                >
                  {n.links.map((l, i) => (
                    <li key={i}>
                      <Link to={l.href} className="text-gray-500">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </div>

      {/* Overlay (перенесён вниз) */}
      <div
        id="overlay-menu"
        className="overlay"
        data-visible={state.isOverlayOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        aria-hidden={!state.isOverlayOpen}
      >
        {/* Blur */}
        <div className="overlay__backdrop" />

        {/* Side panel */}
        <div className="overlay__panel">
          <button
            className="btn btn--ghost absolute left-full"
            onClick={closeOverlay}
            aria-label="Close menu"
          >
            <Exit className="text-gray-500" />
          </button>

          {logo}

          <ul className="py-(--space-sm)" aria-labelledby="overlay-title">
            {vm.navbar.navigation.map((n, i) => (
              <li key={i}>
                <Link to={n.href} className="nav__item">
                  <n.icon /> {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="text-gray-300" />

          <div className="flex flex-col pt-(--space-sm)">
            <Link
              className="nav__item"
              to={vm.overlay.signIn.href}
              aria-label={vm.overlay.signIn.label}
            >
              <vm.overlay.signIn.icon /> {vm.overlay.signIn.label}
            </Link>

            <button
              className="nav__item"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                state.isDarkTheme ? "light" : "dark"
              } theme`}
            >
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
