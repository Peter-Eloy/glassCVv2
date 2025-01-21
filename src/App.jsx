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

const stackedData = [
    <div key='1'>
        <h1>Professional Snapshot</h1>
    </div>,
    <div key='2'>
        <h2>Technologies & Skills</h2>
        <p>
            <strong>Technologies:</strong> JS, CSS, HTML & Go
        </p>
        <p>
            <strong>Frameworks:</strong> React.js, Next.js
        </p>
        <p>
            <strong>CMS:</strong> WordPress, GoogleSite
        </p>
        <p>
            <strong>IDE:</strong> VS Code
        </p>
        <p>
            <strong>Server:</strong> Linux (CentOS) - WHC cPanel, Windows 2016 - Plesk
        </p>
        <p>
            <strong>CRM:</strong> SalesForce, Zoho, HubSpot
        </p>
        <p>
            <strong>Programs:</strong> MS Visio, MS Project, MS Excel, MS Outlook, MS Word, MS PowerPoint, PSCS6
        </p>
    </div>,
    <div key='3'>
        <h2>DevOps & Tools</h2>
        <p>
            <strong>CI/CD:</strong> GitHub Actions
        </p>
        <p>
            <strong>Monitoring:</strong> Prometheus, Grafana, Datadog
        </p>
        <p>
            <strong>Version Control:</strong> Git, GitHub, Bitbucket
        </p>
        <p>
            <strong>Cloud Platforms:</strong> AWS, Google Cloud, Azure
        </p>
        <p>
            <strong>API Tools:</strong> Postman, Swagger
        </p>
    </div>,
    <div key='4'>
        <h2>Current Learning & Interests</h2>
        <p>
            <strong>Learning:</strong> Machine Learning
        </p>
        <p>
            <strong>Interests:</strong> Blockchain, Microservices, AI-driven Applications
        </p>
        <p>
            <strong>Framework Exploration:</strong> Svelte, Solid.js, Astro
        </p>
        <p>
            <strong>Database:</strong> MySQL, MsSQL
        </p>
        <p>
            <strong>Plugins:</strong> ESLint, Prettier, Tailwind CSS
        </p>
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
                        // component='main'
                        // sx={{
                        //     flexGrow: 3,
                        //     // p: 3,
                        //     // ml: '120px',
                        //     // overflow: 'hidden',
                        // }}
                        >
                            {/* Your main content will go here */}
                            <GlassContainer>
                                {/* <p>
                                    <strong> Peter Eloy</strong>
                                </p> */}
                                <p>
                                    <strong>Dev |</strong> HTML, CSS, JS (JavaScript, ReactJS) & Go
                                </p>
                            </GlassContainer>

                            <StackedGlassContainers containers={stackedData} />
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
