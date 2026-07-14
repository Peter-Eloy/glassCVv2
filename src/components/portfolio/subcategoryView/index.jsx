import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import GlassContainer from "../../glassContainer";
import ProjectDetailModal from "../projectDetailModal";
import { useTheme } from "../../../contexts";
import categories from "../../../data/portfolio/portfolioCategories";

const PortfolioSubcategoryView = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Category not found
        </Typography>
      </Box>
    );
  }

  const handleBackClick = () => {
    navigate("/portfolio");
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedProject(subcategory);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with back button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          gap: 2,
        }}
      >
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: isDarkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          {category.title}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          overflow: "auto",
          alignContent: "start",
        }}
      >
        {category.subcategories?.map((subcategory, index) => (
          <GlassContainer
            key={subcategory.id}
            onClick={() => handleSubcategoryClick(subcategory)}
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              opacity: 0,
              animation: `subcategoryFadeIn 0.6s ease-out ${
                index * 0.1
              }s forwards`,
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: isDarkMode
                  ? "0 12px 40px rgba(255, 255, 255, 0.15)"
                  : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
              "@keyframes subcategoryFadeIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(30px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                color: isDarkMode ? "#fff" : "#000",
              }}
            >
              {subcategory.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(0, 0, 0, 0.8)",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                px: 1,
              }}
            >
              {subcategory.description}
            </Typography>
          </GlassContainer>
        ))}
      </Box>

      <ProjectDetailModal
        open={modalOpen}
        onClose={handleModalClose}
        project={selectedProject}
      />
    </Box>
  );
};

export default PortfolioSubcategoryView;
