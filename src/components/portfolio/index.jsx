import React, { useState } from "react";
import { Box } from "@mui/material";
import CategoryCard from "../portfolio/categoryCard";
import { useTheme } from "../../contexts";

const categories = [
  {
    id: "tradingview",
    title: "TradingView Indicators",
    description:
      "Collection of custom technical analysis indicators and trading tools",
    image: "/path/to/tradingview-category-image.jpg",
    link: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
  },
  {
    id: "vscode",
    title: "VS Code Themes",
    description: "Custom themes for Visual Studio Code",
    image: "/path/to/vscode-category-image.jpg",
    link: "https://marketplace.visualstudio.com/your-profile",
  },
  {
    id: "wordpress",
    title: "WordPress Plugins",
    description: "Custom WordPress plugins and themes",
    image: "/path/to/wordpress-category-image.jpg",
    link: "https://wordpress.org/your-profile",
  },
];

const Portfolio = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { isDarkMode } = useTheme();

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 3,
        height: "100%",
        overflow: "auto",
      }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          {...category}
          isExpanded={expandedCategory === category.id}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </Box>
  );
};

export default Portfolio;
