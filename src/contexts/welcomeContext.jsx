// src/contexts/welcomeContext.jsx
import { createContext, useContext, useState } from "react";
import { WELCOME_STAGES } from "../components/welcomeExperience/stages";

const WelcomeContext = createContext();

export const WelcomeProvider = ({ children }) => {
  const [welcomeStage, setWelcomeStage] = useState(WELCOME_STAGES.LOADING);

  const handleStageComplete = () => {
    setWelcomeStage((prevStage) => {
      switch (prevStage) {
        case WELCOME_STAGES.LOADING:
          return WELCOME_STAGES.CONTACTS;
        case WELCOME_STAGES.CONTACTS:
          return WELCOME_STAGES.STACKED;
        case WELCOME_STAGES.STACKED:
          return WELCOME_STAGES.MENU;
        case WELCOME_STAGES.MENU:
          return WELCOME_STAGES.COMPLETE;
        default:
          return WELCOME_STAGES.COMPLETE;
      }
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
