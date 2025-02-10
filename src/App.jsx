// src/App.jsx
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { lazy, Suspense } from "react";
import MobileLandingPage from "./components/MobileLandingPage";
import ConsoleMessage from "./components/consoleMessage";
import FaviconChanger from "./utils/faviconChanger";
import { ThemeProvider } from "./contexts/index";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import LoadingStage from "./components/welcomeExperience/LoadingStage";
import WelcomeGuide from "./components/welcomeExperience/WelcomeGuide";
import { WELCOME_STAGES } from "./components/welcomeExperience/stages";

// Lazy load DesktopApp
const DesktopApp = lazy(() => import("./DesktopApp"));

function App() {
  const [state, setState] = useState({
    desktopLoaded: false,
    welcomeStage: WELCOME_STAGES.LOADING,
    hasSeenWelcome: false,
  });

  useEffect(() => {
    const welcomeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hasSeenWelcome="));

    if (welcomeCookie) {
      setState((prev) => ({
        ...prev,
        welcomeStage: WELCOME_STAGES.COMPLETE,
        hasSeenWelcome: true,
      }));
    }
  }, []);

  const handleDesktopLoaded = () => {
    if (!state.hasSeenWelcome) {
      // Keep in LOADING stage until desktop is ready
      setState((prev) => ({
        ...prev,
        desktopLoaded: true,
      }));
    }
  };

  const handleStageComplete = () => {
    setState((prev) => {
      const stages = Object.values(WELCOME_STAGES);
      const currentIndex = stages.indexOf(prev.welcomeStage);
      const nextStage = stages[currentIndex + 1];

      if (nextStage === WELCOME_STAGES.COMPLETE) {
        // Set cookie for 30 days
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = `hasSeenWelcome=true; expires=${date.toUTCString()}; path=/`;
      }

      return {
        ...prev,
        welcomeStage: nextStage,
      };
    });
  };

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={createTheme()}>
        <FaviconChanger />
        <ConsoleMessage />
        {isMobile ? (
          <MobileLandingPage />
        ) : (
          <>
            <Suspense fallback={null}>
              <DesktopApp
                onLoad={handleDesktopLoaded}
                welcomeStage={state.welcomeStage}
              />
            </Suspense>

            {!state.hasSeenWelcome && (
              <>
                {state.welcomeStage === WELCOME_STAGES.LOADING && (
                  <LoadingStage
                    onComplete={() => {
                      if (state.desktopLoaded) {
                        handleStageComplete();
                      }
                    }}
                  />
                )}
                <WelcomeGuide
                  stage={state.welcomeStage}
                  onStageComplete={handleStageComplete}
                />
              </>
            )}
          </>
        )}
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
