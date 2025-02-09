// App.jsx
import { useState, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import DesktopApp from "./DesktopApp";
import MobileLandingPage from "./components/mobileLandingPage";
import ConsoleMessage from "./components/consoleMessage";
import FaviconChanger from "./utils/faviconChanger";
import SplashScreen from "./components/welcomeExperience/splashScreen";
import TourGuide from "./components/welcomeExperience/tourGuide";
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
  const [showTour, setShowTour] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if we should show welcome screen
    if (!isMobile) {
      setShowWelcome(!CookieService.hasSeenWelcome());
    } else {
      setShowWelcome(false);
    }
  }, []);

  const tourRefs = useRef({
    firstGlassContainerRef: null,
    stackedGlassRef: null,
  });

  const handleSplashComplete = () => {
    CookieService.markWelcomeAsSeen();
    setWelcomeComplete(true);
    setShowWelcome(false);
  };

  const handleTourComplete = () => {
    setShowTour(false);
    // Optionally close menu after a delay
    setTimeout(() => setIsMenuOpen(false), 2000);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
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
        {(!showWelcome || welcomeComplete) && (
          <DesktopApp tourRefs={tourRefs} isMenuOpen={isMenuOpen} />
        )}
        {showTour && (
          <TourGuide
            refs={tourRefs.current}
            onComplete={handleTourComplete}
            onMenuOpen={handleMenuOpen}
          />
        )}
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
