// src/components/welcomeExperience/WelcomeGuide.jsx
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { STAGE_DURATION, WELCOME_STAGES } from "./stages";
import PropTypes from "prop-types";

const WelcomeGuide = ({ stage, onStageComplete }) => {
  // Handle stage transitions
  useEffect(() => {
    if (stage === WELCOME_STAGES.COMPLETE) return;

    const timer = setTimeout(() => {
      onStageComplete();
    }, STAGE_DURATION[stage]);

    return () => clearTimeout(timer);
  }, [stage, onStageComplete]);

  // Optional: Show stage labels for debugging
  if (process.env.NODE_ENV === "development") {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "8px",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          borderRadius: "4px",
          zIndex: 9999,
        }}
      >
        Current Stage: {stage}
      </Box>
    );
  }

  return null; // In production, this component only manages timing
};

WelcomeGuide.propTypes = {
  stage: PropTypes.oneOf(Object.values(WELCOME_STAGES)).isRequired,
  onStageComplete: PropTypes.func.isRequired,
};

export default WelcomeGuide;
