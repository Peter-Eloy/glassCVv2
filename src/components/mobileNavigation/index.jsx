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
        bottom: 28,
        left: 16,
        right: 16,
        zIndex: 1000,
        borderRadius: "28px",
        overflow: "hidden",
        background: isDarkMode
          ? "rgba(24, 24, 34, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid rgba(${GLOW}, ${isDarkMode ? 0.3 : 0.25})`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, ${isDarkMode ? 0.4 : 0.15}), 0 0 20px rgba(${GLOW}, 0.12)`,
      }}
      elevation={0}
    >
      <Box sx={{ position: "relative" }}>
        {/* Sliding active-tab pill, sits behind the icons/labels */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: `calc(${value * 25}% + 6px)`,
            width: "calc(25% - 12px)",
            height: 48,
            transform: "translateY(-50%)",
            borderRadius: "18px",
            background: isDarkMode
              ? `rgba(${GLOW}, 0.16)`
              : `rgba(${GLOW}, 0.12)`,
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
          }}
        />
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            position: "relative",
            zIndex: 1,
            background: "transparent",
            height: 64,
            "& .MuiBottomNavigationAction-root": {
              color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
              minWidth: "auto",
              padding: "6px 0",
              transition: "color 0.25s ease, transform 0.2s ease",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
            },
            "& .MuiBottomNavigationAction-root:active": {
              transform: "scale(0.92)",
            },
            "& .MuiBottomNavigationAction-root:focus": {
              outline: "none",
            },
            "& .MuiBottomNavigationAction-root.Mui-focusVisible": {
              backgroundColor: "transparent",
              outline: "none",
            },
            "& .MuiTouchRipple-root": {
              display: "none",
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
      </Box>
    </Paper>
  );
};

export default MobileNavigation;
