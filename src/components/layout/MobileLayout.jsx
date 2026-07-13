// src/components/layout/MobileLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import MobileNavigation from "../mobileNavigation";
import FloatingButton from "../floatingButton";
import { useTheme } from "../../contexts";
import { getMobileNavIndex, MOBILE_NAV_ROUTES } from "../../utils/mobileNavIndex";
import FaviconChanger from "../../utils/FaviconChanger";
import ConsoleMessage from "../consoleMessage";

const MobileLayout = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const activeIndex = getMobileNavIndex(location.pathname);
  const lastIndex = MOBILE_NAV_ROUTES.length - 1;

  // Background is one oversized strip; panning it left/right per tab makes
  // navigating between tabs read as scrolling across one continuous scene
  // instead of each page resetting to its own background.
  const panPercent = (activeIndex / lastIndex) * 100;

  return (
    <>
      <FaviconChanger />
      <ConsoleMessage />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Persistent parallax background, shared across all mobile pages */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${(lastIndex + 1) * 100}%`,
            height: "100%",
            background: isDarkMode
              ? "linear-gradient(135deg, #000000 40%, #6a4c8c 100%)"
              : "linear-gradient(135deg, #aad1f2 0%, #e2ecf7 100%)",
            transform: `translateX(-${panPercent}%)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
          }}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            position: "relative",
            zIndex: 1,
            flexGrow: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Outlet />
        </Box>

        {/* Bottom Navigation */}
        <MobileNavigation />

        {/* Floating Action Button */}
        <FloatingButton />
      </Box>
    </>
  );
};

export default MobileLayout;
