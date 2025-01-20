import './App.css'
import AppMenu from './components/menu'
import Sidebar from './components/sidebar'
import FloatingButton from './components/floatingButton'
import Footer from './components/footer'
import { Box, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider } from './components/ThemeContext'

/**
 * Description placeholder
 *
 * @type {64}
 */
const APPBAR_HEIGHT = 64
/**
 * Description placeholder
 *
 * @type {64}
 */
const FOOTER_HEIGHT = 64

/**
 * Description placeholder
 *
 * @returns {*}
 */
function App() {
    return (
        <ThemeProvider>
            <MuiThemeProvider theme={createTheme()}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    <AppMenu />

                    <Box
                        sx={{
                            display: 'flex',
                            marginTop: `${APPBAR_HEIGHT}px`,
                            height: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
                            overflow: 'hidden',
                        }}
                    >
                        <Sidebar />

                        <Box
                            component='main'
                            sx={{
                                flexGrow: 1,
                                p: 3,
                                ml: '240px',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Your main content will go here */}
                        </Box>
                    </Box>

                    <Footer />
                    <FloatingButton />
                </Box>
            </MuiThemeProvider>
        </ThemeProvider>
    )
}

export default App
