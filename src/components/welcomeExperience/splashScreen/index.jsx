// components/welcomeExperience/splashScreen/index.jsx
import { useEffect, useState } from "react";
import { useTheme } from "../../../contexts";
import { glassStyles } from "../../../styles/glassEffects";
import "./styles.css";

const FADE_IN_DELAY = 500; // Delay before showing Hello
const DISPLAY_TIME = 2000; // How long to show the splash screen
const FADE_OUT_TIME = 500; // How long the fade out animation takes

const SplashScreen = ({ onComplete }) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    // Show the Hello text after a brief delay
    const helloTimer = setTimeout(() => {
      setShowHello(true);
    }, FADE_IN_DELAY);

    // Start the fade out sequence after display time
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to complete before calling onComplete
      setTimeout(onComplete, FADE_OUT_TIME);
    }, DISPLAY_TIME);

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  const baseStyles = {
    ...glassStyles.shared,
    ...(isDarkMode ? glassStyles.dark : glassStyles.light),
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${FADE_OUT_TIME}ms ease-in-out`,
  };

  return (
    <div style={baseStyles} className="splash-screen">
      <div className={`hello-text ${showHello ? "visible" : ""}`}>
        <span className="shine-text">Hello</span>
      </div>
    </div>
  );
};

export default SplashScreen;
