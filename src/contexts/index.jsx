import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Description placeholder
 *
 * @type {*}
 */
const ThemeContext = createContext()

/**
 * Description placeholder
 *
 * @param {{ children: any; }} param0
 * @param {*} param0.children
 * @returns {*}
 */
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        // Apply the theme class to the body
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

/**
 * Description placeholder
 *
 * @returns {*}
 */
export const useTheme = () => useContext(ThemeContext)
