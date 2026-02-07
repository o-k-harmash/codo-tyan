import Home from "@/assets/home.svg?react"
import Heart from "@/assets/heart.svg?react"
import Important from "@/assets/important.svg?react"
import Filter from "@/assets/filter.svg?react"
import { Link } from "react-router"
import { Logo } from "./Logo"
import { navigationVM } from "."

const footerVM = {
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
      links: navigationVM,
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
}

export function Footer() {
  const { contacts, navigation } = footerVM

  return (
    <footer className="footer c-container">
      <div className="footer__brand">
        <Logo />
        <p className="text-gray-600">{contacts.description}</p>
        <div className="flex gap-(--space-lg)">
          {contacts.links.map((l, k) => (
            <Link key={k} to={l.href}>
              <l.icon className="text-gray-600" />
            </Link>
          ))}
        </div>
      </div>

      <div className="footer__nav">
        <div className="footer__nav-section">
          <div className="footer__nav-group">
            <h5>{navigation[0].heading}</h5>
            <ul className="mt-(--space-md) flex flex-col gap-(--space-md)">
              {navigation[0].links.map((l, k) => (
                <li key={k}>
                  <Link to={l.href} className="text-gray-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__nav-group">
            <h5>{navigation[1].heading}</h5>
            <ul className="mt-(--space-md) flex flex-col gap-(--space-md)">
              {navigation[1].links.map((l, k) => (
                <li key={k}>
                  <Link to={l.href} className="text-gray-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__nav-section">
          <div className="footer__nav-group">
            <h5>{navigation[0].heading}</h5>
            <ul className="mt-(--space-md) flex flex-col gap-(--space-md)">
              {navigation[0].links.map((l, k) => (
                <li key={k}>
                  <Link to={l.href} className="text-gray-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__nav-group">
            <h5>{navigation[1].heading}</h5>
            <ul className="mt-(--space-md) flex flex-col gap-(--space-md)">
              {navigation[1].links.map((l, k) => (
                <li key={k}>
                  <Link to={l.href} className="text-gray-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
