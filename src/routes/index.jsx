// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import DesktopApp from "../DesktopApp";
import BlogPage from "../pages/blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DesktopApp />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
    ],
  },
]);
