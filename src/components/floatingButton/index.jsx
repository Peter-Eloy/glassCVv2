import { useState, useEffect } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ChatIcon from "@mui/icons-material/Chat";
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
import { getLatestCVDownloadUrls } from "../../services/github/cv";

/**
 * Description placeholder
 *
 * @returns {*}
 */
const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState({});
  const [loadingCV, setLoadingCV] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    fetchDownloadUrls();
  }, []);

  const fetchDownloadUrls = async () => {
    try {
      const urls = await getLatestCVDownloadUrls();
      setDownloadUrls(urls);
    } catch (error) {
      console.error("Error fetching download URLs:", error);
    }
  };

  const emailParts = ["p", "eter", "elo", "y", "@", "gmail", ".com"];
  const phoneParts = ["+34", "678", "38", "1", "811"];

  const contentToCopy = `Hey there,
check out the CV of Peter - Eloy H., a full-stack dev:
  CV: https://peter-eloy.github.io/glassCVv2 
  Phone: ${phoneParts.join("")}
  Email: ${emailParts.join("")}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCVDownload = async (language) => {
    setLoadingCV(true);
    const url = downloadUrls[language];

    if (!url) {
      setSnackbarMessage(`CV in ${language} is not available at the moment.`);
      setSnackbarOpen(true);
      setLoadingCV(false);
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `Peter_Eloy_CV_${language}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      setSnackbarMessage(`CV downloaded successfully in ${language}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error downloading CV:", error);
      setSnackbarMessage("Error downloading the CV. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoadingCV(false);
      setOpen(false);
    }
  };

  const bookmarkPage = () => {
    if (window.sidebar && window.sidebar.addPanel) {
      // Firefox <= 22
      window.sidebar.addPanel(document.title, window.location.href, "");
    } else if (window.external && "AddFavorite" in window.external) {
      // IE
      window.external.AddFavorite(window.location.href, document.title);
    } else {
      // Personalized alerts based on device
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

  const cvDownloadActions = [
    {
      icon: "🇬🇧",
      name: "Download CV (English)",
      action: () => handleCVDownload("EN"),
    },
    {
      icon: "🇪🇸",
      name: "Download CV (Spanish)",
      action: () => handleCVDownload("ES"),
    },
    {
      icon: "🇩🇪",
      name: "Download CV (German)",
      action: () => handleCVDownload("DE"),
    },
  ];

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
    ...cvDownloadActions,
    { icon: <PictureAsPdfIcon />, name: "Export as PDF" },
    { icon: <ShareIcon />, name: "Share", action: copyToClipboard },
  ];

  return (
    <>
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
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              if (action.action) {
                action.action();
              }
              setOpen(false);
            }}
          />
        ))}
      </SpeedDial>

      <ChatComponent open={chatOpen} onClose={() => setChatOpen(false)} />
      {/* Snackbar to show feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Content copied! Now you can share it easily!"
      />
    </>
  );
};

export default FloatingButton;
