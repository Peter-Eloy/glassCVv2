// src/components/welcomeExperience/index.jsx
import { useEffect } from "react";
import SplashScreen from "./splashScreen";
import TourGuide from "./tourGuide";
import useWelcomeTour from "../../hooks/useWelcomeTour";
import { TOUR_CONFIG } from "../../data/welcomeConfig";

const WelcomeExperience = () => {
  const {
    showWelcome,
    tourStep,
    refs,
    handlers: { handleSplashComplete, handleTourComplete, handleMenuOpen },
  } = useWelcomeTour();

  if (!showWelcome) return null;

  return (
    <>
      {tourStep === 0 && (
        <SplashScreen
          onComplete={handleSplashComplete}
          config={TOUR_CONFIG.splashScreen}
        />
      )}
      {tourStep > 0 && (
        <TourGuide
          refs={refs}
          onComplete={handleTourComplete}
          onMenuOpen={handleMenuOpen}
          currentStep={tourStep - 1}
          config={TOUR_CONFIG}
        />
      )}
    </>
  );
};

export default WelcomeExperience;
