import { useState, useEffect } from "react";
import { Box, TextField, Typography, Chip } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import skillsData from "../../data/skills/skills.json";
import SearchIcon from "@mui/icons-material/Search";

const SkillsChecklist = () => {
  const { isDarkMode } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const checkSkillMatch = (skill, terms) => {
    return terms.some((term) => {
      const searchLower = term.toLowerCase();
      return (
        skill.name.toLowerCase().includes(searchLower) ||
        (skill.keywords &&
          skill.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchLower)
          ))
      );
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (!isSearchActive && value) {
      setIsSearchActive(true);
    }
  };

  const handleAddSearchTerm = (event) => {
    if (event.key === "Enter" && searchInput.trim()) {
      setSearchTerms((prev) => [...prev, searchInput.trim()]);
      setSearchInput("");
    }
  };

  const renderSkillList = (skills) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {skills.map((skill) => (
        <Box
          key={skill.id}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Typography variant="body2" sx={{ width: "120px" }}>
            {skill.name}
          </Typography>
          <Box
            sx={{
              position: "relative",
              flex: 1,
              height: 6,
              bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${skill.proficiency}%`,
                bgcolor: matchedSkills.includes(skill)
                  ? "#4caf50"
                  : isDarkMode
                  ? "#90caf9"
                  : "#1976d2",
                transition: "width 0.3s ease-in-out",
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ width: "35px" }}>
            {skill.proficiency}%
          </Typography>
        </Box>
      ))}
    </Box>
  );

  useEffect(() => {
    const allSkills = [...skillsData.hardSkills, ...skillsData.softSkills];
    const matches = allSkills.filter((skill) =>
      checkSkillMatch(skill, searchTerms)
    );
    setMatchedSkills(matches);
  }, [searchTerms]);

  return (
    <Box sx={{ height: "100%", padding: 2 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Type skill and press Enter to search..."
        value={searchInput}
        onChange={handleSearchChange}
        onKeyPress={handleAddSearchTerm}
        InputProps={{
          startAdornment: (
            <SearchIcon
              sx={{
                color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                mr: 1,
              }}
            />
          ),
        }}
        sx={{
          width: "35%",
          margin: "0 auto",
          mb: 3,
          "& .MuiOutlinedInput-root": {
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: `1px solid ${
              isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            }`,
            "& fieldset": { border: "none" },
            "&:hover": {
              background: isDarkMode
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.65)",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: isDarkMode ? "#fff" : "#213547",
            padding: "12px 20px",
          },
        }}
      />

      {/* Main Container */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 3,
          minHeight: "calc(100% - 60px)",
          width: "100%",
        }}
      >
        {/* Search Panel */}
        <Box
          sx={{
            position: "absolute",
            width: "40%",
            opacity: isSearchActive ? 1 : 0,
            visibility: isSearchActive ? "visible" : "hidden",
            transition: "all 0.3s ease-in-out",
            left: 0,
          }}
        >
          <GlassContainer>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Search Terms
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {searchTerms.map((term, index) => (
                  <Chip
                    key={index}
                    label={term}
                    onDelete={() =>
                      setSearchTerms((terms) => terms.filter((t) => t !== term))
                    }
                    size="small"
                  />
                ))}
              </Box>
              {matchedSkills.length > 0 && (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Matched Skills ({matchedSkills.length})
                  </Typography>
                  {renderSkillList(matchedSkills)}
                </>
              )}
            </Box>
          </GlassContainer>
        </Box>

        {/* Skills Container */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginLeft: isSearchActive ? "40%" : 0,
            transition: "all 0.3s ease-in-out",
            position: "relative",
          }}
        >
          {/* Hard Skills */}
          <Box
            sx={{
              width: "100%",
              position: isSearchActive ? "absolute" : "relative",
              transform: isSearchActive ? "translateY(0)" : "none",
              transition: "all 0.3s ease-in-out",
              zIndex: 2,
              flex: isSearchActive ? "none" : "1 1 50%",
            }}
          >
            <GlassContainer>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Hard Skills
                </Typography>
                {renderSkillList(skillsData.hardSkills)}
              </Box>
            </GlassContainer>
          </Box>

          {/* Soft Skills */}
          <Box
            sx={{
              width: "100%",
              position: isSearchActive ? "absolute" : "relative",
              transform: isSearchActive ? "translateY(30%)" : "none",
              transition: "all 0.3s ease-in-out",
              zIndex: 1,
              flex: isSearchActive ? "none" : "1 1 50%",
              marginLeft: isSearchActive ? 0 : 3,
            }}
          >
            <GlassContainer>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Soft Skills
                </Typography>
                {renderSkillList(skillsData.softSkills)}
              </Box>
            </GlassContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkillsChecklist;
