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
const AppMenu = ({ forceMenuOpen }) => {
  const { isDarkMode } = useTheme();

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

AppMenu.defaultProps = {
  forceMenuOpen: false,
};

export default AppMenu;
