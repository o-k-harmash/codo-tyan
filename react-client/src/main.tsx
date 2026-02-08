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
import About from "./pages/About"
import SupportAndCommunity from "./pages/SupportAndCommunity"
import Exception from "./pages/Exception"

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
      { path: "/about", element: <About /> },
      { path: "/support", element: <SupportAndCommunity /> },
      { path: "/community", element: <SupportAndCommunity /> },
      {
        path: "/articles/:articleId",
        element: <Article />,
      },
    ],
  },
  {
    path: "/500",
    element: <Exception status={500} />,
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
