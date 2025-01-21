import './App.css'
import AppMenu from './components/menu'
import Sidebar from './components/sidebar'
import FloatingButton from './components/floatingButton'
import Footer from './components/footer'
import { Box, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider } from './contexts/index'
import GlassContainer from './components/GlassContainer'
import StackedGlassContainers from './components/stackedGlassContainers'
import careerData from './data/carrerData/carrerData'
import proSnapshot from './data/proSnapshot/proSnapshot'

/**
 * Description placeholder
 *
 * @type {64}
 */
const APPBAR_HEIGHT = 40
/**
 * Description placeholder
 *
 * @type {64}
 */
const FOOTER_HEIGHT = 64
const SIDEBAR_WIDTH = 240

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
                        overflow: 'hidden', // Ensure no scrolling at root
                        position: 'fixed', // Add fixed position
                        width: '100%', // Ensure full width
                        top: 8,
                        left: 0,
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
                                flexGrow: 3,
                                overflow: 'hidden', // Ensure no scrolling in main content
                                position: 'relative', // Add relative positioning
                                p: 3, // Add padding back
                                ml: `${SIDEBAR_WIDTH}px`, // Add margin to account for sidebar
                                width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                            }}
                        >
                            {/* Your main content will go here */}
                            <GlassContainer>
                                <p>
                                    <strong>Dev |</strong> HTML, CSS, JS (JavaScript, ReactJS) & Go
                                </p>
                            </GlassContainer>

                            {/* Wrapper for StackedGlassContainers */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    // Change this to 1 for vertical stack, 2 for side by side
                                    gridTemplateColumns: {
                                        xs: '1fr', // Stack on mobile
                                        md: '1fr 1fr', // Side by side on medium screens and up
                                    },
                                    gap: 3,
                                    mt: 3,
                                    overflow: 'hidden', // Ensure no scrolling in grid
                                    maxHeight: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px - 120px)`, // Adjust for padding and margins
                                }}
                            >
                                <Box sx={{ overflow: 'hidden' }}>
                                    <GlassContainer>
                                        <div
                                            style={
                                                {
                                                    // padding: '1rem',
                                                    // borderRadius: '8px',
                                                    // // background: 'rgba(0, 0, 0, 0.05)',
                                                    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                }
                                            }
                                        >
                                            <h2 style={{ marginBottom: '8px' }}>Dev @ NARTEX SOFTWARE, S.L.</h2>
                                            <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>
                                                <strong>Duration:</strong> Feb 2024 - Present
                                            </p>
                                            <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>
                                                <strong>Technologies:</strong> React.js, Vite.js, Node.js, Go
                                            </p>
                                        </div>
                                    </GlassContainer>
                                    <StackedGlassContainers containers={careerData} />
                                </Box>
                                <Box sx={{ overflow: 'hidden' }}>
                                    <StackedGlassContainers containers={proSnapshot} />
                                </Box>
                            </Box>
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
