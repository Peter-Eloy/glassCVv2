import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Launch as LaunchIcon,
  TrendingUp,
  ShowChart,
  Timeline,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Animation keyframes
const slideUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnimatedCard = styled(Card)`
  animation: ${slideUp} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0, 191, 255, 0.3);
  }
`;

const indicators = [
  {
    id: "fibsync",
    name: "FibSync - DynamicFibSupport",
    description:
      "Advanced Fibonacci retracement tool that dynamically adjusts support and resistance levels based on market volatility. Features automatic pivot detection and multi-timeframe analysis for precise entry and exit points.",
    icon: <Timeline />,
    type: "Support & Resistance",
    complexity: "Advanced",
    link: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
    features: [
      "Dynamic Fibonacci Levels",
      "Auto Pivot Detection",
      "Multi-timeframe Support",
      "Volatility Adjustment",
    ],
  },
  {
    id: "can",
    name: "CAN INDICATOR",
    description:
      "Comprehensive Analysis Network indicator that combines RSI, MACD, and Stochastic oscillators with custom algorithms to filter noise and provide clear buy/sell signals with high accuracy.",
    icon: <TrendingUp />,
    type: "Momentum & Signals",
    complexity: "Intermediate",
    link: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
    features: [
      "Multi-Oscillator Fusion",
      "Signal Filtering",
      "Noise Reduction",
      "Alert System",
    ],
  },
  {
    id: "bollinger",
    name: "Bollinger Bands ETS",
    description:
      "Enhanced Trading System version of Bollinger Bands with adaptive periods, volatility-based alerts, and automatic trend detection. Perfect for both trending and ranging markets.",
    icon: <ShowChart />,
    type: "Volatility & Trends",
    complexity: "Beginner",
    link: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
    features: [
      "Adaptive Periods",
      "Volatility Alerts",
      "Trend Detection",
      "Range Identification",
    ],
  },
];

const TradingViewCategory = ({ isExpanded, onClose, inline = false }) => {
  const { isDarkMode } = useTheme();
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      // Small delay before showing cards for smooth animation
      const timer = setTimeout(() => setShowCards(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowCards(false);
    }
  }, [isExpanded]);

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Beginner":
        return "#4caf50";
      case "Intermediate":
        return "#ff9800";
      case "Advanced":
        return "#f44336";
      default:
        return "#2196f3";
    }
  };

  const handleIndicatorClick = (indicator) => {
    // Open the specific indicator page
    window.open(indicator.link, "_blank", "noopener,noreferrer");
  };

  if (!isExpanded) return null;

  // Inline layout for portfolio page
  if (inline) {
    return (
      <Box
        sx={{
          mt: 2,
          p: 2,
          background: isDarkMode
            ? "rgba(0, 191, 255, 0.05)"
            : "rgba(0, 191, 255, 0.03)",
          borderRadius: 2,
          border: `1px solid ${
            isDarkMode ? "rgba(0, 191, 255, 0.2)" : "rgba(0, 191, 255, 0.1)"
          }`,
        }}
      >
        {/* Compact Header */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "#00bfff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          TradingView Indicators
        </Typography>

        {/* Indicators - Simple Grid */}
        {showCards && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {indicators.map((indicator, index) => (
              <AnimatedCard
                key={indicator.id}
                delay={index * 0.1}
                onClick={() => handleIndicatorClick(indicator)}
                sx={{
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.02)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                  height: "auto",
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <Box sx={{ color: "#00bfff", fontSize: "1.2rem", mt: 0.5 }}>
                      {indicator.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, fontSize: "1rem" }}
                      >
                        {indicator.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.8,
                          fontSize: "0.875rem",
                          lineHeight: 1.4,
                          mb: 1,
                        }}
                      >
                        {indicator.description}
                      </Typography>

                      {/* Features */}
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {indicator.features.slice(0, 3).map((feature) => (
                          <Box
                            key={feature}
                            sx={{
                              fontSize: "0.75rem",
                              px: 1,
                              py: 0.25,
                              background: "rgba(0, 191, 255, 0.1)",
                              color: "#00bfff",
                              borderRadius: "12px",
                              border: "1px solid rgba(0, 191, 255, 0.2)",
                            }}
                          >
                            {feature}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Chip
                      label={indicator.complexity}
                      size="small"
                      sx={{
                        background: `${getComplexityColor(
                          indicator.complexity
                        )}20`,
                        color: getComplexityColor(indicator.complexity),
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                </CardContent>
              </AnimatedCard>
            ))}
          </Box>
        )}
      </Box>
    );
  }

  // Full modal layout (original)
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode
          ? "rgba(0, 0, 0, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        padding: 3,
        overflow: "auto",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #00bfff, #1e90ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          TradingView Indicators
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, mb: 2 }}>
          Custom technical analysis tools for precision trading
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          }}
        >
          ✕
        </IconButton>
      </Box>

      {/* Indicators Grid */}
      {showCards && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 3,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {indicators.map((indicator, index) => (
            <AnimatedCard
              key={indicator.id}
              delay={index * 0.2}
              onClick={() => handleIndicatorClick(indicator)}
              sx={{
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${
                  isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
                }`,
                borderRadius: "16px",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header with Icon and Type */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      mr: 2,
                      color: "#00bfff",
                      fontSize: "2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {indicator.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      {indicator.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Chip
                        label={indicator.type}
                        size="small"
                        sx={{
                          background: "#00bfff20",
                          color: "#00bfff",
                        }}
                      />
                      <Chip
                        label={indicator.complexity}
                        size="small"
                        sx={{
                          background: `${getComplexityColor(
                            indicator.complexity
                          )}20`,
                          color: getComplexityColor(indicator.complexity),
                        }}
                      />
                    </Box>
                  </Box>
                  <LaunchIcon sx={{ color: "#00bfff", opacity: 0.7 }} />
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  {indicator.description}
                </Typography>

                {/* Features */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Key Features:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {indicator.features.map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.3)"
                            : "rgba(0, 0, 0, 0.3)",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </AnimatedCard>
          ))}
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Visit my{" "}
          <a
            href="https://www.tradingview.com/u/mr_uponly/#published-scripts"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00bfff",
              textDecoration: "none",
            }}
          >
            TradingView profile
          </a>{" "}
          for more indicators
        </Typography>
      </Box>
    </Box>
  );
};

TradingViewCategory.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  inline: PropTypes.bool,
};

export default TradingViewCategory;
