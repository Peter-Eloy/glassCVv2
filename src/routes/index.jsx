// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import MobileLayout from "../components/layout/MobileLayout";
import DesktopApp from "../DesktopApp";
import BlogPage from "../pages/blog";
import SkillsPage from "../pages/skills";
import UnderConstruction from "../components/UnderConstruction";
import { WelcomeProvider } from "../contexts/welcomeContext";
import FaviconChanger from "../utils/FaviconChanger";
import ConsoleMessage from "../components/consoleMessage";
import { isMobile } from "react-device-detect";

const AppWithProviders = () => (
  <WelcomeProvider>
    <FaviconChanger />
    <ConsoleMessage />
    {isMobile ? <MobileLayout /> : <RootLayout />}
  </WelcomeProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithProviders />,
    children: isMobile
      ? [] // No child routes for mobile
      : [
          {
            index: true,
            element: <DesktopApp />,
          },
          {
            path: "blog",
            element: <BlogPage />,
          },
          {
            path: "skills",
            element: <SkillsPage />,
          },
          {
            path: "under_construction",
            element: <UnderConstruction />,
          },
        ],
  },
]);
