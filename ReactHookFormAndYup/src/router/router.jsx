import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./"
import { Main } from "../pages"

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [{ path: "", element: <Main /> }],
  },
])

export default router
