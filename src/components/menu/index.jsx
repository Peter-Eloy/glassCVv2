import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "../../contexts/index";
import MenuButton from "../menuButton";

/**
 * Description placeholder
 *
 * @returns {*}
 */
const AppMenu = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
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
    </>
  );
};

export default AppMenu;
