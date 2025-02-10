import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "../../contexts/index";
import GlassContainer from "../GlassContainer";
import {
  XOutlined,
  LinkedinOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  MailOutlined,
} from "@ant-design/icons";
import StackedGlassContainers from "../stackedGlassContainers";
import aptitudes from "../../data/aptitudes/aptitudes";
import education2 from "../../data/education2/education2";
import PropTypes from "prop-types";

/**
 * Constants for styling
 */
const APPBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 64;

/**
 * Sidebar Component
 */
const Sidebar = ({ showContactShine, showStackedShine }) => {
  const muiTheme = useMuiTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up("sm"));
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "#fff" : "#213547";
  // const hoverBackgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
  const borderColor = isDarkMode
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(0, 0, 0, 0.12)";

  console.log("Sidebar shine props:", { showContactShine, showStackedShine }); // Debug log

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      anchor="left"
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "transparent",
          top: APPBAR_HEIGHT,
          height: `calc(100% - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
          overflow: "hidden",
          borderRight: `0px solid ${borderColor}`,
        },
      }}
    >
      <List>
        <GlassContainer showShine={showContactShine}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/34678381811?text=Hi%20Peter,%20I%20am%20_____ from%20_____%20saw%20your%20GlassCV%20and%20would%20like%20to%20have%20an%20appointment.`}
              style={{
                textDecoration: "none",
                color: textColor,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppOutlined />
              <span>WhatsApp</span>
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            {/* Email Link */}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Social Media Links */}
            <a
              href="mailto:petereloy@gmail.com"
              style={{
                textDecoration: "none",
                color: textColor,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <MailOutlined />
            </a>
            <a
              href="https://github.com/Peter-Eloy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: textColor }}
            >
              <GithubOutlined />
            </a>
            <a
              href="https://www.linkedin.com/in/petereloy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: textColor }}
            >
              <LinkedinOutlined />
            </a>

            <a
              href="https://x.com/petereloy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              style={{ color: textColor }}
            >
              <XOutlined />
            </a>
          </div>
        </GlassContainer>
        <StackedGlassContainers
          containers={aptitudes}
          showShine={showStackedShine}
        />
        {/* <StackedGlassContainers containers={languages} />
                <StackedGlassContainers containers={education} /> */}
        <StackedGlassContainers containers={education2} />
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  showContactShine: PropTypes.bool,
  showStackedShine: PropTypes.bool,
};

Sidebar.defaultProps = {
  showContactShine: false,
  showStackedShine: false,
};

export default Sidebar;
