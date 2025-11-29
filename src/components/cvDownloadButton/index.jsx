import { useState, useEffect } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { DownloadOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts";
import { getLatestCVDownloadUrls } from "../../services/github/cv";

const CVDownloadButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadUrls, setDownloadUrls] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchDownloadUrls();
  }, []);

  const fetchDownloadUrls = async () => {
    try {
      const urls = await getLatestCVDownloadUrls();
      setDownloadUrls(urls);
    } catch (error) {
      console.error("Error fetching download URLs:", error);
      setSnackbarMessage(
        "Error loading CV download links. Please try again later."
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (language) => {
    const url = downloadUrls[language];
    if (!url) {
      setSnackbarMessage(`CV in ${language} is not available at the moment.`);
      setSnackbarOpen(true);
      return;
    }

    try {
      // Direct download without fetch (to avoid CORS issues)
      const a = document.createElement("a");
      a.href = url;
      a.download = `Peter_Eloy_CV_${language}.pdf`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setSnackbarMessage(`CV download started in ${language}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error downloading CV:", error);
      setSnackbarMessage("Error downloading the CV. Please try again.");
      setSnackbarOpen(true);
    }

    setOpen(false);
  };

  const actions = [
    { icon: "🇬🇧", name: "English", action: () => handleDownload("EN") },
    { icon: "🇪🇸", name: "Spanish", action: () => handleDownload("ES") },
    { icon: "🇩🇪", name: "German", action: () => handleDownload("DE") },
  ];

  if (loading) {
    return (
      <SpeedDial
        ariaLabel="CV Download SpeedDial"
        sx={{
          position: "fixed",
          bottom: 160,
          right: 16,
        }}
        icon={<CircularProgress size={24} />}
        onClick={() => null}
      />
    );
  }

  return (
    <>
      <SpeedDial
        ariaLabel="CV Download SpeedDial"
        sx={{
          position: "fixed",
          bottom: 160,
          right: 16,
          "& .MuiFab-primary": {
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
            color: isDarkMode ? "#fff" : "#213547",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.12)"
                : "rgba(0, 0, 0, 0.08)",
            },
          },
          "& .MuiSpeedDialAction-fab": {
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
            color: isDarkMode ? "#fff" : "#213547",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.12)"
                : "rgba(0, 0, 0, 0.08)",
            },
          },
        }}
        icon={<SpeedDialIcon icon={<DownloadOutlined />} />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
            FabProps={{
              sx: {
                fontSize: "1.2rem",
              },
            }}
          />
        ))}
      </SpeedDial>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default CVDownloadButton;
