# GlassCV V2

### Visitor Stats:

[![GitHub Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Peter-Eloy/glassCVv2&count_bg=%231E88E5&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=GitHub%20Visitors&edge_flat=false)](https://github.com/Peter-Eloy/glassCVv2)  -  [![Website Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://petereloy.dev/website-only&count_bg=%2379C83D&title_bg=%23555555&icon=netlify.svg&icon_color=%23E7E7E7&title=Website%20Visitors&edge_flat=false)](https://petereloy.dev)  -  [![Total Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://petereloy.dev&count_bg=%23FF9800&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=All%20Visitors&edge_flat=false)](https://petereloy.dev)






Welcome to **GlassCV V2**, a React project showcasing a sleek and interactive CV. This repository combines modern design and clean code structure to create a seamless user experience.

## 📁 Project Structure

```
glassCVv2/
├── 📁 .github/
│   └── 📁 workflows/
│       └── cv-release.yml       # GitHub Actions workflow for CV releases
│
├── 📁 public/                   # Static public assets
│   └── peview-image.jpg
│
├── 📁 src/                      # Source code
│   ├── 📁 assets/               # Static assets for the app
│   │   └── react.svg
│   │
│   ├── 📁 components/           # Reusable UI components
│   │   ├── 📁 blogPostDialog/   # Blog post modal component
│   │   ├── 📁 chatComponent/    # AI chat interface
│   │   ├── 📁 consoleMessage/   # Console messages for developers
│   │   ├── 📁 cvDownloadButton/ # CV download functionality
│   │   ├── 📁 floatingButton/   # Floating action button
│   │   ├── 📁 footer/           # Page footer
│   │   ├── 📁 glassContainer/   # Glass-morphism container component
│   │   ├── 📁 layout/           # Layout components (RootLayout, MobileLayout)
│   │   ├── 📁 menu/             # Navigation menu
│   │   ├── 📁 menuButton/       # Menu toggle button
│   │   ├── 📁 mobileLandingPage/# Mobile-specific landing page
│   │   ├── 📁 portfolio/        # Portfolio section
│   │   │   ├── 📁 categoryCard/ # Portfolio category cards
│   │   │   ├── 📁 subcategoryView/ # Portfolio subcategory view with routing
│   │   │   └── index.jsx        # Main portfolio component
│   │   ├── 📁 sidebar/          # Sidebar navigation
│   │   ├── 📁 siteVisitorCounter/ # Site visitor statistics
│   │   ├── 📁 skillsChecklist/  # Skills display component
│   │   ├── 📁 stackedGlassContainers/ # Stacked glass effect containers
│   │   ├── 📁 underConstruction/ # Under construction placeholder
│   │   └── 📁 welcomeExperience/ # Onboarding experience (LoadingStage, WelcomeGuide)
│   │
│   ├── 📁 contexts/             # React context providers
│   │   ├── index.jsx            # Theme context
│   │   └── welcomeContext.jsx   # Welcome experience state
│   │
│   ├── 📁 data/                 # Static data files
│   │   ├── 📁 aptitudes/        # Skills and abilities data
│   │   ├── 📁 carrerData/       # Career information
│   │   ├── 📁 education/        # Education history
│   │   ├── 📁 education2/       # Additional education details
│   │   ├── 📁 languages/        # Language proficiency
│   │   ├── 📁 proSnapshot/      # Professional summary
│   │   └── 📁 skills/           # Skills data (JSON format)
│   │
│   ├── 📁 pages/                # Page components
│   │   ├── 📁 blog/             # Blog page with Tumblr integration
│   │   ├── 📁 main/             # Main landing page
│   │   └── 📁 skills/           # Skills showcase page
│   │
│   ├── 📁 routes/               # Application routing
│   │   └── index.jsx            # Main routing configuration
│   │
│   ├── 📁 services/             # API services
│   │   ├── 📁 api/              # General API services
│   │   │   ├── chat.jsx         # Chat API integration
│   │   │   └── config.js        # API configuration
│   │   ├── 📁 github/           # GitHub API integration
│   │   │   └── cv.jsx           # CV fetching from GitHub
│   │   ├── 📁 tumblr/           # Tumblr API integration
│   │   │   ├── config.js        # Tumblr configuration
│   │   │   └── index.jsx        # Tumblr service methods
│   │   └── index.jsx            # Service exports
│   │
│   ├── 📁 styles/               # Global styles
│   │   ├── glassEffects.jsx     # Glass-morphism styling
│   │   └── navigationArrows.jsx # Navigation arrow components
│   │
│   ├── 📁 utils/                # Utility functions
│   │   └── FaviconChanger.jsx   # Dynamic favicon manipulation
│   │
│   ├── App.css                  # App-wide styles
│   ├── App.jsx                  # Main App component
│   ├── DesktopApp.jsx           # Desktop-specific App component
│   ├── index.css                # Global CSS
│   └── main.jsx                 # Application entry point
│
├── 📁 cv/                       # CV PDF files
│   ├── Peter_Eloy_CV_DE.pdf     # German CV
│   ├── Peter_Eloy_CV_EN.pdf     # English CV
│   └── Peter_Eloy_CV_ES.pdf     # Spanish CV
│
├── .env.development             # Development environment variables
├── .env.production              # Production environment variables
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies and scripts
├── README.md                    # Project documentation
└── vite.config.js               # Vite configuration
```


## 💻 Technologies Used

- **React 18**: Modern React framework
- **Material-UI**: Component library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **Axios**: HTTP client

## 🎨 Features

- **Glassmorphic Design**: Modern glass-style UI
- **Responsive Layout**: Mobile and desktop optimized
- **Portfolio System**: Categorized project showcase
- **Blog Integration**: Dynamic content from Tumblr
- **Theme Switching**: Light and dark modes
- **Welcome Experience**: First-time visitor guide

## 🛠️ Getting Started

1. **Clone the repo**:
   ````bash
   git clone https://github.com/your-username/GlassCVV2.git
   ````

2. **Install dependencies**:
   ````bash
   npm install
   ````

3. **Run the project**:
   ````bash
   npm run dev
   ````

4. **Open in your browser**:  
   Navigate to `http://localhost:5173/`.

## 🤝 Contributions

Feel free to fork the project, open issues, or submit pull requests. Suggestions are always welcome!

## 📄 License

This project is licensed under [MIT License](LICENSE).

---
