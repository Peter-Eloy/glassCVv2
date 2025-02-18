// src/theme/ThemeProvider.jsx
import {
  createTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme } from "./index";
import { useTheme } from "../contexts";

const createCombinedTheme = (isDarkMode) => {
  const customTheme = createTheme(isDarkMode);

  return {
    // Our custom theme
    ...customTheme,
    // MUI theme
    mui: createMuiTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
        primary: {
          main: isDarkMode ? "#fff" : "#213547",
        },
        background: {
          default: isDarkMode ? "#121212" : "#fff",
          paper: isDarkMode
            ? "rgba(30, 30, 30, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
        // Add more component overrides as needed
      },
    }),
  };
};

export const ThemeProvider = ({ children }) => {
  const { isDarkMode } = useTheme();
  const theme = createCombinedTheme(isDarkMode);

  return (
    <EmotionThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme.mui}>{children}</MuiThemeProvider>
    </EmotionThemeProvider>
  );
};
