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
import {
  WELCOME_STAGES,
  STAGE_DURATION,
} from "./components/welcomeExperience/stages";

// Lazy load DesktopApp
const DesktopApp = lazy(() => import("./DesktopApp"));

function App() {
  const [state, setState] = useState({
    desktopLoaded: false,
    welcomeStage: WELCOME_STAGES.LOADING,
    hasSeenWelcome: false,
    loadingComplete: false,
    isTransitioning: false, // Add this to prevent multiple transitions
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
    setState((prev) => ({
      ...prev,
      desktopLoaded: true,
    }));
  };

  // Effect to handle stage transition when both conditions are met
  useEffect(() => {
    if (
      state.desktopLoaded &&
      state.loadingComplete &&
      state.welcomeStage === WELCOME_STAGES.LOADING &&
      !state.isTransitioning
    ) {
      setState((prev) => ({ ...prev, isTransitioning: true }));
      setTimeout(() => {
        handleStageComplete();
      }, 200);
    }
  }, [
    state.desktopLoaded,
    state.loadingComplete,
    state.welcomeStage,
    state.isTransitioning,
  ]);

  const handleStageComplete = () => {
    if (state.isTransitioning) return;

    setState((prev) => ({ ...prev, isTransitioning: true }));

    const stages = Object.values(WELCOME_STAGES);
    const currentIndex = stages.indexOf(state.welcomeStage);
    const nextStage = stages[currentIndex + 1];

    setTimeout(
      () => {
        setState((prev) => ({
          ...prev,
          welcomeStage: nextStage,
          isTransitioning: false,
        }));

        if (nextStage === WELCOME_STAGES.COMPLETE) {
          const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
          document.cookie = `hasSeenWelcome=true; expires=${date.toUTCString()}; path=/`;
        }
      },
      state.welcomeStage === WELCOME_STAGES.LOADING
        ? 0
        : STAGE_DURATION[state.welcomeStage]
    );
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
                    minLoadTime={2000}
                    onComplete={() => {
                      if (!state.loadingComplete) {
                        setState((prev) => ({
                          ...prev,
                          loadingComplete: true,
                        }));
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
