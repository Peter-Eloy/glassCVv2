import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '../ThemeContext'
import GlassContainer from '../GlassContainer'
import { XOutlined, LinkedinOutlined, GithubOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons'
import StackedGlassContainers from '../StackedGlassContainers'

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
        <h3>Frontend Dev</h3>
        <p>ReactJS, MUI, Ant Design</p>
    </div>,
    <div>
        <h3>Frontend Tech</h3>
        <p>JavaScript, HTML, CSS</p>
    </div>,
    <div>
        <h3>Backend Dev</h3>
        <p>Go (Golang), MySQL</p>
    </div>,
    <div>
        <h3>Dev Tools</h3>
        <p>Postman, DBeaver, TomCat</p>
    </div>,
    <div>
        <h3>Web Hosting</h3>
        <p>WordPress, cPanel, Plesk</p>
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

const education = [
    <div>
        <h2>Education</h2>
    </div>,
    <div>
        <h3>Certifications</h3>
        <p>Isaac Newton Association Diploma for Mathematical Talent</p>
        <p>Degree in Economic and Business Sciences</p>
    </div>,
    <div>
        <h3>Honors & Awards</h3>
        <p>Economic Thought</p>
        <p>Concepts and Approaches in Economic Science</p>
    </div>,
    <div>
        <h3>Publications</h3>
        <p>Social science papers on my university site</p>
    </div>,
]

const education2 = [
    <div>
        <h2>Education & Achievements</h2>
    </div>,
    <div>
        <h3>Certifications</h3>
        <p>Isaac Newton Association Diploma for Mathematical Talent</p>
        <p>Licenciatura in Economic and Business Sciences (Equivalent to Bachelor + Master)</p>
    </div>,
    <div>
        <h3>Honors & Awards</h3>
        <p>Economic Thought</p>
        <p>Concepts and Approaches in Economic Science</p>
    </div>,
    <div>
        <h3>Publications</h3>
        <p>Social science articles on my university site</p>
    </div>,
    <div>
        <h3>Languages</h3>
        <p>English (Professional Working)</p>
        <p>German (Native or Bilingual)</p>
        <p>Spanish (Native or Bilingual)</p>
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
                    borderRight: `0px solid ${borderColor}`,
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
                {/* <StackedGlassContainers containers={languages} />
                <StackedGlassContainers containers={education} /> */}
                <StackedGlassContainers containers={education2} />
            </List>
        </Drawer>
    )
}

export default Sidebar
