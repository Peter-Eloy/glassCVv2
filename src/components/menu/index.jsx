import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../../contexts/index";
import MenuButton from "../menuButton";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

/**
 * Description placeholder
 *
 * @returns {*}
 */
const AppMenu = ({ forceMenuOpen = false }) => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <MenuButton forceOpen={forceMenuOpen} />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          background: "transparent",
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
          }`,
        }}
      >
        <Toolbar>
          {location.pathname !== "/" && (
            <IconButton
              edge="start"
              onClick={() => navigate("/")}
              sx={{
                color: isDarkMode ? "#fff" : "#213547",
                mr: 2,
                "&:hover": {
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <HomeOutlined />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: isDarkMode ? "#fff" : "#213547",
            }}
          ></Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

AppMenu.propTypes = {
  forceMenuOpen: PropTypes.bool,
};

export default AppMenu;
