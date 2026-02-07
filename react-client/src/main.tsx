import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet } from "react-router"
import { RouterProvider } from "react-router/dom"
import "highlight.js/styles/atom-one-dark.css"
import "./style.css"
import Error from "./pages/Error"
import Home from "./pages/Home"
import { Navbar } from "./components/Navbar"
import { Join } from "./components/Join"
import { Footer } from "./components/Footer"
import Article from "./pages/Article"
import About from "./pages/About"
import SupportAndCommunity from "./pages/SupportAndCommunity"

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
    errorElement: <Error />,
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
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
