// src/DesktopApp.jsx
import { Box } from "@mui/material";
import { isMobile } from "react-device-detect";
import Sidebar from "./components/sidebar";
import MobileLandingPage from "./components/mobileLandingPage";
import ConsoleMessage from "./components/consoleMessage";
import LoadingStage from "./components/welcomeExperience/LoadingStage";
import WelcomeGuide from "./components/welcomeExperience/WelcomeGuide";
import { WELCOME_STAGES } from "./components/welcomeExperience/stages";
import { useWelcome } from "./contexts/welcomeContext";

const DesktopApp = () => {
  const { welcomeStage, handleStageComplete } = useWelcome();

  // Show mobile version if on mobile device
  if (isMobile) {
    return <MobileLandingPage />;
  }

  return (
    <>
      <ConsoleMessage />
      <Box sx={{ display: "flex" }}>
        <Sidebar
          showContactShine={welcomeStage === WELCOME_STAGES.CONTACTS}
          showStackedShine={welcomeStage === WELCOME_STAGES.STACKED}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: "240px", // Width of the sidebar
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Your existing main content components */}
        </Box>
      </Box>

      {/* Welcome Experience Components */}
      {welcomeStage === WELCOME_STAGES.LOADING && (
        <LoadingStage onComplete={handleStageComplete} />
      )}

      {welcomeStage !== WELCOME_STAGES.LOADING &&
        welcomeStage !== WELCOME_STAGES.COMPLETE && (
          <WelcomeGuide
            stage={welcomeStage}
            onStageComplete={handleStageComplete}
          />
        )}
    </>
  );
};

export default DesktopApp;
