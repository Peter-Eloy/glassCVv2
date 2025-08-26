// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { isMobile } from "react-device-detect";
import MobileLayout from "./components/layout/MobileLayout";
import { WelcomeProvider } from "./contexts/welcomeContext";

const App = () => {
  if (isMobile) {
    console.info("📱 Mobile device detected! Switching to mobile-optimized layout - because size matters!");
    return <MobileLayout />;
  }

  console.info("🖥️ Desktop experience activated! Get ready for the full glassmorphic glory!");
  
  return (
    <WelcomeProvider>
      <RouterProvider router={router} />
    </WelcomeProvider>
  );
};

export default App;
