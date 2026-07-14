import React from "react";
import { Box, Grid } from "@mui/material";
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
  {
    id: "wordpress",
    title: "WordPress",
    description: "Custom WordPress plugins and themes for real estate platforms",
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
    id: "hobbies",
    title: "Products & Experiments",
    description: "Indie products, automation projects, and creative ventures",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "open-d",
        title: "Open-D",
        description:
          "React Native AI companion app for Type 1 diabetes management, in private beta.",
      },
      {
        id: "medicina-open-d",
        title: "Nadie Sin Su Medicina",
        description:
          "Open-source platform helping diabetes patients denied medication gather support and generate formal complaint letters.",
      },
      {
        id: "openclaw",
        title: "OpenClaw Automation",
        description:
          "Game automation project exploring computer vision and AI-driven bot development.",
      },
      {
        id: "openclaw-ai-contrib",
        title: "OpenClaw.ai (Open Source Contributor)",
        description:
          "Core patches and custom skills contributed to an open-source multi-agent AI orchestration platform.",
      },
      {
        id: "audiobook",
        title: "YouTube Audiobook Channel",
        description:
          "Curated audiobook content focusing on tech, business, and personal development.",
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
