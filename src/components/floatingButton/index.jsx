import { useState, useEffect } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useTheme } from "../../contexts/index";
import {
  isMobile,
  isMacOs,
  isWindows,
  isLinux,
  isIOS,
  isAndroid,
} from "react-device-detect";
import ChatComponent from "../chatComponent";

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState({});
  const [loadingCV, setLoadingCV] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Initialize download URLs
    const baseURL =
      "https://github.com/Peter-Eloy/glassCVv2/releases/download/cv-2025-02-15";
    setDownloadUrls({
      EN: `${baseURL}/Peter_Eloy_CV_EN.pdf`,
      ES: `${baseURL}/Peter_Eloy_CV_ES.pdf`,
      DE: `${baseURL}/Peter_Eloy_CV_DE.pdf`,
    });
    setLoadingCV(false);
  }, []);

  const emailParts = ["p", "eter", "elo", "y", "@", "gmail", ".com"];
  const phoneParts = ["+34", "678", "38", "1", "811"];

  const contentToCopy = `Hey there,
check out the CV of Peter - Eloy H., a full-stack dev:
  CV: https://peter-eloy.dev 
  Phone: ${phoneParts.join("")}
  Email: ${emailParts.join("")}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        setSnackbarMessage("Content copied! Now you can share it easily!");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCVDownload = async (language) => {
    const url = downloadUrls[language];
    if (!url) {
      setSnackbarMessage(`CV in ${language} is not available at the moment.`);
      setSnackbarOpen(true);
      return;
    }

    try {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `Peter_Eloy_CV_${language}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setSnackbarMessage(`CV downloaded successfully in ${language}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error downloading CV:", error);
      setSnackbarMessage("Error downloading the CV. Please try again.");
      setSnackbarOpen(true);
    }

    setDownloadMenuOpen(false);
  };

  const bookmarkPage = () => {
    if (window.sidebar && window.sidebar.addPanel) {
      window.sidebar.addPanel(document.title, window.location.href, "");
    } else if (window.external && "AddFavorite" in window.external) {
      window.external.AddFavorite(window.location.href, document.title);
    } else {
      let bookmarkInstructions =
        "Use your browser's bookmark feature to save this page.";

      if (isIOS) {
        bookmarkInstructions =
          "Tap your browser's Share button, then 'Add to Home Screen' to bookmark this page.";
      } else if (isAndroid) {
        bookmarkInstructions =
          "Tap the menu button (three dots) and select 'Add to Home Screen'.";
      } else if (isMacOs) {
        bookmarkInstructions = "Press Cmd + D to bookmark this page.";
      } else if (isWindows || isLinux) {
        bookmarkInstructions = "Press Ctrl + D to bookmark this page.";
      }

      alert(bookmarkInstructions);
    }
  };

  // Main menu actions
  const actions = [
    {
      icon: isDarkMode ? <LightModeIcon /> : <DarkModeIcon />,
      name: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      action: toggleTheme,
    },
    ...(isMobile
      ? []
      : [
          {
            icon: <ChatIcon />,
            name: "Chat",
            action: () => setChatOpen(!chatOpen),
          },
        ]),
    { icon: <SaveIcon />, name: "Save", action: bookmarkPage },
    {
      icon: loadingCV ? <CircularProgress size={20} /> : <FileDownloadIcon />,
      name: "Download CV",
      action: () => setDownloadMenuOpen(true),
    },
    { icon: <ShareIcon />, name: "Share", action: copyToClipboard },
  ];

  // Download menu actions
  const downloadActions = [
    { icon: "🇬🇧", name: "English CV", action: () => handleCVDownload("EN") },
    { icon: "🇪🇸", name: "Spanish CV", action: () => handleCVDownload("ES") },
    { icon: "🇩🇪", name: "German CV", action: () => handleCVDownload("DE") },
  ];

  return (
    <>
      {/* Main SpeedDial */}
      <SpeedDial
        ariaLabel="SpeedDial menu"
        sx={{
          position: "fixed",
          bottom: 80,
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
        icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
        onClose={() => {
          setOpen(false);
          setDownloadMenuOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {downloadMenuOpen
          ? downloadActions.map((action) => (
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
            ))
          : actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  if (action.action) {
                    action.action();
                  }
                  if (action.name !== "Download CV") {
                    setOpen(false);
                  }
                }}
              />
            ))}
      </SpeedDial>

      <ChatComponent open={chatOpen} onClose={() => setChatOpen(false)} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default FloatingButton;
