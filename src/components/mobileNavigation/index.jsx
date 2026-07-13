import { Box, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts";
import { getMobileNavIndex } from "../../utils/mobileNavIndex";

const GLOW = "0, 191, 255";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const value = getMobileNavIndex(location.pathname);

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/portfolio");
        break;
      case 2:
        navigate("/skills");
        break;
      case 3:
        navigate("/blog");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isDarkMode
          ? "rgba(20, 20, 30, 0.75)"
          : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: `1px solid rgba(${GLOW}, ${isDarkMode ? 0.25 : 0.2})`,
        boxShadow: `0 -4px 24px rgba(${GLOW}, 0.08)`,
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          background: "transparent",
          "& .MuiBottomNavigationAction-root": {
            color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            minWidth: "auto",
            padding: "6px 0",
            transition: "color 0.25s ease, transform 0.2s ease",
          },
          "& .MuiBottomNavigationAction-root:active": {
            transform: "scale(0.92)",
          },
          "& .Mui-selected": {
            color: `rgb(${GLOW})`,
          },
          "& .Mui-selected .MuiSvgIcon-root": {
            filter: `drop-shadow(0 0 6px rgba(${GLOW}, 0.9)) drop-shadow(0 0 12px rgba(${GLOW}, 0.5))`,
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Portfolio" icon={<WorkIcon />} />
        <BottomNavigationAction label="Skills" icon={<PsychologyIcon />} />
        <BottomNavigationAction label="Blog" icon={<ArticleIcon />} />
      </BottomNavigation>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: `${value * 25}%`,
          width: "25%",
          height: "2px",
          background: `linear-gradient(90deg, transparent, rgb(${GLOW}), transparent)`,
          boxShadow: `0 0 8px 1px rgba(${GLOW}, 0.8)`,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </Paper>
  );
};

export default MobileNavigation;
