// src/utils/FaviconChanger.jsx
import { useEffect } from "react";

const FaviconChanger = () => {
  useEffect(() => {
    const updateFavicon = (emoji) => {
      // Remove existing favicon
      const existingFavicon = document.querySelector("link[rel='icon']");
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Create new favicon
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">${emoji}</text></svg>`;
      document.head.appendChild(favicon);
    };

    const updateTitle = (title) => {
      document.title = title;
    };

    // Set initial state
    updateFavicon("👨‍💻");
    updateTitle("Hey there!");

    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateFavicon("😢");
        updateTitle("Miss you already!");
      } else {
        updateFavicon("😊");
        updateTitle("Welcome back!");
      }
    };

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
};

export default FaviconChanger;
