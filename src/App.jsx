// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { isMobile } from "react-device-detect";
import MobileLayout from "./components/layout/MobileLayout";
import { WelcomeProvider } from "./contexts/welcomeContext";

const App = () => {
  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <WelcomeProvider>
      <RouterProvider router={router} />
    </WelcomeProvider>
  );
};

export default App;
