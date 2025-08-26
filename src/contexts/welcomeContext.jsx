// src/contexts/welcomeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { WELCOME_STAGES } from "../components/welcomeExperience/stages";

const WelcomeContext = createContext();

export const WelcomeProvider = ({ children }) => {
  // Initialize state from localStorage
  const [welcomeStage, setWelcomeStage] = useState(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    const isFirstTime = !hasSeenWelcome;
    
    if (isFirstTime) {
      console.info("🎉 First-time visitor detected! Preparing the welcome experience...");
    } else {
      console.info("👋 Welcome back! Skipping the intro - you know the drill!");
    }
    
    return hasSeenWelcome ? WELCOME_STAGES.COMPLETE : WELCOME_STAGES.LOADING;
  });

  // Handle stage progression
  const handleStageComplete = () => {
    setWelcomeStage((prevStage) => {
      const nextStage = (() => {
        switch (prevStage) {
          case WELCOME_STAGES.LOADING:
            return WELCOME_STAGES.CONTACTS;
          case WELCOME_STAGES.CONTACTS:
            return WELCOME_STAGES.STACKED;
          case WELCOME_STAGES.STACKED:
            return WELCOME_STAGES.MENU;
          case WELCOME_STAGES.MENU:
            // Save to localStorage when completing the welcome experience
            console.info("✅ Welcome experience completed! You're now a certified glass morphism navigator!");
            localStorage.setItem("hasSeenWelcome", "true");
            return WELCOME_STAGES.COMPLETE;
          default:
            return WELCOME_STAGES.COMPLETE;
        }
      })();

      return nextStage;
    });
  };

  return (
    <WelcomeContext.Provider value={{ welcomeStage, handleStageComplete }}>
      {children}
    </WelcomeContext.Provider>
  );
};

export const useWelcome = () => {
  const context = useContext(WelcomeContext);
  if (!context) {
    throw new Error("useWelcome must be used within a WelcomeProvider");
  }
  return context;
};
