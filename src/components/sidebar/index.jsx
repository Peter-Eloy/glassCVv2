import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '../ThemeContext'
import GlassContainer from '../GlassContainer'
import { XOutlined, LinkedinOutlined, GithubOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons'
import StackedGlassContainers from '../StackedGlassContainers'
import { Box, ListItem } from '@mui/material'

/**
 * Constants for styling
 */
const APPBAR_HEIGHT = 64
const FOOTER_HEIGHT = 64

const aptitudes = [
    <div>
        <h2>Skill</h2>
    </div>,
    <div>
        <p>ReactJS</p>
    </div>,
    <div>
        <p>ViteJS</p>
    </div>,
    <div>
        <p>Golang</p>
    </div>,
]

const languages = [
    <div>
        <h2>Languages</h2>
    </div>,
    <div>
        <p>
            <strong>English</strong>
        </p>
        <p>Professional Working</p>
    </div>,
    <div>
        <p>
            <strong>German</strong>
        </p>
        <p>Native or Bilingual</p>
    </div>,
    <div>
        <p>
            <strong>Spanish</strong>
        </p>
        <p>Native or Bilingual</p>
    </div>,
]

/**
 * Sidebar Component
 */
const Sidebar = () => {
    const muiTheme = useMuiTheme()
    const isDesktop = useMediaQuery(muiTheme.breakpoints.up('sm'))
    const { isDarkMode } = useTheme()

    const textColor = isDarkMode ? '#fff' : '#213547'
    const hoverBackgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
    const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'

    return (
        <Drawer
            variant={isDesktop ? 'permanent' : 'temporary'}
            anchor='left'
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    background: 'transparent',
                    top: APPBAR_HEIGHT,
                    height: `calc(100% - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
                    overflow: 'hidden',
                    borderRight: `1px solid ${borderColor}`,
                },
            }}
        >
            <List>
                <GlassContainer>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        {/* WhatsApp Link */}
                        <a
                            href={`https://wa.me/34number?text=Hi%20Peter,%20I%20am%20_____ from%20_____%20saw%20your%20GlassCV%20and%20would%20like%20to%20have%20an%20appointment.`}
                            style={{
                                textDecoration: 'none',
                                color: textColor,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <WhatsAppOutlined />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>{/* Email Link */}</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {/* Social Media Links */}
                        <a
                            href='mailto:petereloy@gmail.com'
                            style={{
                                textDecoration: 'none',
                                color: textColor,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <MailOutlined />
                        </a>
                        <a href='https://github.com/Peter-Eloy' target='_blank' rel='noopener noreferrer' aria-label='GitHub' style={{ color: textColor }}>
                            <GithubOutlined />
                        </a>
                        <a
                            href='https://www.linkedin.com/in/petereloy/'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='LinkedIn'
                            style={{ color: textColor }}
                        >
                            <LinkedinOutlined />
                        </a>

                        <a href='https://x.com/petereloy' target='_blank' rel='noopener noreferrer' aria-label='X' style={{ color: textColor }}>
                            <XOutlined />
                        </a>
                    </div>
                </GlassContainer>
                <StackedGlassContainers containers={aptitudes} />
                <StackedGlassContainers containers={languages} />
                <StackedGlassContainers containers={languages} />
                <StackedGlassContainers containers={languages} />
            </List>
        </Drawer>
    )
}

export default Sidebar
