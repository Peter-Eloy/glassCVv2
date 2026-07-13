import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Chip, Button, IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTheme } from "../../contexts";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

const categories = [
  {
    id: "n00btrading",
    title: "n00b Trading",
    description: "AI-powered trading tools and analysis systems",
    projects: [
      {
        id: "ai-news-bot",
        title: "AI News Bot Analyst",
        description: "Automated trading analysis using AI-powered news sentiment and market data processing.",
        technologies: ["n8n", "Python", "JavaScript", "Ollama", "RSS"],
        features: ["Real-time sentiment analysis", "Multi-source aggregation", "Telegram integration"],
        liveUrl: "https://t.me/s/tradeTheCrypto",
      },
      {
        id: "indicators-tools",
        title: "Trading Indicators",
        description: "Custom technical analysis indicators for TradingView with Fibonacci, Moving Averages, and Bollinger Bands.",
        technologies: ["PineScript", "TradingView"],
        features: ["20+ customizable MAs", "Dynamic Fibonacci", "ATR-based BBs"],
        liveUrl: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
      },
    ],
  },
  {
    id: "wordpress",
    title: "WordPress Development",
    description: "Custom plugins and themes for real estate platforms",
    projects: [
      {
        id: "user-management",
        title: "User Management Plugin",
        description: "Advanced RBAC system with custom user profiles for VisaVerde platform.",
        technologies: ["PHP", "WordPress", "MySQL"],
        githubUrl: "https://github.com/Peter-Eloy/UserManagment",
        liveUrl: "https://www.visaverde.com",
      },
      {
        id: "property-management",
        title: "Property Management Plugin",
        description: "Full-featured property listing system with search, maps, and lead generation.",
        technologies: ["PHP", "WordPress", "Google Maps API"],
        githubUrl: "https://github.com/Peter-Eloy/PropertyManagment",
        liveUrl: "https://www.visaverde.com",
      },
      {
        id: "visaverde-pwa",
        title: "VisaVerde PWA Plugin",
        description: "Progressive Web App functionality with offline access and push notifications.",
        technologies: ["PHP", "JavaScript", "Service Workers"],
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-PWA",
        liveUrl: "https://www.visaverde.com",
      },
    ],
  },
  {
    id: "api",
    title: "API Central",
    description: "API orchestration platforms and development tools",
    projects: [
      {
        id: "backend-apis",
        title: "Backend APIs Platform",
        description: "Self-hosted API hub aggregating 9+ job board APIs with AI integration and cron jobs.",
        technologies: ["Next.js", "PostgreSQL", "Prisma", "RapidAPI"],
        features: ["9+ API integrations", "AI data processing", "Automated syncing"],
        liveUrl: "https://api.petereloy.dev",
        githubUrl: "https://github.com/Peter-Eloy/be-apis",
      },
      {
        id: "mock-api-server",
        title: "Mock API Server",
        description: "Free, open-source desktop app for creating REST APIs without backend code.",
        technologies: ["Python", "Flask", "PyInstaller"],
        features: ["No-code interface", "Cross-platform", "System tray integration"],
        liveUrl: "https://peter-eloy.github.io/Landing-py-server/",
        githubUrl: "https://github.com/Peter-Eloy/py-server",
      },
    ],
  },
  {
    id: "automation",
    title: "Automation & Hobbies",
    description: "Personal automation projects and creative ventures",
    projects: [
      {
        id: "openclaw",
        title: "OpenClaw Automation",
        description: "Game automation project using computer vision and AI. Exploring automated gameplay mechanics and bot development.",
        technologies: ["Python", "OpenCV", "AI/ML"],
        features: ["Computer vision", "Automated gameplay", "AI decision making"],
        status: "In Development",
      },
      {
        id: "audiobook-channel",
        title: "YouTube Audiobook Channel",
        description: "Curated audiobook content channel focusing on tech, business, and personal development books.",
        technologies: ["Content Creation", "Audio Engineering", "YouTube API"],
        features: ["Weekly releases", "Tech-focused content", "AI-assisted production"],
        status: "Launching Soon",
      },
    ],
  },
];

const MobilePortfolio = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Category List View
  if (!selectedCategory) {
    return (
      <Box sx={{ padding: "80px 16px 100px 16px", minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Portfolio
        </Typography>
        
        {categories.map((category) => (
          <Card
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            sx={{
              mb: 2,
              background: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
              borderRadius: 3,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:active": { transform: "scale(0.98)" },
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
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  Tap to view →
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Project List View
  return (
    <Box sx={{ padding: "80px 16px 100px 16px", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => setSelectedCategory(null)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {selectedCategory.title}
        </Typography>
      </Box>

      {/* Projects */}
      {selectedCategory.projects.map((project) => (
        <Card
          key={project.id}
          onClick={() => setSelectedProject(project)}
          sx={{
            mb: 2,
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
            border: `1px solid ${
              isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            }`,
            borderRadius: 3,
            cursor: "pointer",
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
                  color="primary"
                  sx={{ fontSize: "0.7rem" }}
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
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedProject.title}
              </Typography>
              {selectedProject.status && (
                <Chip
                  label={selectedProject.status}
                  size="small"
                  color="primary"
                  sx={{ mt: 1 }}
                />
              )}
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
