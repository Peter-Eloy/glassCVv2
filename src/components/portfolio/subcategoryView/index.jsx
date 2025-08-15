import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import GlassContainer from "../../glassContainer";
import ProjectDetailModal from "../projectDetailModal";
import { useTheme } from "../../../contexts";

const categories = [
  {
    id: "n00btrading",
    title: "n00b trading",
    description: "AI-powered trading tools and analysis systems",
    subcategories: [
      {
        id: "ai-news-bot",
        title: "AI News Bot Analyst",
        description:
          "Automated trading analysis using AI-powered news sentiment and market data processing for informed trading decisions.",
        category: "Trading Bot",
        fullDescription: `An on-premise AI-powered news bot that fetches financial data and RSS feeds via a Flask Python server, processes them with JavaScript scripts, and uses n8n to orchestrate workflows and feed normalized inputs into a local LLMs hosted on Ollama.
        
        It generates concise, broadcast-style news bulletins and publishes them directly to Telegram.
        
        Upcoming enhancements include text-to-speech audio briefings and automated short-clip video generation in a news format.`,
        image: "/workflow-ai.webp",
        technologies: [
          "n8n",
          "Python",
          "JavaScript",
          "Ollama",
          "RSS",
          "Cron",
          "REST API",
        ],
        features: [
          "Real-time news sentiment analysis",
          "Multi-source data aggregation",
          "Custom risk management",
          "Automated fetching system",
        ],
        liveUrl: "https://t.me/s/tradeTheCrypto",
        // githubUrl: "https://github.com/peter-eloy/ai-trading-bot",
      },
      {
        id: "indicators-tools",
        title: "Indicators & Trading Tools",
        description:
          "Custom technical analysis indicators and comprehensive trading tools designed for market analysis and strategy development.",
        category: "Trading Tools",
        fullDescription: `A comprehensive suite of Fibonacci, Moving Average, and Volatility indicators built for serious traders and analysts.

Includes static and dynamic Fibonacci retracement overlays, up to 20 fully configurable moving averages with cross and strength alerts, and ATR-adaptive Bollinger Bands featuring squeeze detection. All indicators offer custom timeframes, clean chart overlays, and extensive parameter controls.

Designed for both beginners and professional traders with personalizable interfaces, multi-timeframe support, and integrated backtesting capabilities.`,
        image: "/indicators-trader.webp",
        technologies: ["Pinescript"],
        features: [
          "Static & dynamic Fibonacci retracement levels",
          "Up to 20 customizable moving averages with cross alerts",
          "Relative Strength analysis on any MA",
          "ATR-based Bollinger Bands with squeeze detection",
          "Custom timeframes and adjustable parameters",
          "Built-in price and indicator alert system",
        ],
        liveUrl: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
        // githubUrl: "https://github.com/peter-eloy/trading-indicators",
      },
      //EA trading bot
      //       {
      //         id: "eas",
      //         title: "EAs (Expert Advisors)",
      //         description:
      //           "Automated trading systems and expert advisors for MetaTrader platforms with advanced risk management features.",
      //         category: "Expert Advisor",
      //         fullDescription: `Professional-grade Expert Advisors (EAs) for MetaTrader 4 and 5 platforms with sophisticated trading algorithms.

      // Built with advanced risk management systems, these EAs can execute trades automatically based on predefined strategies and market conditions.

      // Features include dynamic lot sizing, multi-currency support, and comprehensive reporting systems for performance tracking.`,
      //         image: "/peview-image.jpg",
      //         technologies: [
      //           "MQL4",
      //           "MQL5",
      //           "C++",
      //           "Python",
      //           "MySQL",
      //           "API Integration",
      //         ],
      //         features: [
      //           "Multi-strategy trading algorithms",
      //           "Advanced risk management",
      //           "Dynamic position sizing",
      //           "Real-time market monitoring",
      //           "Performance analytics dashboard",
      //           "Cross-platform compatibility",
      //         ],
      //         liveUrl: "https://example.com/expert-advisors",
      //         githubUrl: "https://github.com/peter-eloy/mt4-expert-advisors",
      //       },
    ],
  },
  {
    id: "vscode",
    title: "VS Code Themes",
    description: "Custom themes for Visual Studio Code",
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
];

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
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          overflow: "hidden",
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
