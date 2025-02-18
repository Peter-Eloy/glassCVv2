import { useState, useEffect } from "react";
import { Box, TextField, Typography, Chip } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import skillsData from "../../data/skills/skills.json";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const StackableContainer = styled(Box)`
  transition: all 0.4s ease-in-out;
  position: ${(props) =>
    props.isstacked === "true" ? "absolute" : "relative"};
  width: 100%;
  transform: ${(props) =>
    props.isstacked === "true"
      ? `translate(${props.offset.x}px, ${props.offset.y}px)`
      : "none"};
  z-index: ${(props) => props.zindex};
`;

const SearchField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background: ${(props) =>
      props.isdarkmode === "true"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(255, 255, 255, 0.5)"};
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid
      ${(props) =>
        props.isdarkmode === "true"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)"};

    &:hover,
    &:focus-within {
      background: ${(props) =>
        props.isdarkmode === "true"
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(255, 255, 255, 0.65)"};
      box-shadow: ${(props) =>
        props.isdarkmode === "true"
          ? "0 0 10px rgba(30, 144, 255, 0.15)"
          : "0 0 15px rgba(30, 144, 255, 0.2)"};
    }

    & fieldset {
      border: none;
    }
  }

  & .MuiOutlinedInput-input {
    color: ${(props) => (props.isdarkmode === "true" ? "#fff" : "#213547")};
    padding: 12px 20px;
  }
`;

const SkillsChecklist = () => {
  const { isDarkMode } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hardSkillsOnTop, setHardSkillsOnTop] = useState(true);

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
    } else if (value === "" && searchTerms.length === 0) {
      setIsSearchActive(false);
    }
  };

  const handleAddSearchTerm = (event) => {
    if (event.key === "Enter" && searchInput.trim()) {
      setSearchTerms((prev) => [...prev, searchInput.trim()]);
      setSearchInput("");
    }
  };

  const handleStackClick = () => {
    if (!isSearchActive) return;
    setHardSkillsOnTop(!hardSkillsOnTop);
  };

  const getOffset = (isTop) => {
    if (!isSearchActive) return { x: 0, y: 0 };
    return isTop ? { x: 0, y: 0 } : { x: 40, y: 20 }; // Offset for the bottom card
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
                  ? isDarkMode
                    ? "rgba(76, 175, 80, 0.8)"
                    : "#4caf50"
                  : isDarkMode
                  ? "rgba(144, 202, 249, 0.8)"
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
      <SearchField
        fullWidth
        placeholder="Type skill and press Enter to search..."
        value={searchInput}
        onChange={handleSearchChange}
        onKeyPress={handleAddSearchTerm}
        isdarkmode={isDarkMode.toString()}
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
        }}
      />

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
                    onDelete={() => {
                      const newTerms = searchTerms.filter((t) => t !== term);
                      setSearchTerms(newTerms);
                      if (newTerms.length === 0 && !searchInput) {
                        setIsSearchActive(false);
                      }
                    }}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode
                        ? "rgba(144, 202, 249, 0.2)"
                        : "rgba(25, 118, 210, 0.1)",
                      color: isDarkMode ? "#fff" : "#213547",
                    }}
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
            gap: isSearchActive ? 0 : 3,
            height: "500px",
          }}
        >
          {/* Hard Skills */}
          <StackableContainer
            onClick={handleStackClick}
            offset={getOffset(hardSkillsOnTop)}
            zindex={hardSkillsOnTop ? 2 : 1}
            isstacked={isSearchActive.toString()}
            sx={{ flex: isSearchActive ? "none" : 1 }}
          >
            <GlassContainer>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Hard Skills
                </Typography>
                {renderSkillList(skillsData.hardSkills)}
              </Box>
            </GlassContainer>
          </StackableContainer>

          {/* Soft Skills */}
          <StackableContainer
            onClick={handleStackClick}
            offset={getOffset(!hardSkillsOnTop)}
            zindex={hardSkillsOnTop ? 1 : 2}
            isstacked={isSearchActive.toString()}
            sx={{ flex: isSearchActive ? "none" : 1 }}
          >
            <GlassContainer>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Soft Skills
                </Typography>
                {renderSkillList(skillsData.softSkills)}
              </Box>
            </GlassContainer>
          </StackableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default SkillsChecklist;
