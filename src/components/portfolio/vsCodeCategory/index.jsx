import { Box, Typography, IconButton } from "@mui/material";
import { Code } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts";

const VSCodeCategory = ({ isExpanded, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!isExpanded) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode
          ? "rgba(0, 0, 0, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          background: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        }}
      >
        ✕
      </IconButton>

      <Code sx={{ fontSize: "4rem", color: "#007acc", mb: 2 }} />

      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        VS Code Themes
      </Typography>

      <Typography
        variant="h6"
        sx={{ opacity: 0.7, textAlign: "center", mb: 3 }}
      >
        Coming Soon!
      </Typography>

      <Typography
        variant="body1"
        sx={{ opacity: 0.6, textAlign: "center", maxWidth: "400px" }}
      >
        Custom themes for Visual Studio Code are in development. Stay tuned for
        beautiful coding environments!
      </Typography>
    </Box>
  );
};

VSCodeCategory.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VSCodeCategory;
