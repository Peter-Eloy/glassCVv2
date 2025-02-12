// src/components/blogPostDialog/index.jsx
import { Modal, Fade, Box, Typography, IconButton } from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
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
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  background: ${(props) =>
    props.isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
  backdrop-filter: blur(12px);
  border: 1px solid
    ${(props) =>
      props.isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"};
  padding: 32px;
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
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <ModalContent isDarkMode={isDarkMode}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: isDarkMode ? "#fff" : "#213547",
            }}
          >
            <CloseOutlined />
          </IconButton>

          <Typography variant="h4" component="h2" gutterBottom>
            {post.title}
          </Typography>

          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              mb: 3,
            }}
          />

          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {post.content}
          </Typography>
        </ModalContent>
      </Fade>
    </StyledModal>
  );
};

BlogPostDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default BlogPostDialog;
