// src/components/layout/MobileLayout.jsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import MobileNavigation from "../mobileNavigation";
import FloatingButton from "../floatingButton";
import { useTheme } from "../../contexts";
import FaviconChanger from "../../utils/FaviconChanger";
import ConsoleMessage from "../consoleMessage";

const MobileLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <FaviconChanger />
      <ConsoleMessage />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: isDarkMode ? "#121212" : "#f5f5f5",
        }}
      >
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
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
