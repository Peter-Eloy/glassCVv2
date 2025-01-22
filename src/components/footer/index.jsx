import { Box, Container, Typography, Link, IconButton } from '@mui/material'
import { XOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons'
import { useTheme } from '../../contexts/index'
import { useState } from 'react'

/**
 * Description placeholder
 *
 * @returns {*}
 */
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
                        <Link
                            component='button'
                            variant='body2'
                            onClick={() => setIsPrivacyOpen(true)}
                            sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            Privacy Policy
                        </Link>
                        <Link href='https://github.com/Peter-Eloy/glassCVv2/blob/main/README.md' sx={{ color: 'inherit' }} underline='none'>
                            Terms of Service
                        </Link>
                        <Link
                            component='button'
                            variant='body2'
                            onClick={() => setIsContactOpen(true)}
                            sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            Contact
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton sx={{ color: 'inherit' }} size='small' href='https://github.com/Peter-Eloy' target='_blank' rel='noopener noreferrer'>
                            <GithubOutlined />
                        </IconButton>
                        <IconButton
                            sx={{ color: 'inherit' }}
                            size='small'
                            href='https://www.linkedin.com/in/petereloy/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <LinkedinOutlined />
                        </IconButton>
                        <IconButton sx={{ color: 'inherit' }} size='small' href='https://x.com/petereloy' target='_blank' rel='noopener noreferrer'>
                            <XOutlined />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
