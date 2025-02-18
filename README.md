# GlassCV V2

### Visitor Stats:

[![GitHub Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Peter-Eloy/glassCVv2&count_bg=%231E88E5&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=GitHub%20Visitors&edge_flat=false)](https://github.com/Peter-Eloy/glassCVv2)

[![Website Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://petereloy.dev/website-only&count_bg=%2379C83D&title_bg=%23555555&icon=netlify.svg&icon_color=%23E7E7E7&title=Website%20Visitors&edge_flat=false)](https://petereloy.dev)

[![Total Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://petereloy.dev&count_bg=%23FF9800&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=All%20Visitors&edge_flat=false)](https://petereloy.dev)


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
│   │   ├── 📁 layout/           # Layout components
│   │   ├── 📁 menu/             # Navigation menu
│   │   ├── 📁 menuButton/       # Menu toggle button
│   │   ├── 📁 mobileLandingPage/# Mobile-specific landing page
│   │   ├── 📁 sidebar/          # Sidebar navigation
│   │   ├── 📁 stackedGlassContainers/ # Stacked glass effect containers
│   │   └── 📁 welcomeExperience/# Onboarding experience components
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
│   │   └── 📁 proSnapshot/      # Professional summary
│   │
│   ├── 📁 pages/                # Page components
│   │   ├── 📁 blog/             # Blog page
│   │   ├── 📁 jobsDashboard/    # Jobs dashboard
│   │   ├── 📁 main/             # Main landing page
│   │   └── 📁 skills/           # Skills showcase page
│   │
│   ├── 📁 routes/               # Application routing
│   │   ├── 📁 blog/             # Blog-specific routes
│   │   ├── 📁 portfolio/        # Portfolio routes
│   │   └── index.jsx            # Main routing configuration
│   │
│   ├── 📁 services/             # API services
│   │   ├── 📁 api/              # General API services
│   │   │   ├── chat.jsx         # Chat API integration
│   │   │   └── config.js        # API configuration
│   │   ├── 📁 github/           # GitHub API integration
│   │   │   └── cv.jsx           # CV fetching from GitHub
│   │   └── 📁 tumblr/           # Tumblr API integration
│   │       ├── config.js        # Tumblr configuration
│   │       └── index.jsx        # Tumblr service methods
│   │
│   ├── 📁 styles/               # Global styles
│   │   └── glassEffects.jsx     # Glass-morphism styling
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

- **React**: For building the UI.
- **CSS**: For styling and layout.
- **JSX**: To combine JavaScript and HTML for dynamic components.

## 🎨 Features

- **Glassmorphic Design**: Smooth and modern glass-style UI.
- **Modular Architecture**: Easy-to-understand components for quick edits and updates.
- **Customizable Data**: Swap out JSON files in `/data` to update CV information effortlessly.

## 🛠️ Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/GlassCVV2.git
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the project**:

   ```bash
   npm run dev
   ```

4. **Open in your browser**:  
   Navigate to `http://localhost:3000/`.

## 🤝 Contributions

Feel free to fork the project, open issues, or submit pull requests. Suggestions are always welcome!

## 📄 License

This project is licensed under [MIT License](LICENSE).

---
