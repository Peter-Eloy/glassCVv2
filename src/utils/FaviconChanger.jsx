import { useEffect } from "react";

const FaviconChanger = () => {
  useEffect(() => {
    // Function to update the favicon
    const updateFavicon = (emoji) => {
      const link = document.querySelector("link[rel~='icon']");
      if (!link) {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(newLink);
      }
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${encodeURIComponent(
        emoji
      )}</text></svg>`;
    };

    // Function to update the document title
    const updateTitle = (title) => {
      document.title = title;
    };
    // Set the initial favicon
    updateFavicon("👨‍💻");
    updateTitle("Hey there!");

    // Event listener for when the tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Change favicon when the tab is hidden
        updateFavicon("😢");
        updateTitle("Miss you already");
      } else {
        // Change favicon back when the tab is visible
        updateFavicon("😊");
        updateTitle("Welcome back!");
      }
    };

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default FaviconChanger;
