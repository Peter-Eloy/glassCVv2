// src/components/layout/RootLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../footer";
import FloatingButton from "../floatingButton";
import AppMenu from "../menu/index";
import { useWelcome } from "../../contexts/welcomeContext";
import { WELCOME_STAGES } from "../../components/welcomeExperience/stages";
import SiteVisitorCounter from "../siteVisitorCounter";

const RootLayout = () => {
  const { welcomeStage } = useWelcome();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <Box>
      <AppMenu forceMenuOpen={isHome && welcomeStage === WELCOME_STAGES.MENU} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "70px", // Height of the AppBar
          marginBottom: "64px", // Height of the Footer
          overflow: "hidden", // Changed from 'auto' to 'hidden'
        }}
      >
        <Outlet />
      </Box>
      <FloatingButton />
      <SiteVisitorCounter />
      <Footer />
    </Box>
  );
};

export default RootLayout;
