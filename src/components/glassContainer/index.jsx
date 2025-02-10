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
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shine 2s infinite;
    }

    @keyframes shine {
      0% {
        left: -100%;
        opacity: 0;
      }
      20% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      80% {
        opacity: 0.5;
      }
      100% {
        left: 150%;
        opacity: 0;
      }
    }
  }
`;

const GlassContainer = ({ children, showShine }) => {
  const { isDarkMode } = useTheme();
  const themeStyles = isDarkMode ? glassStyles.dark : glassStyles.light;

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
        overflow: "hidden", // Important for shine effect
      }}
    >
      {children}
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
