// src/routes/index.jsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import MobileLayout from "../components/layout/MobileLayout";
import DesktopApp from "../DesktopApp";
import BlogPage from "../pages/blog";
import SkillsPage from "../pages/skills";
import Portfolio from "../components/portfolio";
import PortfolioSubcategoryView from "../components/portfolio/subcategoryView";
import { WelcomeProvider } from "../contexts/welcomeContext";
import FaviconChanger from "../utils/FaviconChanger";
import ConsoleMessage from "../components/consoleMessage";

// Mobile page components
import MobileHome from "../components/mobileHome";
import MobilePortfolio from "../components/mobilePortfolio";
import MobileSkills from "../components/mobileSkills";
import MobileBlog from "../components/mobileBlog";

// ==================== Desktop Router ====================
const DesktopLayout = () => (
  <>
    <FaviconChanger />
    <ConsoleMessage />
    <RootLayout />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DesktopLayout />,
    children: [
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
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "portfolio/:categoryId",
        element: <PortfolioSubcategoryView />,
      },
    ],
  },
]);

// ==================== Mobile Router ====================
export const mobileRouter = createBrowserRouter([
  {
    path: "/",
    element: <MobileLayout />,
    children: [
      {
        index: true,
        element: <MobileHome />,
      },
      {
        path: "portfolio",
        element: <MobilePortfolio />,
      },
      {
        path: "portfolio/:categoryId",
        element: <MobilePortfolio />,
      },
      {
        path: "skills",
        element: <MobileSkills />,
      },
      {
        path: "blog",
        element: <MobileBlog />,
      },
    ],
  },
]);
