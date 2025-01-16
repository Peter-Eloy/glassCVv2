import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '../ThemeContext'

const APPBAR_HEIGHT = 64
const FOOTER_HEIGHT = 64

const Sidebar = () => {
    const muiTheme = useMuiTheme()
    const isDesktop = useMediaQuery(muiTheme.breakpoints.up('sm'))
    const { isDarkMode } = useTheme()

    return (
        <Drawer
            variant={isDesktop ? 'permanent' : 'temporary'}
            anchor='left'
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    background: 'transparent',
                    top: APPBAR_HEIGHT,
                    height: `calc(100% - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
                    overflow: 'hidden',
                    borderRight: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
                    '& .MuiListItemText-primary': {
                        color: isDarkMode ? '#fff' : '#213547',
                    },
                },
            }}
        >
            <List>
                {['Home', 'About', 'Services', 'Contact'].map((text) => (
                    <ListItem
                        key={text}
                        sx={{
                            '&:hover': {
                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar
