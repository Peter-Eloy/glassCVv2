import { Box } from '@mui/material'
import { useTheme } from '../../contexts/index'
import { glassStyles } from '../../styles/glassEffects'
import PropTypes from 'prop-types'

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

GlassContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GlassContainer
