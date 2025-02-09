// src/DesktopApp.jsx
import { useEffect, useState } from "react";
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

const APPBAR_HEIGHT = 40;
const FOOTER_HEIGHT = 64;
const SIDEBAR_WIDTH = 240;

function DesktopApp({ onLoad }) {
  const [componentsLoaded, setComponentsLoaded] = useState({
    career: false,
    snapshot: false,
    menu: false,
    sidebar: false,
  });

  // Handle individual component loads
  const handleComponentLoad = (componentName) => {
    setComponentsLoaded((prev) => {
      const newState = { ...prev, [componentName]: true };
      // Check if all components are loaded
      if (Object.values(newState).every((loaded) => loaded)) {
        onLoad?.(); // Notify parent when everything is ready
      }
      return newState;
    });
  };

  // Simulate or handle actual data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate loading career data
        await new Promise((resolve) => setTimeout(resolve, 500));
        handleComponentLoad("career");

        // Simulate loading snapshot data
        await new Promise((resolve) => setTimeout(resolve, 300));
        handleComponentLoad("snapshot");

        // Menu and sidebar can load immediately
        handleComponentLoad("menu");
        handleComponentLoad("sidebar");
      } catch (error) {
        console.error("Error loading data:", error);
        // Still mark components as loaded even if there's an error
        Object.keys(componentsLoaded).forEach((key) =>
          handleComponentLoad(key)
        );
      }
    };

    loadData();
  }, []); // Empty dependency array since we only want to load once

  return (
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
      }}
    >
      <AppMenu />
      <Box
        sx={{
          display: "flex",
          marginTop: `${APPBAR_HEIGHT}px`,
          height: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
          overflow: "hidden",
        }}
      >
        <Sidebar />
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
      <Footer />
      <FloatingButton />
    </Box>
  );
}

export default DesktopApp;
