import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const APPBAR_HEIGHT = 64
const FOOTER_HEIGHT = 64

const Sidebar = () => {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

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
                },
            }}
        >
            <List>
                <ListItem>
                    <ListItemText primary='Home' />
                </ListItem>
                <ListItem>
                    <ListItemText primary='About' />
                </ListItem>
                <ListItem>
                    <ListItemText primary='Services' />
                </ListItem>
                <ListItem>
                    <ListItemText primary='Contact' />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar
