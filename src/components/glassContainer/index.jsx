import React from 'react'
import { Box } from '@mui/material'

const GlassContainer = ({ children, className = '' }) => {
    return (
        <Box
            className={`w-full h-full rounded-xl ${className}`}
            sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'auto',
                '&.dark': {
                    background: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            {children}
        </Box>
    )
}

export default GlassContainer
