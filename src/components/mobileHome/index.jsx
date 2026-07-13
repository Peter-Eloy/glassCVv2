import { Box, Typography, Chip, Button, Avatar } from "@mui/material";
import { useTheme } from "../../contexts";
import GlassContainer from "../glassContainer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const MobileHome = () => {
  const { isDarkMode } = useTheme();

  const skills = [
    "React.js", "React Native", "Node.js", "Go", "TypeScript",
    "Next.js", "PostgreSQL", "AI Agents", "Prompt Engineering",
    "Ollama", "vLLM", "LM Studio"
  ];

  const highlights = [
    {
      title: "Current Role",
      value: "Full-Stack Dev @ NARTEX SOFTWARE",
      subtext: "Feb 2024 - Present"
    },
    {
      title: "Experience",
      value: "7+ Years",
      subtext: "Web Development & PM"
    },
    {
      title: "Projects",
      value: "15+ Delivered",
      subtext: "Production apps"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100%",
        padding: "24px 16px 100px 16px",
        background: isDarkMode
          ? "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)",
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 2,
            bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            fontSize: "2.5rem",
          }}
        >
          PE
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Peter Eloy
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
            mb: 2 
          }}
        >
          Full-Stack Developer
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

      {/* About */}
      <GlassContainer sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          About
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.6, opacity: 0.9 }}>
          Full-stack developer with 7+ years of experience building scalable web and mobile applications.
          Specialized in React, React Native, Node.js, and Go. Deep hands-on experience with AI agents and
          agent orchestration, prompt engineering, and self-hosted local LLMs (Ollama, vLLM, LM Studio) on
          dedicated GPU hardware. Currently leading development at NARTEX SOFTWARE while building an
          AI-powered React Native health app as an indie developer and contributing to open-source
          multi-agent AI projects.
        </Typography>
      </GlassContainer>

      {/* Skills */}
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

      {/* Contact Buttons */}
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
      </Box>
    </Box>
  );
};

export default MobileHome;
