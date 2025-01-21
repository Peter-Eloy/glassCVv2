import './App.css'
import AppMenu from './components/menu'
import Sidebar from './components/sidebar'
import FloatingButton from './components/floatingButton'
import Footer from './components/footer'
import { Box, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider } from './contexts/index'
import GlassContainer from './components/GlassContainer'
import StackedGlassContainers from './components/stackedGlassContainers'

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

const careerData = [
    <div key='1'>
        <h1>Professional Experience</h1>
    </div>,
    <div key='2'>
        <h2>Jr. Dev & PM</h2>
        <p>
            <strong>Duration:</strong> Nov 2017 - Feb 2024 · 6 yrs 4 mos
        </p>
        <p>
            I have great expertise in creating web applications using a variety of modern technologies. I am also very adequate in maintaining websites and
            mobile apps as I am an expert in using WordPress, WooCommerce, PHP, JavaScript, and HTML/CSS. I always focus on producing high quality and
            module-oriented SEO-friendly codes.
        </p>
    </div>,
    <div key='3'>
        <h2>Web Developer</h2>
        <p>
            <strong>Duration:</strong> Aug 2019 - Feb 2024 · 4 yrs 7 mos
        </p>
        <p>
            Website development using PHP, JS (JavaScript), CSS, and HTML. Very good knowledge using pure code but also able to work with different CMS (Content
            Management Systems) such as WordPress (WP) or GoogleSite.
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
                                    <StackedGlassContainers containers={stackedData} />
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
