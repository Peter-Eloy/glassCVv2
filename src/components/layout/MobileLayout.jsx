// src/components/layout/MobileLayout.jsx
import { Box } from "@mui/material";
import MobileLandingPage from "../mobileLandingPage";
import Footer from "../footer";
import AppMenu from "../menu";

const MobileLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppMenu />
      <Box sx={{ flex: 1 }}>
        <MobileLandingPage />
      </Box>
      <Footer />
    </Box>
  );
};

export default MobileLayout;
