import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";

const ConsoleMessage = () => {
  useEffect(() => {
    if (isMobile) return;

    const originalMethods = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      debug: console.debug,
    };

    let messageShown = false;

    const showMessage = () => {
      if (!messageShown) {
        setTimeout(() => {
          originalMethods.log(
            "%cAll systems go, no errors or warnings to see here. But for the curious minds, I've left some special console.logs at the fetching points. Happy exploring, my new colleague! 🎉",
            "color: #2ecc71; font-size: 24px; font-weight: bold; background: #f8f8f8; padding: 8px; border-radius: 4px;"
          );
        }, 100);
        messageShown = true;
      }
    };

    // Override console methods
    Object.keys(originalMethods).forEach((method) => {
      console[method] = (...args) => {
        showMessage();
        return originalMethods[method].apply(console, args);
      };
    });

    // Show initial message
    showMessage();

    return () => {
      // Restore original console methods
      Object.keys(originalMethods).forEach((method) => {
        console[method] = originalMethods[method];
      });
    };
  }, []);

  return null;
};

export default ConsoleMessage;
