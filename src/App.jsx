// App.jsx
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import DesktopApp from "./DesktopApp";
import MobileLandingPage from "./components/mobileLandingPage";
import ConsoleMessage from "./components/consoleMessage";
import FaviconChanger from "./utils/faviconChanger";
import SplashScreen from "./components/welcomeExperience/splashScreen";
import { ThemeProvider } from "./contexts/index";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { CookieService } from "./services";

// Development helper
if (import.meta.env.DEV) {
  window.resetWelcome = () => {
    CookieService.resetWelcomeStatus();
    window.location.reload();
  };
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  useEffect(() => {
    // Check if we should show welcome screen
    if (!isMobile) {
      setShowWelcome(!CookieService.hasSeenWelcome());
    } else {
      setShowWelcome(false);
    }
  }, []);

  const handleSplashComplete = () => {
    CookieService.markWelcomeAsSeen();
    setWelcomeComplete(true);
    setShowWelcome(false);
  };

  if (isMobile) {
    return (
      <ThemeProvider>
        <MuiThemeProvider theme={createTheme()}>
          <FaviconChanger />
          <ConsoleMessage />
          <MobileLandingPage />
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }

  // For desktop
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={createTheme()}>
        <FaviconChanger />
        <ConsoleMessage />
        {showWelcome && <SplashScreen onComplete={handleSplashComplete} />}
        {(!showWelcome || welcomeComplete) && <DesktopApp />}
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
