import './App.css'
import AppMenu from './components/menu'
import Sidebar from './components/sidebar'
import FloatingButton from './components/floatingButton'
import Footer from './components/footer'
import { Box, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()
const APPBAR_HEIGHT = 64
const FOOTER_HEIGHT = 64

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                {/* AppBar */}
                <AppMenu />

                {/* Content container */}
                <Box
                    sx={{
                        display: 'flex',
                        marginTop: `${APPBAR_HEIGHT}px`,
                        height: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
                        overflow: 'hidden',
                    }}
                >
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main content */}
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

                {/* Footer */}
                <Footer />

                {/* Floating Button */}
                <FloatingButton />
            </Box>
        </ThemeProvider>
    )
}

export default App
