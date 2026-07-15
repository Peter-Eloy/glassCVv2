// src/DesktopApp.jsx
import { useCallback, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import { Box } from "@mui/material";
import SkillsTicker from "./components/skillsTicker";
import StackedGlassContainers from "./components/stackedGlassContainers";
import careerData from "./data/carrerData/carrerData";
import proSnapshot from "./data/proSnapshot/proSnapshot";
import LoadingStage from "./components/welcomeExperience/LoadingStage";
import WelcomeGuide from "./components/welcomeExperience/WelcomeGuide";
import { useWelcome } from "./contexts/welcomeContext";
import { WELCOME_STAGES } from "./components/welcomeExperience/stages";

const APPBAR_HEIGHT = 40;
const FOOTER_HEIGHT = 64;
const SIDEBAR_WIDTH = 240;

function DesktopApp() {
  const { welcomeStage, handleStageComplete } = useWelcome();
  const [experienceHeight, setExperienceHeight] = useState(0);
  const [snapshotHeight, setSnapshotHeight] = useState(0);
  const columnHeight = Math.max(experienceHeight, snapshotHeight);

  const handleExperienceHeight = useCallback(
    (height) => setExperienceHeight(height),
    []
  );
  const handleSnapshotHeight = useCallback(
    (height) => setSnapshotHeight(height),
    []
  );

  return (
    <>
      {/* Welcome Experience Components */}
      {welcomeStage === WELCOME_STAGES.LOADING && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <LoadingStage onComplete={handleStageComplete} />
        </Box>
      )}

      {welcomeStage !== WELCOME_STAGES.LOADING &&
        welcomeStage !== WELCOME_STAGES.COMPLETE && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
          >
            <WelcomeGuide
              stage={welcomeStage}
              onStageComplete={handleStageComplete}
            />
          </Box>
        )}

      {/* Main App Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 20px)",
          overflow: "hidden",
          position: "fixed",
          width: "100%",
          top: 20,
          left: 0,
          opacity: welcomeStage === WELCOME_STAGES.LOADING ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginTop: `${APPBAR_HEIGHT}px`,
            height: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
            overflow: "hidden",
          }}
        >
          <Sidebar
            showContactShine={welcomeStage === WELCOME_STAGES.CONTACTS}
            showStackedShine={welcomeStage === WELCOME_STAGES.STACKED}
          />

          <Box
            component="main"
            sx={{
              // flexGrow: 3,
              // overflow: "hidden",
              position: "relative",
              p: 3,
              ml: `${SIDEBAR_WIDTH}px`,
              mr: "35px",
              width: `calc(100% - ${SIDEBAR_WIDTH}px - 35px)`,
            }}
          >
            <SkillsTicker />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: 3,
                mt: 3,
                overflow: "hidden",
                maxHeight: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px - 120px)`,
              }}
            >
              <Box sx={{ overflow: "hidden" }}>
                <StackedGlassContainers
                  containers={careerData}
                  minHeight={columnHeight}
                  onNaturalHeightChange={handleExperienceHeight}
                />
              </Box>
              <Box sx={{ overflow: "hidden" }}>
                <StackedGlassContainers
                  containers={proSnapshot}
                  minHeight={columnHeight}
                  onNaturalHeightChange={handleSnapshotHeight}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DesktopApp;
