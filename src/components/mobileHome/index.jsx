import { useState } from "react";
import { Box, Typography, Chip, Button, Avatar } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import RevealOnScroll from "../revealOnScroll";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";

const MobileHome = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [buildingOpen, setBuildingOpen] = useState(false);

  const skills = [
    "React.js", "React Native", "Node.js", "Go", "TypeScript",
    "Next.js", "PostgreSQL", "AI Agents", "Prompt Engineering",
    "Ollama", "vLLM", "LM Studio"
  ];

  const highlights = [
    {
      title: "Experience",
      value: "7+ Years",
      subtext: "Web Development & PM"
    },
    {
      title: "Indie Apps",
      value: "2 Shipped",
      subtext: "Open-D & Nadie Sin Su Medicina"
    },
    {
      title: "Open Source",
      value: "1 Contribution",
      subtext: "Multi-agent AI platform"
    }
  ];

  const currentlyBuilding = [
    {
      title: "Open-D",
      subtitle: "AI companion for Type 1 diabetes",
      status: "Private Beta",
      categoryId: "hobbies",
    },
    {
      title: "Nadie Sin Su Medicina",
      subtitle: "Open-source patient advocacy platform",
      status: "Live",
      categoryId: "hobbies",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100%",
        padding: "24px 16px 100px 16px",
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Box
          sx={{
            width: 116,
            height: 116,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(0,191,255,0.7), rgba(0,191,255,0.05))",
            boxShadow: "0 0 20px rgba(0,191,255,0.5), 0 0 40px rgba(0,191,255,0.25)",
          }}
        >
          <Avatar
            src="/profile-photo.jpg"
            alt="Peter Eloy"
            sx={{
              width: 100,
              height: 100,
              bgcolor: isDarkMode ? "rgba(20,20,30,0.9)" : "rgba(255,255,255,0.9)",
              color: isDarkMode ? "#fff" : "#213547",
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            PE
          </Avatar>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Peter Eloy
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
            mb: 2,
            minHeight: "1.6em",
          }}
        >
          <TypeAnimation
            sequence={[
              "Full-Stack Developer", 2000,
              "AI Agent Builder", 2000,
              "Indie Developer", 2000,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={65}
            repeat={Infinity}
          />
        </Typography>
        
        {/* Availability Badge */}
        <Chip
          icon={<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4caf50", mr: 1 }} />}
          label="Open to Opportunities"
          sx={{
            bgcolor: isDarkMode ? "rgba(76, 175, 80, 0.2)" : "rgba(76, 175, 80, 0.1)",
            color: "#4caf50",
            fontWeight: 600,
            mb: 2,
          }}
        />
      </Box>

      {/* Quick Stats */}
      <RevealOnScroll>
        <GlassContainer sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, textAlign: "center" }}>
            {highlights.map((item) => (
              <Box key={item.title}>
                <Typography variant="caption" sx={{ opacity: 0.7, display: "block" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.5, fontSize: "0.65rem" }}>
                  {item.subtext}
                </Typography>
              </Box>
            ))}
          </Box>
        </GlassContainer>
      </RevealOnScroll>

      {/* Currently Building */}
      <RevealOnScroll delay={80}>
      <GlassContainer sx={{ mb: 2, p: 2 }}>
        <Box
          onClick={() => setBuildingOpen((prev) => !prev)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Currently Building
          </Typography>
          <ExpandMoreIcon
            sx={{
              transform: buildingOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </Box>
        {buildingOpen && (
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {currentlyBuilding.map((project) => (
              <Box
                key={project.title}
                onClick={() => navigate(`/portfolio/${project.categoryId}`)}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  "&:active": { transform: "scale(0.98)" },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                  <Chip
                    label={project.status}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      bgcolor: "rgba(0, 191, 255, 0.15)",
                      color: "rgb(0, 191, 255)",
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {project.subtitle}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </GlassContainer>
      </RevealOnScroll>

      {/* About */}
      <RevealOnScroll delay={80}>
        <GlassContainer sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            About
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, opacity: 0.9 }}>
            Full-stack developer with 7+ years of experience building scalable web and mobile applications.
            Specialized in React, React Native, Node.js, and Go. Deep hands-on experience with AI agents and
            agent orchestration, prompt engineering, and self-hosted local LLMs (Ollama, vLLM, LM Studio) on
            dedicated GPU hardware. Currently working as a Full-Stack Developer at NARTEX SOFTWARE while
            building an AI-powered React Native health app as an indie developer and contributing to
            open-source multi-agent AI projects.
          </Typography>
        </GlassContainer>
      </RevealOnScroll>

      {/* Skills */}
      <RevealOnScroll delay={80}>
        <GlassContainer sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Tech Stack
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  color: "inherit",
                }}
              />
            ))}
          </Box>
        </GlassContainer>
      </RevealOnScroll>

      {/* Contact Buttons */}
      <RevealOnScroll delay={80}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<WhatsAppIcon />}
          href="https://wa.me/34678381811?text=Hi%20Peter,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            bgcolor: "#25d366",
            color: "#fff",
            "&:hover": { bgcolor: "#128c7e" },
            py: 1.5,
            borderRadius: 2,
          }}
        >
          WhatsApp
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<EmailIcon />}
          href="mailto:petereloy@gmail.com"
          sx={{
            borderColor: isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            color: "inherit",
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Email
        </Button>
      </Box>

      {/* Social Links */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          startIcon={<LinkedInIcon />}
          href="https://www.linkedin.com/in/petereloy/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "inherit", minWidth: 0 }}
        >
          LinkedIn
        </Button>
        <Button
          startIcon={<GitHubIcon />}
          href="https://github.com/Peter-Eloy"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "inherit", minWidth: 0 }}
        >
          GitHub
        </Button>
        <Button
          startIcon={<XIcon />}
          href="https://x.com/petereloy"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "inherit", minWidth: 0 }}
        >
          X
        </Button>
      </Box>
      </RevealOnScroll>
    </Box>
  );
};

export default MobileHome;
