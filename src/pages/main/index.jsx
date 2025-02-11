// src/pages/main/MainContent.jsx
import { Box } from "@mui/material";
import Sidebar from "../../components/sidebar";

const MainContent = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: "240px", // Width of the sidebar
        }}
      >
        {/* Your main page content */}
      </Box>
    </Box>
  );
};

export default MainContent;
