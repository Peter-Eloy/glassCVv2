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
        height: "120px",
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          //   background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: isDarkMode ? "#fff" : "#000",
            mb: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
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
