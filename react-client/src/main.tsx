import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./style.css"
import Error from "./pages/Error"
import Home from "./pages/Home"
import { Navbar } from "./components/Navbar"
import { Join } from "./components/Join"
import { Footer } from "./components/Footer"

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <main className="container-sm">
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
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
