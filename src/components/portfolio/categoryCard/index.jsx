import React from "react";
import { Box, Typography } from "@mui/material";
import GlassContainer from "../../glassContainer";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts";

const CategoryCard = ({ title, description, image, onClick, isExpanded }) => {
  const { isDarkMode } = useTheme();

  return (
    <GlassContainer
      onClick={onClick}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: isExpanded ? "scale(0.98)" : "scale(1)",
        margin: 0,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box sx={{ p: 3, height: "180px" }}>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontSize: "1.1rem",
            fontWeight: 600,
            color: isDarkMode ? "#fff" : "#000",
            height: "52px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
      </Box>
    </GlassContainer>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default CategoryCard;
