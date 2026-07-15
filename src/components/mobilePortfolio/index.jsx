import { useState } from "react";
import { Box, Typography, Card, CardContent, Chip, Button, IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTheme } from "../../contexts";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import RevealOnScroll from "../revealOnScroll";
import portfolioCategories from "../../data/portfolio/portfolioCategories";

const GLOW = "0, 191, 255";

const categories = portfolioCategories.map((category) => ({
  ...category,
  projects: category.subcategories,
}));

const MobilePortfolio = () => {
  const { isDarkMode } = useTheme();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const selectedCategory = categoryId
    ? categories.find((cat) => cat.id === categoryId) || null
    : null;

  // Category List View
  if (!selectedCategory) {
    return (
      <Box sx={{ padding: "24px 16px 100px 16px" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Portfolio
        </Typography>

        {categories.map((category, index) => (
          <RevealOnScroll key={category.id} delay={index * 60}>
            <Card
              onClick={() => navigate(`/portfolio/${category.id}`)}
              sx={{
                mb: 2,
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
                color: isDarkMode ? "#fff" : "#213547",
                border: `1px solid rgba(${GLOW}, ${isDarkMode ? 0.18 : 0.15})`,
                borderLeft: `3px solid rgba(${GLOW}, 0.7)`,
                borderRadius: 3,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:active": { transform: "scale(0.98)" },
                "&:hover": { boxShadow: `0 0 16px rgba(${GLOW}, 0.15)` },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {category.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                  {category.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Chip
                    label={`${category.projects.length} projects`}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    }}
                  />
                  <Typography variant="caption" sx={{ color: `rgb(${GLOW})`, fontWeight: 600 }}>
                    Tap to view →
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </RevealOnScroll>
        ))}
      </Box>
    );
  }

  // Project List View
  return (
    <Box sx={{ padding: "24px 16px 100px 16px" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/portfolio")} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {selectedCategory.title}
        </Typography>
      </Box>

      {/* Projects */}
      {selectedCategory.projects.map((project, index) => (
        <RevealOnScroll key={project.id} delay={index * 60}>
        <Card
          onClick={() => setSelectedProject(project)}
          sx={{
            mb: 2,
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
            color: isDarkMode ? "#fff" : "#213547",
            border: `1px solid rgba(${GLOW}, ${isDarkMode ? 0.18 : 0.15})`,
            borderLeft: `3px solid rgba(${GLOW}, 0.7)`,
            borderRadius: 3,
            cursor: "pointer",
            transition: "box-shadow 0.2s",
            "&:hover": { boxShadow: `0 0 16px rgba(${GLOW}, 0.15)` },
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {project.title}
              </Typography>
              {project.status && (
                <Chip
                  label={project.status}
                  size="small"
                  sx={{ fontSize: "0.7rem", bgcolor: `rgba(${GLOW}, 0.15)`, color: `rgb(${GLOW})`, fontWeight: 600 }}
                />
              )}
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {project.technologies?.slice(0, 3).map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  }}
                />
              ))}
              {project.technologies?.length > 3 && (
                <Chip
                  label={`+${project.technologies.length - 3}`}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
        </RevealOnScroll>
      ))}

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            m: 2,
            background: isDarkMode ? "#1e1e1e" : "#fff",
            color: isDarkMode ? "#fff" : "#213547",
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ pb: 1, pr: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedProject.title}
              </Typography>
              {selectedProject.status && (
                <Chip
                  label={selectedProject.status}
                  size="small"
                  sx={{ mt: 1, bgcolor: `rgba(${GLOW}, 0.15)`, color: `rgb(${GLOW})`, fontWeight: 600 }}
                />
              )}
              <IconButton
                onClick={() => setSelectedProject(null)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                {selectedProject.description}
              </Typography>

              {selectedProject.technologies && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Technologies
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedProject.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {selectedProject.features && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Key Features
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {selectedProject.features.map((feature) => (
                      <Typography component="li" key={feature} variant="body2" sx={{ mb: 0.5 }}>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                {selectedProject.liveUrl && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: `rgb(${GLOW})`,
                      boxShadow: `0 0 12px rgba(${GLOW}, 0.5)`,
                      "&:hover": { bgcolor: `rgb(${GLOW})`, boxShadow: `0 0 20px rgba(${GLOW}, 0.7)` },
                    }}
                  >
                    Live Demo
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderColor: `rgba(${GLOW}, 0.5)`, color: `rgb(${GLOW})` }}
                  >
                    Code
                  </Button>
                )}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MobilePortfolio;
