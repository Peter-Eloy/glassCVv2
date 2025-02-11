// src/components/layout/RootLayout.jsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppMenu from "../menu";
import Footer from "../footer";
import FloatingButton from "../floatingButton";

const RootLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "64px", // Height of the AppBar
          marginBottom: "64px", // Height of the Footer
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
      <FloatingButton />
      <Footer />
    </Box>
  );
};

export default RootLayout;
