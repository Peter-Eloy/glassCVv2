import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../portfolio/categoryCard";
import { useTheme } from "../../contexts";

const categories = [
  {
    id: "n00btrading",
    title: "n00b trading",
    description: "AI-powered trading tools and analysis systems",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "ai-news-bot",
        title: "AI News Trading Bot Analyst",
        description:
          "Automated trading analysis using AI-powered news sentiment and market data processing for informed trading decisions.",
      },
      {
        id: "indicators-tools",
        title: "Indicators & Trading Tools",
        description:
          "Custom technical analysis indicators and comprehensive trading tools designed for market analysis and strategy development.",
      },
      {
        id: "eas",
        title: "EAs (Expert Advisors)",
        description:
          "Automated trading systems and expert advisors for MetaTrader platforms with advanced risk management features.",
      },
    ],
  },
  {
    id: "vscode",
    title: "VS Code Themes",
    description: "Custom themes for Visual Studio Code",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "dark-themes",
        title: "Dark Themes",
        description:
          "Elegant dark themes optimized for long coding sessions and reduced eye strain.",
      },
      {
        id: "light-themes",
        title: "Light Themes",
        description:
          "Clean and minimal light themes for enhanced readability and focus.",
      },
    ],
  },
  {
    id: "wordpress",
    title: "WordPress Plugins",
    description: "Custom WordPress plugins and themes",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "plugins",
        title: "Custom Plugins",
        description:
          "Tailored WordPress plugins for enhanced functionality and user experience.",
      },
      {
        id: "themes",
        title: "Custom Themes",
        description:
          "Responsive and SEO-optimized WordPress themes with modern design principles.",
      },
    ],
  },
  {
    id: "api",
    title: "API Central",
    description: "API orchestration platforms and development tools",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "backend-apis",
        title: "Backend APIs Platform",
        description:
          "Self-hosted API orchestration hub that aggregates and manages data from 9+ external APIs via RapidAPI, with automated cron jobs and AI integration.",
      },
      {
        id: "mock-api-server",
        title: "Mock API Server",
        description:
          "Free, open-source desktop application for creating and testing REST APIs without writing backend code. Perfect for rapid prototyping and frontend development.",
      },
    ],
  },
];

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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 2,
        p: 2,
        height: "100%",
        overflow: "hidden",
      }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          {...category}
          isExpanded={false}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </Box>
  );
};

export default Portfolio;
