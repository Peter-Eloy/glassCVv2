// src/pages/main/MainContent.jsx
import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/sidebar";
import LoadingStage from "../../components/welcomeExperience/LoadingStage";
import WelcomeGuide from "../../components/welcomeExperience/WelcomeGuide";
import { WELCOME_STAGES } from "../../components/welcomeExperience/stages";
import { useWelcome } from "../../contexts/welcomeContext";

const MainContent = () => {
  const { welcomeStage, handleStageComplete } = useWelcome();

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
    <Box sx={{ display: "flex" }}>
      <Sidebar
        showContactShine={welcomeStage === WELCOME_STAGES.CONTACTS}
        showStackedShine={welcomeStage === WELCOME_STAGES.STACKED}
      />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: "240px", // Width of the sidebar
        }}
      >
        {/* Your main page content */}
      </Box>

      {welcomeStage === WELCOME_STAGES.LOADING && (
        <LoadingStage onComplete={handleStageComplete} />
      )}

      {welcomeStage !== WELCOME_STAGES.LOADING &&
        welcomeStage !== WELCOME_STAGES.COMPLETE && (
          <WelcomeGuide
            stage={welcomeStage}
            onStageComplete={handleStageComplete}
          />
        )}
    </Box>
  );
};

export default MainContent;
