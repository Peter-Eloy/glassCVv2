// src/pages/skills/index.jsx
import { Box, Typography } from "@mui/material";
import SkillsChecklist from "../../components/skillsChecklist";
import { useTheme } from "../../contexts";

const SkillsPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "24px",
        color: isDarkMode ? "#fff" : "#213547",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontFamily: "Playfair Display, serif",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Skills & Expertise
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          marginBottom: "3rem",
          maxWidth: "800px",
          margin: "0 auto 3rem",
        }}
      >
        Explore my technical and soft skills. Use the search icon to find
        specific skills and see how they match across categories.
      </Typography>
      <SkillsChecklist />
    </Box>
  );
};

export default SkillsPage;
