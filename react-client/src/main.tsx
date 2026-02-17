import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet } from "react-router"
import { RouterProvider } from "react-router/dom"
import "highlight.js/styles/atom-one-dark.css"
import "./style.css"
import Home from "./pages/Home"
import { Navbar } from "./components/Navbar"
import { Join } from "./components/Join"
import { Footer } from "./components/Footer"
import Article from "./pages/Article"
import Exception from "./pages/Exception"
import Settings from "./pages/Settings"

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Join />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/articles/:articleId",
        element: <Article />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/500",
    element: <Exception status={500} />,
  },
  {
    path: "/401",
    element: <Exception status={401} />,
  },
  {
    path: "*",
    element: <Exception status={404} />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
