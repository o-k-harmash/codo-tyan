import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./style.css"
import LayoutPageView from "./Layout"
import ErrorPageView from "./Error"
import ItemsPage from "./features/items/ItemsPage"

const router = createBrowserRouter([
  {
    element: <LayoutPageView></LayoutPageView>,
    errorElement: <ErrorPageView />,
    children: [
      {
        path: "/",
        element: <ItemsPage></ItemsPage>,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
