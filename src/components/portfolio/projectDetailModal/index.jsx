import React from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import {
  Close as CloseIcon,
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "../../../contexts";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  position: relative;
  width: 95%;
  max-width: 1000px;
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 16px;
  background: ${(props) =>
    props.isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(12px);
  border: 1px solid
    ${(props) =>
      props.isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"};
  padding: 32px;
  padding-top: 20px;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#213547")};

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"};
    border-radius: 4px;
  }
`;

const ProjectDetailModal = ({ open, onClose, project }) => {
  const { isDarkMode } = useTheme();

  if (!project) return null;

  const handleLinkClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        sx: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Fade in={open}>
        <ModalContent isDarkMode={isDarkMode}>
          {/* Close Button - Top Right Corner */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "sticky",
              top: 16,
              left: "calc(100% - 40px)",
              zIndex: 10,
              float: "right",
              color: isDarkMode ? "#fff" : "#000",
              backgroundColor: isDarkMode
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.5)",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? "rgba(0, 0, 0, 0.7)"
                  : "rgba(255, 255, 255, 0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Header */}
          <Box sx={{ mb: 3, mt: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                opacity: 0.7,
              }}
            >
              {project.category}
            </Typography>
          </Box>
          <Box>
            {/* Project Image */}
            {project.image && (
              <Box
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            )}

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: isDarkMode ? "#fff" : "#000",
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(0, 0, 0, 0.8)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {project.fullDescription || project.description}
              </Typography>
            </Box>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: isDarkMode ? "#fff" : "#000",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Technologies Used
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      sx={{
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)",
                        color: isDarkMode ? "#fff" : "#000",
                        border: `1px solid ${
                          isDarkMode
                            ? "rgba(255, 255, 255, 0.2)"
                            : "rgba(0, 0, 0, 0.2)"
                        }`,
                        mb: 1,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: isDarkMode ? "#fff" : "#000",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Key Features
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {project.features.map((feature, index) => (
                    <Typography
                      key={index}
                      component="li"
                      variant="body2"
                      sx={{
                        color: isDarkMode
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                        mb: 0.5,
                      }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Footer with Action Buttons */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {project.liveUrl && (
              <Button
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={() => handleLinkClick(project.liveUrl)}
                sx={{
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#fff" : "#000",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.2)",
                  },
                  border: `1px solid ${
                    isDarkMode
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(0, 0, 0, 0.3)"
                  }`,
                }}
              >
                View Live
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                onClick={() => handleLinkClick(project.githubUrl)}
                sx={{
                  color: isDarkMode ? "#fff" : "#000",
                  borderColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                    borderColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                View Code
              </Button>
            )}
          </Box>
        </ModalContent>
      </Fade>
    </StyledModal>
  );
};

ProjectDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fullDescription: PropTypes.string,
    image: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string),
    liveUrl: PropTypes.string,
    githubUrl: PropTypes.string,
  }),
};

export default ProjectDetailModal;
