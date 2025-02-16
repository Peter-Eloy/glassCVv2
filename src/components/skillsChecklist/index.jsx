import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Grid,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import skillsData from "../../data/skills/skills.json";

const SkillsChecklist = () => {
  const { isDarkMode } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [overallMatch, setOverallMatch] = useState(0);

  // Function to check if a skill matches any of the search terms
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

  // Add search term
  const handleAddSearchTerm = (event) => {
    if (event.key === "Enter" && searchInput.trim()) {
      setSearchTerms([...searchTerms, searchInput.trim()]);
      setSearchInput("");
    }
  };

  // Remove search term
  const handleRemoveSearchTerm = (termToRemove) => {
    setSearchTerms(searchTerms.filter((term) => term !== termToRemove));
  };

  // Calculate matches when search terms change
  useEffect(() => {
    if (searchTerms.length === 0) {
      setMatchedSkills([]);
      setOverallMatch(0);
      return;
    }

    const allSkills = [...skillsData.hardSkills, ...skillsData.softSkills];
    const matches = allSkills.filter((skill) =>
      checkSkillMatch(skill, searchTerms)
    );

    setMatchedSkills(matches);
    setOverallMatch((matches.length / searchTerms.length) * 100);
  }, [searchTerms]);

  // Calculate average proficiency for a skill category
  const calculateAverageProficiency = (skills) => {
    if (!skills.length) return 0;
    return (
      skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length
    );
  };

  const hardSkillsProficiency = calculateAverageProficiency(
    skillsData.hardSkills
  );
  const softSkillsProficiency = calculateAverageProficiency(
    skillsData.softSkills
  );

  const renderSkillList = (skills) => (
    <List>
      {skills.map((skill) => {
        const matched = matchedSkills.some((m) => m.id === skill.id);
        const shouldShowIndicator = searchTerms.length > 0;

        return (
          <ListItem key={skill.id}>
            {shouldShowIndicator && (
              <ListItemIcon>
                {matched ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
              </ListItemIcon>
            )}
            <ListItemText
              primary={skill.name}
              secondary={`Proficiency: ${skill.proficiency}%`}
            />
            <LinearProgress
              variant="determinate"
              value={skill.proficiency}
              sx={{
                width: "100px",
                marginLeft: 2,
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: matched
                    ? "#4caf50"
                    : isDarkMode
                    ? "#90caf9"
                    : "#1976d2",
                },
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Search Bar */}
      <Fade in={searchOpen}>
        <Box sx={{ mb: 4 }}>
          <GlassContainer>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type skill and press Enter to add to search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleAddSearchTerm}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isDarkMode
                        ? "rgba(255,255,255,0.23)"
                        : "rgba(0,0,0,0.23)",
                    },
                  },
                }}
              />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {searchTerms.map((term, index) => (
                  <Chip
                    key={index}
                    label={term}
                    onDelete={() => handleRemoveSearchTerm(term)}
                    color={
                      matchedSkills.some(
                        (skill) =>
                          skill.name
                            .toLowerCase()
                            .includes(term.toLowerCase()) ||
                          skill.keywords?.some((k) =>
                            k.toLowerCase().includes(term.toLowerCase())
                          )
                      )
                        ? "success"
                        : "default"
                    }
                  />
                ))}
              </Box>

              {searchTerms.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Overall Match: {overallMatch.toFixed(0)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={overallMatch}
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
            </Box>
          </GlassContainer>
        </Box>
      </Fade>

      {/* Skills Grid */}
      <Grid container spacing={2}>
        {/* Hard Skills */}
        <Grid item xs={6}>
          <GlassContainer>
            <Box>
              <Typography variant="h6" gutterBottom>
                Hard Skills
              </Typography>
              <LinearProgress
                variant="determinate"
                value={hardSkillsProficiency}
                sx={{ mb: 2 }}
              />
              {renderSkillList(skillsData.hardSkills)}
            </Box>
          </GlassContainer>
        </Grid>

        {/* Soft Skills */}
        <Grid item xs={6}>
          <GlassContainer>
            <Box>
              <Typography variant="h6" gutterBottom>
                Soft Skills
              </Typography>
              <LinearProgress
                variant="determinate"
                value={softSkillsProficiency}
                sx={{ mb: 2 }}
              />
              {renderSkillList(skillsData.softSkills)}
            </Box>
          </GlassContainer>
        </Grid>
      </Grid>

      {/* Search Toggle Button */}
      <IconButton
        onClick={() => setSearchOpen(!searchOpen)}
        sx={{
          position: "fixed",
          top: 80,
          right: 20,
          backgroundColor: isDarkMode
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: isDarkMode
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.2)",
          },
        }}
      >
        {searchOpen ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
    </Box>
  );
};

export default SkillsChecklist;
