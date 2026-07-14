// src/data/portfolio/portfolioCategories.js
// Single source of truth for portfolio categories/projects, shared by the
// desktop grid, desktop subcategory view, and mobile portfolio.

const portfolioCategories = [
  {
    id: "n00btrading",
    title: "n00b trading",
    description: "AI-powered trading tools and analysis systems",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "ai-news-bot",
        title: "AI News Trading Bot Analyst",
        description:
          "Automated trading analysis using AI-powered news sentiment and market data processing for informed trading decisions.",
        category: "Trading Bot",
        fullDescription: `An on-premise AI-powered news bot that fetches financial data and RSS feeds via a Flask Python server, processes them with JavaScript scripts, and uses n8n to orchestrate workflows and feed normalized inputs into a local LLMs hosted on Ollama.

        It generates concise, broadcast-style news bulletins and publishes them directly to Telegram.

        Upcoming enhancements include text-to-speech audio briefings and automated short-clip video generation in a news format.`,
        image: "/workflow-ai.webp",
        technologies: ["n8n", "Python", "JavaScript", "Ollama", "RSS", "Cron", "REST API"],
        features: [
          "Real-time news sentiment analysis",
          "Multi-source data aggregation",
          "Custom risk management",
          "Automated fetching system",
        ],
        liveUrl: "https://t.me/s/tradeTheCrypto",
      },
      {
        id: "indicators-tools",
        title: "Indicators & Trading Tools",
        description:
          "Custom technical analysis indicators and comprehensive trading tools designed for market analysis and strategy development.",
        category: "Trading Tools",
        fullDescription: `A comprehensive suite of Fibonacci, Moving Average, and Volatility indicators built for serious traders and analysts.

Includes static and dynamic Fibonacci retracement overlays, up to 20 fully configurable moving averages with cross and strength alerts, and ATR-adaptive Bollinger Bands featuring squeeze detection. All indicators offer custom timeframes, clean chart overlays, and extensive parameter controls.

Designed for both beginners and professional traders with personalizable interfaces, multi-timeframe support, and integrated backtesting capabilities.`,
        image: "/indicators-trader.webp",
        technologies: ["Pinescript"],
        features: [
          "Static & dynamic Fibonacci retracement levels",
          "Up to 20 customizable moving averages with cross alerts",
          "Relative Strength analysis on any MA",
          "ATR-based Bollinger Bands with squeeze detection",
          "Custom timeframes and adjustable parameters",
          "Built-in price and indicator alert system",
        ],
        liveUrl: "https://www.tradingview.com/u/mr_uponly/#published-scripts",
      },
    ],
  },
  {
    id: "api",
    title: "API Central",
    description: "API orchestration platforms and development tools",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "backend-apis",
        title: "Backend APIs Platform",
        description:
          "Self-hosted API orchestration hub that aggregates and manages data from 9+ external APIs via RapidAPI, with automated cron jobs and AI integration.",
        category: "API Platform",
        fullDescription: `A comprehensive Next.js-based API orchestration platform that serves as a centralized hub for managing and integrating multiple external APIs from RapidAPI Hub.

The platform aggregates data from 9+ job board APIs (ArbeitNow, JobsAPI14, Swiss Jobs, Adzuna, Google Jobs, Himalayas, LinkedIn, and more), providing unified endpoints for data access and management.

Features automated cron jobs for scheduled data syncing, AI-powered data processing using a local LLM (Qwen model via Lemonade Server), Gmail API integration for email automation, and comprehensive PDF processing capabilities.

Self-hosted on a Windows server with PostgreSQL database, NextAuth.js authentication, and automated deployment pipelines. The platform handles real-time data synchronization, contact extraction, email verification, and web scraping services.`,
        image: "/peview-image.jpg",
        technologies: [
          "Next.js 15",
          "PostgreSQL",
          "Prisma ORM",
          "NextAuth.js",
          "RapidAPI",
          "Node Cron",
          "Gmail API",
          "Qwen AI",
          "TypeScript",
          "Tailwind CSS",
        ],
        features: [
          "Integration with 9+ job board APIs via RapidAPI Hub",
          "Automated cron jobs for scheduled data synchronization",
          "AI-powered data processing with local LLM integration",
          "Gmail API integration for automated email workflows",
          "Real-time contact extraction and email verification",
          "PDF text extraction and generation services",
          "PostgreSQL database with Prisma ORM",
          "Self-hosted on Windows server with PM2 process manager",
          "Unified REST API endpoints for all integrated services",
          "Web scraping and data transformation pipelines",
        ],
        liveUrl: "https://api.petereloy.dev",
        githubUrl: "https://github.com/Peter-Eloy/be-apis",
      },
      {
        id: "mock-api-server",
        title: "Mock API Server",
        description:
          "Free, open-source desktop application for creating and testing REST APIs without writing backend code. Perfect for rapid prototyping and frontend development.",
        category: "Development Tool",
        fullDescription: `A free, open-source desktop application that enables developers to create and test REST APIs without writing any backend code. Designed specifically for frontend developers, QA testers, and anyone prototyping APIs.

The application runs quietly in the system tray, providing a no-code visual admin panel for defining API routes and responses. Supports both JSON data responses and static file serving, with flexible project organization for managing multiple endpoint collections.

Built with Python and Flask, packaged with PyInstaller for easy distribution. Operates on localhost:5000 by default, with installation and setup completed in seconds. No account creation required, fully offline capable.

Available as downloadable installers for both Windows (.exe) and macOS (.pkg) platforms, distributed under the MIT License via GitHub releases.`,
        image: "/peview-image.jpg",
        technologies: ["Python", "Flask", "PyInstaller"],
        features: [
          "System tray integration for background operation",
          "No-code visual admin panel for route configuration",
          "Flexible JSON responses and static file serving",
          "Project-based organization for multiple endpoints",
          "localhost:5000 default server with customizable port",
          "Quick setup - ready to use in seconds",
          "No account creation or authentication required",
          "Cross-platform installers for Windows and macOS",
          "MIT License - completely free and open-source",
        ],
        liveUrl: "https://peter-eloy.github.io/Landing-py-server/",
        githubUrl: "https://github.com/Peter-Eloy/py-server",
      },
    ],
  },
  {
    id: "wordpress",
    title: "WordPress Development",
    description: "Custom WordPress plugins and themes for real estate platforms",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "user-property-management",
        title: "User & Property Management Suite",
        description:
          "Advanced user role management and full property listing system built for the VisaVerde real estate platform.",
        category: "WordPress Plugin Suite",
        fullDescription: `Two companion plugins that form the operational core of the VisaVerde real estate platform.

The User Management plugin extends WordPress's native user system with role-based access control (RBAC), custom profile fields, and streamlined registration workflows for agents, property managers, administrators, and clients.

The Property Management plugin adds custom post types for listings, advanced taxonomy for property features, and sophisticated search/filtering. It handles agent-to-property assignment, status workflows, interactive galleries, Google Maps integration, and lead generation forms.`,
        image: "/peview-image.jpg",
        technologies: ["PHP", "WordPress", "MySQL", "JavaScript", "Google Maps API", "REST API"],
        features: [
          "Role-based access control (RBAC) with multi-level hierarchies",
          "Custom post types and taxonomy for property listings",
          "Advanced property search and filtering",
          "Agent-to-property assignment and status workflows",
          "Interactive galleries with Google Maps integration",
          "Lead generation and inquiry forms",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/UserManagment",
      },
      {
        id: "engagement-tools",
        title: "Engagement & Communication Tools",
        description:
          "PWA, social/contact integration, and print tooling that round out the client-facing side of VisaVerde.",
        category: "WordPress Plugin Suite",
        fullDescription: `A set of plugins focused on how visitors reach out and consume property listings on VisaVerde.

The PWA plugin turns the site into an installable, offline-capable app with push notifications and background sync for saved listings. The Social Media Contact plugin adds WhatsApp, Messenger, and email click-to-contact with lead tracking. The Universal Print plugin generates branded, print-ready PDF brochures and listing sheets on demand.`,
        image: "/peview-image.jpg",
        technologies: ["PHP", "WordPress", "Service Workers", "WhatsApp API", "PDF Libraries", "JavaScript"],
        features: [
          "Installable PWA with offline caching and push notifications",
          "WhatsApp / Messenger / email click-to-contact",
          "Lead tracking and contact analytics",
          "Automated PDF brochure and listing-sheet generation",
          "Batch printing with watermarking and branding",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-PWA",
      },
      {
        id: "maps-media-protection",
        title: "Maps & Media Protection",
        description:
          "Location-based property search plus automated image watermarking to protect listing photography.",
        category: "WordPress Plugin Suite",
        fullDescription: `Location and media-protection tooling for VisaVerde's property catalog.

The Maps plugin extends Google Maps with custom markers, clustering, drawing-tool area selection, and proximity search, letting buyers explore neighborhoods and nearby amenities. The Image Watermark plugin automatically applies branded watermarks on upload (with bulk support for the existing media library) and adds right-click protection, so listing photography can't be lifted by competitors.`,
        image: "/peview-image.jpg",
        technologies: ["PHP", "WordPress", "Google Maps API", "GD Library", "ImageMagick", "JavaScript"],
        features: [
          "Custom map markers with clustering for dense areas",
          "Drawing tools for area selection and proximity search",
          "Street view and geolocation integration",
          "Automatic watermarking on upload, with bulk processing",
          "Configurable watermark positioning, opacity, and branding",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-Maps",
      },
      {
        id: "visaverde-theme",
        title: "VisaVerde Custom Theme",
        description:
          "Fully responsive WordPress theme rebuilt from a legacy system for speed, usability, and modern design.",
        category: "WordPress Theme",
        fullDescription: `A custom-built WordPress theme for the VisaVerde real estate platform, combining modern aesthetics with high performance.

Inherited from a legacy system and completely refactored to improve site speed, usability, and workflow efficiency. Mobile-first responsive design with optimized asset loading, lazy loading, critical CSS inlining, and optimized JavaScript execution — built to hit strong Core Web Vitals scores while integrating seamlessly with all the custom VisaVerde plugins above.`,
        image: "/peview-image.jpg",
        technologies: ["PHP", "WordPress", "JavaScript", "CSS3", "HTML5", "jQuery"],
        features: [
          "Fully responsive mobile-first design",
          "Optimized Core Web Vitals performance",
          "Lazy loading and critical CSS inlining",
          "Advanced property search integration",
          "SEO-optimized, cross-browser structure",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-Theme",
      },
    ],
  },
  {
    id: "hobbies",
    title: "AI Products",
    description: "Indie AI products and multi-agent systems, built and shipped solo",
    image: "/peview-image.jpg",
    subcategories: [
      {
        id: "open-d",
        title: "Open-D",
        description:
          "AI health companion for Type 1 diabetes, built solo end-to-end and in private beta with real CGM users today.",
        category: "Indie Product",
        fullDescription: `Open-D is a mobile AI companion for people managing Type 1 diabetes, built solo end-to-end: product design, mobile app, backend, and CGM/pump hardware integrations.

The app connects to Dexcom and Abbott continuous glucose monitors to learn individual glucose patterns and surface proactive alerts before highs and lows occur, rather than passive after-the-fact tracking. It supports both MDI (multiple daily injections) and insulin pump therapy, including Medtronic MiniMed pump profiles, with a dosing calculator based on personal patterns, meal and workout planning with AI-driven coaching, and a night-time safety monitor with escalation alerts.

All health data is stored locally on-device rather than synced to the cloud, a deliberate architecture decision for a sensitive health data product. Currently in a closed beta with real users, refining the product based on live feedback ahead of a wider release.`,
        image: "/peview-image.jpg",
        technologies: ["React Native", "TypeScript", "CGM APIs (Dexcom, Abbott)", "Medtronic MiniMed", "On-device storage"],
        features: [
          "Dexcom & Abbott CGM integration",
          "Predictive high/low alerts",
          "MDI (multiple daily injections) support",
          "Insulin pump profiles (Medtronic MiniMed)",
          "Personalized insulin dosing calculator",
          "AI-driven meal and workout coaching",
          "Local-only, on-device data storage",
          "Night-time safety monitoring with escalation alerts",
        ],
        liveUrl: "https://open-d.app",
        status: "Private Beta",
      },
      {
        id: "medicina-open-d",
        title: "Nadie Sin Su Medicina",
        description:
          "Open-source platform that turns a patient denied medication into a formal complaint letter, built and shipped solo in days.",
        category: "Open Source",
        fullDescription: `Built after seeing a patient online say she'd been refused her diabetes medication, this is a small open-source platform to help patients push back.

A patient who's been denied insulin, test strips, CGM sensors, or other supplies creates a case. Supporters receive an email and sign in one click. Once a case reaches 50 signatures, the platform automatically generates a formal PDF complaint letter that the patient can hand to their health center, hospital, or the relevant authority.

Built and shipped solo in a short burst as a direct, practical response to a real problem rather than a portfolio exercise.`,
        image: "/peview-image.jpg",
        technologies: ["Next.js 14", "PostgreSQL (Neon)", "Drizzle ORM", "Resend", "pdf-lib", "Tailwind CSS"],
        features: [
          "Signature-collection campaigns per patient case",
          "Automatic formal PDF letter generation at 50 signatures",
          "Transactional email notifications",
          "Fully open source",
        ],
        liveUrl: "https://medicina.open-d.app",
        githubUrl: "https://github.com/noemi-paradise/medicina.open-d.app",
        status: "Live",
      },
      {
        id: "openclaw-ai-contrib",
        title: "Multi-Agent AI Platform (Open Source Contributor)",
        description:
          "Core contributor to OpenClaw.ai, an open-source multi-agent orchestration platform — agent memory architecture, context handling, and custom agent skills.",
        category: "Open Source",
        fullDescription: `OpenClaw.ai is an open-source multi-agent AI platform. I'm a core contributor, working directly on how the agents think and act rather than just building on top of them.

Contributions include core patches to the agent memory system (a 3-layer memory architecture) and context-handling fixes, plus standalone skills that extend what the agents can do: controlling a local LLM server (Lemonade Server), monitoring a Raspberry Pi's status, and finding Amazon products for affiliate workflows.

Hands-on experience with real multi-agent orchestration, agent memory design, and building tool integrations ("skills") that let LLM agents act on real systems — the same class of problem as production agent tooling.`,
        image: "/peview-image.jpg",
        technologies: ["TypeScript", "Multi-agent orchestration", "Local LLMs", "Lemonade Server"],
        features: [
          "3-layer agent memory system patches",
          "Context-handling fixes",
          "Custom skill: local LLM (Lemonade Server) control",
          "Custom skill: Raspberry Pi monitoring",
          "Custom skill: Amazon product finder",
        ],
        githubUrl: "https://github.com/noemi-paradise/openclaw-empire",
        status: "Open Source",
      },
    ],
  },
];

export default portfolioCategories;
