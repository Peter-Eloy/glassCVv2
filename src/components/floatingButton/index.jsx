import { useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../../contexts/index";

/**
 * Description placeholder
 *
 * @returns {*}
 */
const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
        console.log("Content copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const actions = [
    {
      icon: isDarkMode ? <LightModeIcon /> : <DarkModeIcon />,
      name: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      action: toggleTheme,
    },
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
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
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
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
              } else {
                console.log(`Clicked ${action.name}`);
              }
              setOpen(false);
            }}
          />
        ))}
      </SpeedDial>
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
