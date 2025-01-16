import './App.css'
import AppMenu from './components/menu'
import Sidebar from './components/sidebar'
import FloatingButton from './components/floatingButton'
import { Box, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()
const APPBAR_HEIGHT = 64

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* AppBar */}
                <AppMenu />

                {/* Content container */}
                <Box
                    sx={{
                        display: 'flex',
                        marginTop: `${APPBAR_HEIGHT}px`,
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
                        }}
                    >
                        {/* Your main content will go here */}
                    </Box>
                </Box>

                {/* Floating Button */}
                <FloatingButton />
            </Box>
        </ThemeProvider>
    )
}

export default App
