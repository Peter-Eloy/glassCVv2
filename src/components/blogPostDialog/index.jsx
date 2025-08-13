import { Modal, Fade, Box, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "../../contexts";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

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

const BlogPostDialog = ({ open, post, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!post) return null;

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

          {/* Content with spacing for close button */}
          <Box sx={{ mt: 1 }}>
            {post.media?.[0] && (
              <Box
                component="img"
                src={post.media[0].url}
                alt={post.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px", // Limit height to prevent excessive vertical space
                  objectFit: "contain", // Maintain aspect ratio without cropping
                  borderRadius: "8px",
                  mb: 3,
                }}
              />
            )}

            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                "& a": {
                  color: isDarkMode ? "#4dabf5" : "#1976d2",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
                "& img": {
                  maxWidth: "100%", // Prevent images from causing horizontal scroll
                  height: "auto",
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Box>
        </ModalContent>
      </Fade>
    </StyledModal>
  );
};

BlogPostDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    content: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default BlogPostDialog;
