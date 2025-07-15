import { Box, Typography } from "@mui/material";
import GlassContainer from "../../GlassContainer";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts";

const CategoryCard = ({ title, description, onClick, isExpanded, id }) => {
  const { isDarkMode } = useTheme();

  const getCardIcon = () => {
    switch (id) {
      case "tradingview":
        return "📈";
      case "vscode":
        return "💻";
      case "wordpress":
        return "🌐";
      default:
        return "🚀";
    }
  };

  return (
    <GlassContainer
      onClick={onClick}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: isExpanded ? "scale(0.98)" : "scale(1)",
        height: isExpanded ? "60px" : "120px",
        overflow: "hidden",
        mb: 1.5,
        opacity: isExpanded ? 0.8 : 1,
        "&:hover": {
          transform: isExpanded ? "scale(0.98)" : "scale(1.02)",
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0, 191, 255, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 2,
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(0, 191, 255, 0.05) 0%, rgba(0, 100, 200, 0.02) 100%)"
            : "linear-gradient(135deg, rgba(0, 191, 255, 0.03) 0%, rgba(0, 100, 200, 0.01) 100%)",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.5rem",
            mb: 1,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          {getCardIcon()}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: isExpanded ? 0 : 1,
            fontWeight: "bold",
            color: isDarkMode ? "#fff" : "#213547",
          }}
        >
          {title}
        </Typography>

        {!isExpanded && (
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              lineHeight: 1.4,
              color: isDarkMode ? "#fff" : "#213547",
              fontSize: "0.875rem",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </GlassContainer>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default CategoryCard;
