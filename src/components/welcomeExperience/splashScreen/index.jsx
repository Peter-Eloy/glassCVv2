import React, { useEffect, useState } from "react";
import { useTheme } from "../../../contexts";
import { glassStyles } from "../../../styles/glassEffects";
import { TOUR_CONFIG } from "../welcomeConfig";
import "./styles.css";

const {
  splashScreen: {
    fadeInDelay,
    displayTime,
    fadeOutTime,
    text: helloText,
    letterAppearDuration,
    letterShineDelay,
  },
} = TOUR_CONFIG;

const SplashScreen = ({ onComplete }) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState("appearing");
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [shineVisible, setShineVisible] = useState(false);

  useEffect(() => {
    let lettersTimer;
    setIsVisible(true);

    if (currentStage === "appearing") {
      lettersTimer = setInterval(() => {
        setVisibleLetters((prev) => {
          if (prev < helloText.length) {
            return prev + 1;
          }
          clearInterval(lettersTimer);
          setTimeout(() => {
            setShineVisible(true);
            setTimeout(() => {
              setCurrentStage("disappearing");
            }, displayTime);
          }, letterShineDelay);
          return prev;
        });
      }, letterAppearDuration);
    } else if (currentStage === "disappearing") {
      setIsVisible(false);
      setTimeout(onComplete, fadeOutTime);
    }

    return () => {
      clearInterval(lettersTimer);
    };
  }, [currentStage, onComplete]);

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
    transition: `opacity ${fadeOutTime}ms ease-in-out`,
  };

  const renderLetters = () => {
    return (
      <div className="hello-text" data-text={helloText}>
        {helloText.split("").map((letter, index) => {
          const isVisible = index < visibleLetters;
          return (
            <span
              key={index}
              className={`letter ${isVisible ? "visible" : ""}`}
              style={{
                transitionDelay: `${index * letterAppearDuration}ms`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={baseStyles} className="splash-screen">
      <div className="hello-text">{renderLetters()}</div>
      {shineVisible && <div className="shine-effect"></div>}
    </div>
  );
};

export default SplashScreen;
