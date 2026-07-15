// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { router, mobileRouter } from "./routes";
import { isMobile } from "react-device-detect";
import { WelcomeProvider } from "./contexts/welcomeContext";

const App = () => {
  if (isMobile) {
    console.info("📱 Mobile device detected! Switching to mobile-optimized layout");
    return (
      <WelcomeProvider>
        <RouterProvider router={mobileRouter} />
      </WelcomeProvider>
    );
  }

  console.info("🖥️ Desktop experience activated! Get ready for the full glassmorphic glory!");
  
  return (
    <WelcomeProvider>
      <RouterProvider router={router} />
    </WelcomeProvider>
  );
};

export default App;
