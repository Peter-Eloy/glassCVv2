import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "../../contexts/index";
import MenuButton from "../menuButton";
import PropTypes from "prop-types";

/**
 * Description placeholder
 *
 * @returns {*}
 */
const AppMenu = ({ isMenuOpen }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
      <MenuButton />
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
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: isDarkMode ? "#fff" : "#213547",
            }}
          ></Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
};

AppMenu.defaultProps = {
  isMenuOpen: false,
};

export default AppMenu;
