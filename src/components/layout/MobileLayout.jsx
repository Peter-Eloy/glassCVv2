// src/components/layout/MobileLayout.jsx
import { Box } from "@mui/material";
import MobileLandingPage from "../mobileLandingPage";

const MobileLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileLandingPage />
    </Box>
  );
};

export default MobileLayout;
