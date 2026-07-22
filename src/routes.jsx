import { createBrowserRouter } from "react-router";
import { Layout } from "./app/Components/Layout";
import { Dashboard } from "./app/pages/Dashboard";
import { Books } from "./app/pages/Books";
import { Categories } from "./app/pages/Categories";
import { Orders } from "./app/pages/Orders";
import { Users } from "./app/pages/Users";
import { NotFound } from "./app/pages/NotFound";
import Login from "./app/pages/Login";
import { ProtectedRoute } from "./app/Components/ProtectedRoute";
import { SingleBook } from "./app/pages/SingleBook";
import Messages from "./app/pages/Messages";

export const router = createBrowserRouter(
  [
  {
    path: "/login",
    Component: Login,
  },

  // 🔒 Protected area
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "books", Component: Books },
          { path: "books/:id", Component: SingleBook },
          { path: "categories", Component: Categories },
          { path: "orders", Component: Orders },
          { path: "users", Component: Users },
          { path: "Messages", Component: Messages },
        ],
      },
    ],
  },

  {
    path: "*",
    Component: NotFound,
  },
],
{
    basename: "/Dashboard-BookSore", 
  }
);