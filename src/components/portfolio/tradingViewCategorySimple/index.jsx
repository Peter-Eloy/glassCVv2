import { Box, Typography, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts";

const TradingViewCategorySimple = ({ isExpanded, onClose }) => {
  const { isDarkMode } = useTheme();

  console.log("TradingView Simple component rendered");
  console.log(
    "Props received - isExpanded:",
    isExpanded,
    "type:",
    typeof isExpanded
  );
  console.log("Props received - onClose:", onClose, "type:", typeof onClose);

  if (!isExpanded) {
    console.log("Not expanded, returning null");
    return null;
  }

  console.log("Rendering simple TradingView modal");

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255, 0, 0, 0.9)", // Very visible red
        zIndex: 99999, // Even higher z-index
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(10px)",
      }}
      onClick={(e) => {
        console.log("Modal background clicked");
        e.stopPropagation();
      }}
    >
      <Box
        sx={{
          background: isDarkMode ? "#333" : "#fff",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          color: isDarkMode ? "#fff" : "#000",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "3px solid yellow", // Very visible border
        }}
        onClick={(e) => {
          console.log("Modal content clicked");
          e.stopPropagation();
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          TradingView Modal Works!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your 3 indicators will be shown here
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          ✕ Close
        </IconButton>
      </Box>
    </Box>
  );
};

TradingViewCategorySimple.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TradingViewCategorySimple;
