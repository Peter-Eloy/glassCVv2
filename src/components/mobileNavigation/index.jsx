import { useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const getActiveValue = () => {
    const path = location.pathname;
    if (path === "/") return 0;
    if (path.startsWith("/portfolio")) return 1;
    if (path === "/skills") return 2;
    if (path === "/blog") return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveValue());

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          ? "rgba(30, 30, 30, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
        }`,
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
            color: isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
            minWidth: "auto",
            padding: "6px 0",
          },
          "& .Mui-selected": {
            color: isDarkMode ? "#fff" : "#1976d2",
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Portfolio" icon={<WorkIcon />} />
        <BottomNavigationAction label="Skills" icon={<PsychologyIcon />} />
        <BottomNavigationAction label="Blog" icon={<ArticleIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNavigation;
