// src/theme/index.js
import { keyframes } from "@emotion/react";

// Theme constants
export const COLORS = {
  light: {
    primary: "#213547",
    background: "rgba(255, 255, 255, 0.85)",
    border: "rgba(0, 0, 0, 0.12)",
    text: {
      primary: "#000",
      secondary: "rgba(0, 0, 0, 0.7)",
    },
    glass: {
      background: "rgba(255, 255, 255, 0.85)",
      border: "rgba(255, 255, 255, 0.18)",
      hover: "rgba(255, 255, 255, 0.95)",
    },
  },
  dark: {
    primary: "#fff",
    background: "rgba(30, 30, 30, 0.85)",
    border: "rgba(255, 255, 255, 0.12)",
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    glass: {
      background: "rgba(30, 30, 30, 0.85)",
      border: "rgba(255, 255, 255, 0.18)",
      hover: "rgba(30, 30, 30, 0.95)",
    },
  },
};

// Layout constants
export const LAYOUT = {
  APPBAR_HEIGHT: 64,
  FOOTER_HEIGHT: 64,
  SIDEBAR_WIDTH: 240,
};

// Animation keyframes
export const animations = {
  shine: keyframes`
    0%, 5% {
      top: -150%;
      left: -150%;
      opacity: 0;
    }
    20%, 30% {
      opacity: 1;
      top: 0%;
      left: 0%;
    }
    45%, 50% {
      top: 150%;
      left: 150%;
      opacity: 0;
    }
    100% {
      top: 150%;
      left: 150%;
      opacity: 0;
    }
  `,
  fadeIn: keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  revealText: keyframes`
    0%, 15% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8) rotate(-5deg);
    }
    25%, 35% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    40%, 100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8) rotate(5deg);
    }
  `,
};

// Shared styles
export const sharedStyles = {
  glass: {
    base: {
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      transition: "all 0.3s ease-in-out",
    },
    shine: {
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: "-150%",
        left: "-150%",
        width: "200%",
        height: "200%",
        background:
          "linear-gradient(-45deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
        transform: "rotate(-45deg)",
        animation: `${animations.shine} 4s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
      },
    },
  },
  mixins: {
    flexCenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    absoluteCenter: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
};

// Export theme creator function
export const createTheme = (isDarkMode) => ({
  colors: isDarkMode ? COLORS.dark : COLORS.light,
  layout: LAYOUT,
  animations,
  styles: sharedStyles,
});
