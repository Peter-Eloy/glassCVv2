import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import GlassContainer from "../../glassContainer";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts";

const CategoryCard = ({
  title,
  description,
  onClick,
  isExpanded,
  categoryLabel,
  status,
}) => {
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
        {(categoryLabel || status) && (
          <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
            {categoryLabel && (
              <Chip
                label={categoryLabel}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                  color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                }}
              />
            )}
            {status && (
              <Chip
                label={status}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  bgcolor: "rgba(0, 191, 255, 0.15)",
                  color: "rgb(0, 191, 255)",
                }}
              />
            )}
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontSize: "1.1rem",
            fontWeight: 600,
            color: isDarkMode ? "#fff" : "#000",
            height: "26px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
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
            WebkitLineClamp: 3,
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
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  categoryLabel: PropTypes.string,
  status: PropTypes.string,
};

export default CategoryCard;
