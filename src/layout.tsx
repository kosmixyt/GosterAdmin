import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <div>
      <ToastContainer />
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            Goster
          </a>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>{/* <a>Link 1</a> */}</li>
                  <li>{/* <a>Link 2</a> */}</li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div
          style={{ display: isDrawerOpen ? "block" : "none" }}
          className="drawer-side"
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-md">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="mt-1">
              <Link to="/users">Users</Link>
            </li>
            <li className="mt-1">
              <Link to="/metadata">Metadata</Link>
            </li>
            <li className="mt-1">
              <Link to="/files">Files</Link>
            </li>
            <li className="mt-1">
              <Link to="/transcoder">Transcoder</Link>
            </li>
            <li className="mt-1">
              <Link to="/scan">Scan Paths</Link>
            </li>
            <li className="mt-1">
              <Link to="/torrents">Torrents</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
