// src/DesktopApp.jsx
import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import { Box } from "@mui/material";
import GlassContainer from "./components/glassContainer";
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
          height: "100vh",
          overflow: "hidden",
          position: "fixed",
          width: "100%",
          top: 8,
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
              flexGrow: 3,
              overflow: "hidden",
              position: "relative",
              p: 3,
              ml: `${SIDEBAR_WIDTH}px`,
              width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
            }}
          >
            <GlassContainer>
              <p>
                <strong>Dev |</strong> HTML, CSS, JS (JavaScript, ReactJS) & Go
              </p>
            </GlassContainer>

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
                <GlassContainer>
                  <div>
                    <h2 style={{ marginBottom: "8px" }}>
                      Dev @ NARTEX SOFTWARE, S.L.
                    </h2>
                    <p style={{ fontSize: "0.9rem", margin: "4px 0" }}>
                      <strong>Duration:</strong> Feb 2024 - Present
                    </p>
                    <p style={{ fontSize: "0.9rem", margin: "4px 0" }}>
                      <strong>Technologies:</strong> React.js, Vite.js, Node.js,
                      Go
                    </p>
                  </div>
                </GlassContainer>
                <StackedGlassContainers containers={careerData} />
              </Box>
              <Box sx={{ overflow: "hidden" }}>
                <StackedGlassContainers containers={proSnapshot} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DesktopApp;
