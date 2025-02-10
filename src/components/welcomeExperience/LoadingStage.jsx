// src/components/welcomeExperience/LoadingStage.jsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "../../contexts";
import { glassStyles } from "../../styles/glassEffects";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ShineContainer = styled(Box)`
  &::before {
    content: "";
    position: absolute;
    top: -150%;
    left: -150%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      -45deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: rotate(-45deg);
    animation: fullScreenShine 4s infinite;
    z-index: 1;
  }

  @keyframes fullScreenShine {
    0%,
    5% {
      top: -150%;
      left: -150%;
      opacity: 0;
    }
    20%,
    30% {
      opacity: 1;
      top: 0%;
      left: 0%;
    }
    45%,
    50% {
      top: 150%;
      left: 150%;
      opacity: 0;
    }
    100% {
      top: 150%;
      left: 150%;
      opacity: 0;
    }
  }
`;

const WelcomeText = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: linear-gradient(
    135deg,
    ${(props) =>
      props.isDarkMode
        ? "#FFFFFF 0%, #A0A0A0 100%"
        : "#2C3E50 0%, #3498DB 100%"}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 0.5s ease-in;
  cursor: default;
  user-select: none;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }
`;

const LoadingStage = ({ onComplete, minLoadTime = 2000 }) => {
  const { isDarkMode } = useTheme();
  const themeStyles = isDarkMode ? glassStyles.dark : glassStyles.light;
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);

    const timer = setTimeout(() => {
      onComplete();
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [onComplete, startTime, minLoadTime]);

  return (
    <ShineContainer
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
        overflow: "hidden",
        background: isDarkMode
          ? "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(33,33,33,0.95) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.95) 100%)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <WelcomeText isDarkMode={isDarkMode}>Hello</WelcomeText>
      </Box>
    </ShineContainer>
  );
};

LoadingStage.propTypes = {
  onComplete: PropTypes.func.isRequired,
  minLoadTime: PropTypes.number,
};

export default LoadingStage;
