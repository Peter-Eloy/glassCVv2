import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const slideText = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const ConstructionIcon = styled.div`
  width: 40px;
  height: 40px;
  animation: ${bounce} 2s infinite ease-in-out;
  margin-bottom: 8px;
`;

const SlidingTextContainer = styled(Box)`
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  margin-bottom: 8px;
`;

const SlidingText = styled(Typography)`
  white-space: nowrap;
  display: inline-block;
  animation: ${slideText} 15s linear infinite;
  padding-right: 50px;
`;

const UnderConstruction = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 128px)", // Accounting for header and footer
        background: isDarkMode
          ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
          : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        color: isDarkMode ? "#fff" : "#213547",
        padding: 2,
      }}
    >
      <ConstructionIcon>🚧</ConstructionIcon>

      <SlidingTextContainer>
        <SlidingText variant="h6">
          UNDER CONSTRUCTION • UNDER CONSTRUCTION •&nbsp; UNDER CONSTRUCTION •
          UNDER CONSTRUCTION
        </SlidingText>
      </SlidingTextContainer>

      <Typography
        variant="body2"
        align="center"
        sx={{
          mb: 1,
          opacity: 0.8,
          maxWidth: "250px",
        }}
      >
        Coming soon...
      </Typography>

      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/")}
        sx={{
          mt: 1,
          backgroundColor: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
          color: isDarkMode ? "#fff" : "#213547",
          "&:hover": {
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default UnderConstruction;
