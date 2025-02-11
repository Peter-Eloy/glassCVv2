// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import DesktopApp from "../DesktopApp";
import BlogPage from "../pages/blog";
import { WelcomeProvider } from "../contexts/welcomeContext";

const HomeRoute = () => (
  <WelcomeProvider>
    <DesktopApp />
  </WelcomeProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
    ],
  },
]);
