import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Description placeholder
 *
 * @type {*}
 */
const ThemeContext = createContext();

/**
 * Description placeholder
 *
 * @param {{ children: any; }} param0
 * @param {*} param0.children
 * @returns {*}
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const userPrefersDark = mediaQuery.matches;
    setIsDarkMode(userPrefersDark);

    // Apply the theme class to the body
    document.body.className = userPrefersDark ? "dark-mode" : "light-mode";

    // Listen for changes in the system theme
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      document.body.className = e.matches ? "dark-mode" : "light-mode";
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = !isDarkMode ? "dark-mode" : "light-mode";
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to use theme context
 *
 * @returns {Object}
 */
export const useTheme = () => useContext(ThemeContext);
