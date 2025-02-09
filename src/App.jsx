import { isMobile } from "react-device-detect";
import DesktopApp from "./DesktopApp";
import MobileLandingPage from "./components/MobileLandingPage";
import ConsoleMessage from "./components/consoleMessage";
import FaviconChanger from "./utils/faviconChanger";
import { ThemeProvider } from "./contexts/index";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={createTheme()}>
        <FaviconChanger />
        <ConsoleMessage />
        {isMobile ? <MobileLandingPage /> : <DesktopApp />}
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
