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
    animation: fullScreenShine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    z-index: 1;
    background-size: 200% 200%;
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
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(
    135deg,
    ${({ theme }) =>
      theme.isDark ? "#FFFFFF 0%, #A0A0A0 100%" : "#2C3E50 0%, #3498DB 100%"}
  );
  -webkit-background-clip: text;
  background-clip: text;
  animation: fadeIn 1s ease-in;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: -10px -20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    opacity: 0;
    animation: revealBg 4s ease-in-out infinite;
  }

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

  @keyframes revealBg {
    0%,
    15% {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    25%,
    35% {
      opacity: 1;
      backdrop-filter: blur(10px);
    }
    45%,
    100% {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
  }
`;

const StyledOverlay = styled(Box)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) =>
    theme.isDark
      ? "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(33,33,33,0.95) 100%)"
      : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.95) 100%)"};
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ revealing }) => (revealing ? 0 : 1)};
  backdrop-filter: blur(${({ revealing }) => (revealing ? "0px" : "10px")});
`;

const LoadingStage = ({ onComplete, minLoadTime = 2000 }) => {
  const { isDarkMode } = useTheme();
  const [startTime] = useState(Date.now());
  const [isRevealing, setIsRevealing] = useState(false);
  const theme = { isDark: isDarkMode };

  useEffect(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);

    const timer = setTimeout(() => {
      setIsRevealing(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [onComplete, startTime, minLoadTime]);

  return (
    <StyledOverlay theme={theme} revealing={isRevealing ? 1 : 0}>
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
          ...(isDarkMode ? glassStyles.dark : glassStyles.light),
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <WelcomeText theme={theme}>Hello</WelcomeText>
        </Box>
      </ShineContainer>
    </StyledOverlay>
  );
};

LoadingStage.propTypes = {
  onComplete: PropTypes.func.isRequired,
  minLoadTime: PropTypes.number,
};

export default LoadingStage;
