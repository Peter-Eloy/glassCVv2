import { Box } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";

const GLOW = "0, 191, 255";
const UP = "#4caf50";

const TICKER_ITEMS = [
  { symbol: "REACT", detail: "React.js / React Native", trend: "up" },
  { symbol: "GO", detail: "Go / Fiber", trend: "up" },
  { symbol: "NODE", detail: "Node.js", trend: "flat" },
  { symbol: "AI-AGENTS", detail: "Agent Orchestration", trend: "up" },
  { symbol: "OPEN-D", detail: "Private Beta", trend: "up" },
  { symbol: "NEXT", detail: "Next.js", trend: "flat" },
  { symbol: "TS", detail: "TypeScript", trend: "up" },
  { symbol: "SQL", detail: "MSSQL / PostgreSQL", trend: "flat" },
  { symbol: "OLLAMA", detail: "Local LLMs", trend: "up" },
  { symbol: "8+ YRS", detail: "Full-Stack Experience", trend: "up" },
];

const TickerRow = ({ items, isDarkMode }) => (
  <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
    {items.map((item, index) => (
      <Box
        key={`${item.symbol}-${index}`}
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 1,
          px: 3,
          whiteSpace: "nowrap",
        }}
      >
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: isDarkMode ? "#fff" : "#213547",
          }}
        >
          {item.symbol}
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: "0.85rem",
            color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}
        >
          {item.detail}
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color: item.trend === "up" ? UP : `rgb(${GLOW})`,
          }}
        >
          {item.trend === "up" ? "▲" : "▬"}
        </Box>
        <Box
          component="span"
          sx={{
            mx: 2,
            color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
          }}
        >
          •
        </Box>
      </Box>
    ))}
  </Box>
);

const SkillsTicker = () => {
  const { isDarkMode } = useTheme();

  return (
    <GlassContainer sx={{ overflow: "hidden", py: 1.5 }}>
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: "skillsTickerScroll 32s linear infinite",
          "&:hover": {
            animationPlayState: "paused",
          },
          "@keyframes skillsTickerScroll": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
        }}
      >
        <TickerRow items={TICKER_ITEMS} isDarkMode={isDarkMode} />
        <TickerRow items={TICKER_ITEMS} isDarkMode={isDarkMode} aria-hidden="true" />
      </Box>
    </GlassContainer>
  );
};

export default SkillsTicker;
