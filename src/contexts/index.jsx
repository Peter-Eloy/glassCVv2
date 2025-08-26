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
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    // Load menu state from localStorage
    const savedMenuState = localStorage.getItem('menu-open-state');
    return savedMenuState ? JSON.parse(savedMenuState) : false;
  });

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const userPrefersDark = mediaQuery.matches;
    
    console.log("🌙 Theme detection activated! System prefers", userPrefersDark ? "dark" : "light", "mode. Your eyes will thank you!");
    
    setIsDarkMode(userPrefersDark);

    // Apply the theme class to the body
    document.body.className = userPrefersDark ? "dark-mode" : "light-mode";

    // Listen for changes in the system theme
    const handleChange = (e) => {
      console.log("🔄 System theme changed to", e.matches ? "dark" : "light", "mode! Adapting like a chameleon...");
      setIsDarkMode(e.matches);
      document.body.className = e.matches ? "dark-mode" : "light-mode";
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Save menu state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menu-open-state', JSON.stringify(isMenuOpen));
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newMode = !isDarkMode ? "dark" : "light";
    console.log("💡 Manual theme switch activated! Switching to", newMode, "mode. Because you're the boss of your visual experience!");
    
    setIsDarkMode(!isDarkMode);
    document.body.className = !isDarkMode ? "dark-mode" : "light-mode";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const setMenuOpen = (open) => {
    setIsMenuOpen(open);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      isMenuOpen, 
      toggleMenu, 
      setMenuOpen 
    }}>
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
