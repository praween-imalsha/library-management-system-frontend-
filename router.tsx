import { createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignUpPage"
import AdminRoutes from "./pages/AdminRoutes"
import Dashboard from "./pages/Dashboard"
import BooksPage from "./pages/BooksPage"
import ReadersPage from "./pages/ReadersPage"
import LendingPage from "./pages/LendingPage"
import OverdueNotification from "./pages/OverdueNotification.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        element: <AdminRoutes />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/dashboard/books", element: <BooksPage /> },   // plural "books"
          { path: "/dashboard/readers", element: <ReadersPage /> }, // plural "readers"
          { path: "/dashboard/lendings", element: <LendingPage /> }, // plural "lendings"
          {path: "/dashboard/sendMails" , element:<OverdueNotification/>}
        ],
      },
    ],
  },
])

export default router
