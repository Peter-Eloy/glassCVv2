import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const AppMenu = () => {
    return (
        <AppBar
            position='fixed'
            sx={{
                width: '100%', // Take full width
                background: 'transparent',
            }}
        >
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ color: '#213547' }}>
                    glassCV
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppMenu
