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
    console.log("Desktop loaded called");
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
      state.welcomeStage === WELCOME_STAGES.LOADING
    ) {
      console.log("Both conditions met, transitioning from loading stage");
      handleStageComplete();
    }
  }, [state.desktopLoaded, state.loadingComplete, state.welcomeStage]);

  const handleStageComplete = () => {
    console.log("Stage complete called for stage:", state.welcomeStage);

    // Don't immediately update the state, set a timeout for the next stage
    const stages = Object.values(WELCOME_STAGES);
    const currentIndex = stages.indexOf(state.welcomeStage);
    const nextStage = stages[currentIndex + 1];

    console.log("Setting up transition to next stage:", nextStage);

    // For non-loading stages, use the defined duration
    const duration = STAGE_DURATION[state.welcomeStage] || 2000;

    setTimeout(() => {
      setState((prev) => {
        if (nextStage === WELCOME_STAGES.COMPLETE) {
          const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
          document.cookie = `hasSeenWelcome=true; expires=${date.toUTCString()}; path=/`;
        }

        console.log("Actually transitioning to:", nextStage);
        return {
          ...prev,
          welcomeStage: nextStage,
        };
      });
    }, duration);
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
                      console.log("LoadingStage timer completed");
                      setState((prev) => ({
                        ...prev,
                        loadingComplete: true,
                      }));
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
