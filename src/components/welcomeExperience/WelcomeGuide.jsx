// src/components/welcomeExperience/WelcomeGuide.jsx
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { STAGE_DURATION, WELCOME_STAGES } from "./stages";
import PropTypes from "prop-types";

const WelcomeGuide = ({ stage, onStageComplete }) => {
  useEffect(() => {
    if (stage === WELCOME_STAGES.COMPLETE) return;

    const timer = setTimeout(() => {
      onStageComplete();
    }, STAGE_DURATION[stage]);

    return () => clearTimeout(timer);
  }, [stage, onStageComplete]);

  // No visual component needed - just timer logic
  return null;
};

WelcomeGuide.propTypes = {
  stage: PropTypes.oneOf(Object.values(WELCOME_STAGES)).isRequired,
  onStageComplete: PropTypes.func.isRequired,
};

export default WelcomeGuide;
