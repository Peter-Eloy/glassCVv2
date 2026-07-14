import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../portfolio/categoryCard";
import { useTheme } from "../../contexts";
import categories from "../../data/portfolio/portfolioCategories";

const Portfolio = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  console.log(
    "🎨 Welcome to the portfolio gallery! Showcasing",
    categories.length,
    "categories of awesome projects. Prepare to be amazed!"
  );

  const handleCategoryClick = (categoryId) => {
    console.log(
      "🚀 User clicked on",
      categoryId,
      "category! Navigation engines are firing up..."
    );

    const category = categories.find((cat) => cat.id === categoryId);
    if (category && category.isExternal) {
      console.log("🌍 Opening external link:", category.link);
      window.open(category.link, "_blank", "noopener,noreferrer");
    } else if (category && category.subcategories) {
      console.log(
        "✨ Found category with",
        category.subcategories.length,
        "subcategories. Off we go to explore",
        category.title + "!"
      );
      navigate(`/portfolio/${categoryId}`);
    }
  };

  return (
    <Box sx={{ height: "100%", overflow: "auto", p: 2 }}>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CategoryCard
              {...category}
              isExpanded={false}
              onClick={() => handleCategoryClick(category.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Portfolio;
