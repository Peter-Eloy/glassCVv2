import './App.css'
import AppMenu from './components/menu'
import Sidebar from './components/sidebar'
import FloatingButton from './components/floatingButton'
import Footer from './components/footer'
import { Box, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider } from './components/ThemeContext'
import GlassContainer from './components/GlassContainer'
import StackedGlassContainers from './components/StackedGlassContainers'

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

const containers = [
    <div>
        <h2>First Container</h2>
        <p>Click the container below to navigate</p>
    </div>,
    <div>
        <h2>Second Container</h2>
        <p>Keep going down...</p>
    </div>,
    <div>
        <h2>Third Container</h2>
        <p>You've reached the bottom!</p>
    </div>,
]

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
                            <GlassContainer>
                                <h2>Hello Glass Container!</h2>
                                <p>This is some test content to see how the glass effect looks.</p>
                            </GlassContainer>

                            <StackedGlassContainers containers={containers} />
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
