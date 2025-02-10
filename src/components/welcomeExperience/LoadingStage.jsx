// src/components/welcomeExperience/LoadingStage.jsx
import { useEffect } from "react";
import { Box } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "../../contexts";
import { glassStyles } from "../../styles/glassEffects";
import { STAGE_DURATION, WELCOME_STAGES } from "./stages";
import PropTypes from "prop-types";

const LoadingStage = ({ onComplete }) => {
  const { isDarkMode } = useTheme();
  const themeStyles = isDarkMode ? glassStyles.dark : glassStyles.light;

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, STAGE_DURATION[WELCOME_STAGES.LOADING]);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...glassStyles.shared,
        ...themeStyles,
        zIndex: 9999,
      }}
    >
      <TypeAnimation
        sequence={["Hello", STAGE_DURATION[WELCOME_STAGES.LOADING] - 500]}
        wrapper="h1"
        cursor={true}
        style={{
          fontSize: "4em",
          ...themeStyles,
        }}
      />
    </Box>
  );
};

LoadingStage.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default LoadingStage;
