// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import DesktopApp from "../DesktopApp";
import BlogPage from "../pages/blog";
import { WelcomeProvider } from "../contexts/welcomeContext";
import FaviconChanger from "../utils/FaviconChanger";
import ConsoleMessage from "../components/consoleMessage";

const AppWithProviders = () => (
  <WelcomeProvider>
    <FaviconChanger />
    <ConsoleMessage />
    <RootLayout />
  </WelcomeProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithProviders />,
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
