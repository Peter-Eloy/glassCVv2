import React from 'react'
import { Box, Container, Typography, Link, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useTheme } from '../ThemeContext'

const Footer = () => {
    const { isDarkMode } = useTheme()

    return (
        <Box
            component='footer'
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                py: 2,
                px: 2,
                backgroundColor: 'transparent',
                borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
                zIndex: 1000,
                color: isDarkMode ? '#fff' : '#213547',
            }}
        >
            <Container maxWidth='lg'>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant='body2' sx={{ color: 'inherit' }}>
                            © {new Date().getFullYear()} glassCV. All rights reserved.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Link href='#' sx={{ color: 'inherit' }} underline='none'>
                            Privacy Policy
                        </Link>
                        <Link href='#' sx={{ color: 'inherit' }} underline='none'>
                            Terms of Service
                        </Link>
                        <Link href='#' sx={{ color: 'inherit' }} underline='none'>
                            Contact
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton sx={{ color: 'inherit' }} size='small'>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'inherit' }} size='small'>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'inherit' }} size='small'>
                            <TwitterIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
