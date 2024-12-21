import { createRoot } from "react-dom/client";
import "./assets/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Landing } from "./app/landing";
import { Layout } from "./layout";
import Users from "./app/users/users";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/metadata",
            element: <div>Metadata</div>,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
