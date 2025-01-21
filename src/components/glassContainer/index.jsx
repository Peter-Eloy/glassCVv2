import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '../ThemeContext/index'
import { glassStyles } from '../../styles/glassEffects'

const GlassContainer = ({ children }) => {
    const { isDarkMode } = useTheme()
    const themeStyles = isDarkMode ? glassStyles.dark : glassStyles.light

    return (
        <Box
            sx={{
                position: 'relative',
                margin: '20px 20px',
                padding: '15px',
                ...glassStyles.shared,
                ...themeStyles,
                '&:hover': glassStyles.hover,
            }}
        >
            {children}
        </Box>
    )
}

export default GlassContainer
