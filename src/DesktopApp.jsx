// src/DesktopApp.jsx
import React, { useEffect } from "react";
import "./App.css";
import AppMenu from "./components/menu";
import Sidebar from "./components/sidebar";
import FloatingButton from "./components/floatingButton";
import Footer from "./components/footer";
import {
  Box,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import GlassContainer from "./components/glassContainer";
import StackedGlassContainers from "./components/stackedGlassContainers";
import careerData from "./data/carrerData/carrerData";
import proSnapshot from "./data/proSnapshot/proSnapshot";
import PropTypes from "prop-types";
import { WELCOME_STAGES } from "./components/welcomeExperience/stages";

/**
 * Description placeholder
 *
 * @type {64}
 */
const APPBAR_HEIGHT = 40;
/**
 * Description placeholder
 *
 * @type {64}
 */
const FOOTER_HEIGHT = 64;
const SIDEBAR_WIDTH = 240;

/**
 * Description placeholder
 *
 * @returns {*}
 */
function DesktopApp({ onLoad, welcomeStage }) {
  useEffect(() => {
    onLoad?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden", // Ensure no scrolling at root
        position: "fixed", // Add fixed position
        width: "100%", // Ensure full width
        top: 8,
        left: 0,
      }}
    >
      <AppMenu forceMenuOpen={welcomeStage === WELCOME_STAGES.MENU} />
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
            overflow: "hidden", // Ensure no scrolling in main content
            position: "relative", // Add relative positioning
            p: 3, // Add padding back
            ml: `${SIDEBAR_WIDTH}px`, // Add margin to account for sidebar
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          }}
        >
          {/* Your main content will go here */}
          <GlassContainer>
            <p>
              <strong>Dev |</strong> HTML, CSS, JS (JavaScript, ReactJS) & Go
            </p>
          </GlassContainer>
          {/* Wrapper for StackedGlassContainers */}
          <Box
            sx={{
              display: "grid",
              // Change this to 1 for vertical stack, 2 for side by side
              gridTemplateColumns: {
                xs: "1fr", // Stack on mobile
                md: "1fr 1fr", // Side by side on medium screens and up
              },
              gap: 3,
              mt: 3,
              overflow: "hidden", // Ensure no scrolling in grid
              maxHeight: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px - 120px)`, // Adjust for padding and margins
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
      <Footer />
      <FloatingButton />
    </Box>
  );
}

DesktopApp.propTypes = {
  onLoad: PropTypes.func,
  welcomeStage: PropTypes.oneOf(Object.values(WELCOME_STAGES)),
};

export default DesktopApp;
