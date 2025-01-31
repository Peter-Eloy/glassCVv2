import React from "react";
import {
  isMobile,
  isAndroid,
  isIOS,
  deviceType,
  browserName,
  browserVersion,
} from "react-device-detect";
import { css, keyframes } from "@emotion/react";
import { Typography, Box } from "@mui/material";
import { WhatsAppOutlined } from "@ant-design/icons";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MobileLandingPage = () => {
  const deviceInfo = {
    isAndroid,
    isIOS,
    deviceType,
    browserName,
    browserVersion,
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "20px",
        marginTop: "60px",
        animation: `${fadeIn} 1s ease-in`,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Hi there! 👋
      </Typography>
      <Typography variant="h5" gutterBottom>
        Looks like you're on a {deviceType} device.
      </Typography>
      <Typography variant="body1" gutterBottom>
        {deviceInfo.isAndroid && "Android user here! "}
        {deviceInfo.isIOS && "iOS user spotted! "}
        Using {deviceInfo.browserName} version {deviceInfo.browserVersion}.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Better on PC for the full experience!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here's my{" "}
        <a
          href={`https://wa.me/34678381811?text=Hi%20Peter,%20I%20am%20_____ from%20_____%20saw%20your%20GlassCV%20and%20would%20like%20to%20have%20an%20appointment.`}
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppOutlined /> <span>WhatsApp</span>
        </a>
        ; text me for the real deal! 😉
      </Typography>
      {/* Add more content here */}
    </Box>
  );
};

export default MobileLandingPage;
