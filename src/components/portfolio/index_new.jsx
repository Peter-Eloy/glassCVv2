import { useState } from "react";
import { Box } from "@mui/material";
import CategoryCard from "../portfolio/categoryCard";
import TradingViewCategory from "../portfolio/tradingViewCategory";

const categories = [
  {
    id: "tradingview",
    title: "TradingView Indicators",
    description:
      "Custom technical analysis tools and trading indicators for precise market timing",
    link: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
  },
  {
    id: "vscode",
    title: "VS Code Themes",
    description:
      "Beautiful and functional themes for Visual Studio Code development environment",
    link: "https://marketplace.visualstudio.com/your-profile",
  },
  {
    id: "wordpress",
    title: "WordPress Plugins",
    description:
      "Custom WordPress plugins and themes for enhanced web functionality",
    link: "https://wordpress.org/your-profile",
  },
];

const Portfolio = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        height: "100%",
        overflow: "auto",
      }}
    >
      {categories.map((category) => (
        <Box key={category.id}>
          <CategoryCard
            {...category}
            isExpanded={expandedCategory === category.id}
            onClick={() => handleCategoryClick(category.id)}
          />

          {/* Show TradingView content inline when expanded */}
          {expandedCategory === "tradingview" &&
            category.id === "tradingview" && (
              <TradingViewCategory
                isExpanded={true}
                onClose={() => setExpandedCategory(null)}
                inline={true}
              />
            )}

          {/* Show VS Code content when expanded */}
          {expandedCategory === "vscode" && category.id === "vscode" && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                background: "rgba(0, 123, 255, 0.1)",
                borderRadius: 2,
                border: "1px solid rgba(0, 123, 255, 0.2)",
              }}
            >
              Coming Soon: Beautiful VS Code themes and extensions!
            </Box>
          )}

          {/* Show WordPress content when expanded */}
          {expandedCategory === "wordpress" && category.id === "wordpress" && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                background: "rgba(33, 117, 155, 0.1)",
                borderRadius: 2,
                border: "1px solid rgba(33, 117, 155, 0.2)",
              }}
            >
              Coming Soon: Custom WordPress plugins and themes!
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Portfolio;
