// src/DesktopApp.jsx
import { useEffect, useRef } from "react";
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

function DesktopApp({ tourRefs }) {
  // Create refs for the elements we want to highlight
  const menuRef = useRef(null);
  const firstGlassContainerRef = useRef(null);
  const stackedGlassRef = useRef(null);

  // Update the refs in the parent component
  useEffect(() => {
    if (tourRefs) {
      tourRefs.current = {
        menuRef,
        firstGlassContainerRef,
        stackedGlassRef,
      };
    }
  }, [tourRefs]);

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
      <AppMenu ref={menuRef} />
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
          <GlassContainer ref={firstGlassContainerRef}>
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
              <StackedGlassContainers
                ref={stackedGlassRef}
                containers={careerData}
              />
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
