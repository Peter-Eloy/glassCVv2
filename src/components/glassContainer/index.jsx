// src/components/glassContainer/index.jsx
import { Box } from "@mui/material";
import { useTheme } from "../../contexts/index";
import { glassStyles } from "../../styles/glassEffects";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ShineContainer = styled(Box)`
  &.shine {
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
        rgba(255, 255, 255, 0.6),
        transparent
      );
      transform: rotate(-45deg);
      animation: stackedShine 4s 1;
      z-index: 1;
    }

    @keyframes stackedShine {
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
  }
`;

const RevealText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  font-weight: 300;
  color: ${(props) => props.textColor};
  white-space: nowrap;
  opacity: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  letter-spacing: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: revealStackedText 4s 1;

  @keyframes revealStackedText {
    0%,
    15% {
      opacity: 0;
      backdrop-filter: blur(0px);
      transform: translate(-50%, -50%) scale(0.95);
    }
    25%,
    35% {
      opacity: 1;
      backdrop-filter: blur(4px);
      transform: translate(-50%, -50%) scale(1);
    }
    40%,
    100% {
      opacity: 0;
      backdrop-filter: blur(0px);
      transform: translate(-50%, -50%) scale(1.05);
    }
  }
`;

const GlassContainer = ({ children, showShine }) => {
  const { isDarkMode } = useTheme();
  const themeStyles = isDarkMode ? glassStyles.dark : glassStyles.light;
  const textColor = isDarkMode ? "#fff" : "#213547";

  return (
    <ShineContainer
      className={showShine ? "shine" : ""}
      sx={{
        position: "relative",
        margin: "20px 20px",
        padding: "15px",
        ...glassStyles.shared,
        ...themeStyles,
        "&:hover": glassStyles.hover,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          opacity: showShine ? 0.7 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {children}
      </Box>
      {showShine && (
        <RevealText className="stackedReveal" textColor={textColor}>
          Contact Me!
        </RevealText>
      )}
    </ShineContainer>
  );
};

GlassContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showShine: PropTypes.bool,
};

GlassContainer.defaultProps = {
  showShine: false,
};

export default GlassContainer;
