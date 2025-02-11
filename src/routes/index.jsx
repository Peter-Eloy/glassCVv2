// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import MainContent from "../pages/main/index";
import BlogPage from "../pages/blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainContent />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
    ],
  },
]);
