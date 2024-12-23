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
import Files from "./app/files/files";
import Metadata from "./app/metadata/metadata";
import Transcode from "./app/transcode/transcode";
import Scan from "./app/scan/scan";
import Torrents from "./app/torrents/torrents";
export const app_url = "http://localhost/api";
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
            element: <Metadata />,
          },
          {
            path: "/files",
            element: <Files />,
          },
          {
            path: "/transcoder",
            element: <Transcode />,
          },
          {
            path: "/scan",
            element: <Scan />,
          },
          {
            path: "/torrents",
            element: <Torrents />,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
