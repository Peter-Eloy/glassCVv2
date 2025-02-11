// src/components/layout/RootLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../footer";
import FloatingButton from "../floatingButton";
import AppMenu from "../menu/index";
import { useWelcome } from "../../contexts/welcomeContext";
import { WELCOME_STAGES } from "../../components/welcomeExperience/stages";

const RootLayout = () => {
  const { welcomeStage } = useWelcome();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppMenu forceMenuOpen={isHome && welcomeStage === WELCOME_STAGES.MENU} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "64px", // Height of the AppBar
          marginBottom: "64px", // Height of the Footer
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
      <FloatingButton />
      <Footer />
    </Box>
  );
};

export default RootLayout;
