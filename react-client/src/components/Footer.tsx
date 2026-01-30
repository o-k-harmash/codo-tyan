import Home from "@/assets/home.svg?react"
import Heart from "@/assets/heart.svg?react"
import Important from "@/assets/important.svg?react"
import Filter from "@/assets/filter.svg?react"
import { Link } from "react-router"
import { Logo } from "./Logo"

const vm = {
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
}

export function Footer() {
  return (
    <footer
      className="mt-(--space-lg) py-(--space-lg)"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="container-sm flex flex-col gap-(--space-lg)">
        <div className="flex flex-col gap-(--space-lg)">
          <Logo />
          <p className="text-gray-600">{vm.contacts.description}</p>
          <div className="flex gap-(--space-lg)">
            {vm.contacts.links.map((l, k) => (
              <Link key={k} to={l.href}>
                <l.icon className="text-gray-600" />
              </Link>
            ))}
          </div>
        </div>

        {vm.navigation.map((n, k) => (
          <div key={k}>
            <h5>{n.heading}</h5>
            <ul className="mt-(--space-md) flex flex-col gap-(--space-md)">
              {n.links.map((l, k) => (
                <li key={k}>
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
  )
}
