import React from 'react'
import { Box } from '@mui/material'

const GlassContainer = ({ children }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                margin: '20px 20px',
                padding: '15px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease-in-out',
                },
                '.dark &': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            {children}
        </Box>
    )
}

export default GlassContainer
