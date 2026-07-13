// src/components/layout/MobileLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import MobileNavigation from "../mobileNavigation";
import FloatingButton from "../floatingButton";
import { useTheme } from "../../contexts";
import FaviconChanger from "../../utils/FaviconChanger";
import ConsoleMessage from "../consoleMessage";

const MobileLayout = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();

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
          background: isDarkMode
            ? "linear-gradient(135deg, #000000 40%, #6a4c8c 100%)"
            : "linear-gradient(135deg, #aad1f2 0%, #e2ecf7 100%)",
        }}
      >
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
          <Box
            key={location.pathname}
            sx={{
              animation: "mobilePageFadeIn 0.35s ease",
              "@keyframes mobilePageFadeIn": {
                from: { opacity: 0, transform: "translateY(8px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Outlet />
          </Box>
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
