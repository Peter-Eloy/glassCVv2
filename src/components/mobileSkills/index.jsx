import { Box, Typography, LinearProgress, Chip, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import skillsData from "../../data/skills/skills.json";

const MobileSkills = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const skillCategories = [
    { id: "frontend", label: "Frontend", skills: ["JavaScript", "React.js", "HTML/CSS", "Next.js"] },
    { id: "backend", label: "Backend", skills: ["Node.js", "Golang", "SQL & Databases", "REST APIs"] },
    { id: "devops", label: "DevOps", skills: ["Version Control & CI/CD", "Docker", "AWS/Google Cloud"] },
    { id: "other", label: "Other", skills: ["State Management", "Testing & Debugging"] },
  ];

  const allSkills = [...skillsData.hardSkills, ...skillsData.softSkills];

  const getSkillProficiency = (skillName) => {
    const skill = allSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    return skill?.proficiency || 85;
  };

  return (
    <Box sx={{ padding: "80px 16px 100px 16px", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Skills & Expertise
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
        7+ years of hands-on experience
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3 }}>
        <GlassContainer sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2" }}>
            {skillsData.hardSkills.length}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Hard Skills
          </Typography>
        </GlassContainer>
        <GlassContainer sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#388e3c" }}>
            {skillsData.softSkills.length}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Soft Skills
          </Typography>
        </GlassContainer>
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          mb: 3,
          "& .MuiTabs-indicator": { backgroundColor: "#1976d2" },
          "& .MuiTab-root": {
            color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            textTransform: "none",
            minWidth: "auto",
            px: 2,
          },
          "& .Mui-selected": { color: "#1976d2" },
        }}
      >
        {skillCategories.map((cat) => (
          <Tab key={cat.id} label={cat.label} />
        ))}
        <Tab label="Soft Skills" />
      </Tabs>

      {/* Skills List */}
      <GlassContainer sx={{ p: 2 }}>
        {activeTab < skillCategories.length ? (
          <Box>
            {skillCategories[activeTab].skills.map((skillName) => {
              const proficiency = getSkillProficiency(skillName);
              return (
                <Box key={skillName} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {skillName}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {proficiency}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={proficiency}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#1976d2",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box>
            {skillsData.softSkills.map((skill) => (
              <Box key={skill.id} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {skill.name}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {skill.proficiency}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.proficiency}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#388e3c",
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </GlassContainer>

      {/* Keywords Cloud */}
      <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
        Expertise Areas
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {["React", "Node.js", "Go", "TypeScript", "Next.js", "PostgreSQL", 
          "WordPress", "AI Integration", "REST APIs", "Git", "Docker", 
          "AWS", "Python", "PineScript", "n8n"].map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            size="small"
            sx={{
              bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: "inherit",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MobileSkills;
