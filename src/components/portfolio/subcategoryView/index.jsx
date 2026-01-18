import { useState } from "react";
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import GlassContainer from "../../glassContainer";
import ProjectDetailModal from "../projectDetailModal";
import CustomPagination from "../../CustomPagination";
import { useTheme } from "../../../contexts";

const ITEMS_PER_PAGE = 6;

const categories = [
  {
    id: "n00btrading",
    title: "n00b trading",
    description: "AI-powered trading tools and analysis systems",
    subcategories: [
      {
        id: "ai-news-bot",
        title: "AI News Bot Analyst",
        description:
          "Automated trading analysis using AI-powered news sentiment and market data processing for informed trading decisions.",
        category: "Trading Bot",
        fullDescription: `An on-premise AI-powered news bot that fetches financial data and RSS feeds via a Flask Python server, processes them with JavaScript scripts, and uses n8n to orchestrate workflows and feed normalized inputs into a local LLMs hosted on Ollama.
        
        It generates concise, broadcast-style news bulletins and publishes them directly to Telegram.
        
        Upcoming enhancements include text-to-speech audio briefings and automated short-clip video generation in a news format.`,
        image: "/workflow-ai.webp",
        technologies: [
          "n8n",
          "Python",
          "JavaScript",
          "Ollama",
          "RSS",
          "Cron",
          "REST API",
        ],
        features: [
          "Real-time news sentiment analysis",
          "Multi-source data aggregation",
          "Custom risk management",
          "Automated fetching system",
        ],
        liveUrl: "https://t.me/s/tradeTheCrypto",
        // githubUrl: "https://github.com/peter-eloy/ai-trading-bot",
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
        // githubUrl: "https://github.com/peter-eloy/trading-indicators",
      },
      //EA trading bot
      //       {
      //         id: "eas",
      //         title: "EAs (Expert Advisors)",
      //         description:
      //           "Automated trading systems and expert advisors for MetaTrader platforms with advanced risk management features.",
      //         category: "Expert Advisor",
      //         fullDescription: `Professional-grade Expert Advisors (EAs) for MetaTrader 4 and 5 platforms with sophisticated trading algorithms.

      // Built with advanced risk management systems, these EAs can execute trades automatically based on predefined strategies and market conditions.

      // Features include dynamic lot sizing, multi-currency support, and comprehensive reporting systems for performance tracking.`,
      //         image: "/peview-image.jpg",
      //         technologies: [
      //           "MQL4",
      //           "MQL5",
      //           "C++",
      //           "Python",
      //           "MySQL",
      //           "API Integration",
      //         ],
      //         features: [
      //           "Multi-strategy trading algorithms",
      //           "Advanced risk management",
      //           "Dynamic position sizing",
      //           "Real-time market monitoring",
      //           "Performance analytics dashboard",
      //           "Cross-platform compatibility",
      //         ],
      //         liveUrl: "https://example.com/expert-advisors",
      //         githubUrl: "https://github.com/peter-eloy/mt4-expert-advisors",
      //       },
    ],
  },
  {
    id: "vscode",
    title: "VS Code Themes",
    description: "Custom themes for Visual Studio Code",
    subcategories: [
      {
        id: "dark-themes",
        title: "Dark Themes",
        description:
          "Elegant dark themes optimized for long coding sessions and reduced eye strain.",
      },
      {
        id: "light-themes",
        title: "Light Themes",
        description:
          "Clean and minimal light themes for enhanced readability and focus.",
      },
    ],
  },
  {
    id: "wordpress-plugins",
    title: "WordPress Plugins",
    description: "Custom plugins for the VisaVerde real estate platform",
    subcategories: [
      {
        id: "user-management",
        title: "User Management Plugin",
        description:
          "Advanced user management system with role-based access control and user profile customization for WordPress.",
        category: "WordPress Plugin",
        fullDescription: `A comprehensive user management plugin designed for WordPress platforms requiring advanced user administration capabilities.

The plugin extends WordPress's native user management with enhanced role-based access control (RBAC), custom user profile fields, and streamlined user registration workflows. Built for scalability and security, it handles multi-level user hierarchies and permissions.

Developed for the VisaVerde real estate platform, it manages agents, property managers, administrators, and clients with distinct permission sets and capabilities. Features include custom user meta fields, bulk user operations, and integration with external authentication systems.`,
        image: "/peview-image.jpg",
        technologies: ["PHP", "WordPress", "MySQL", "JavaScript", "REST API"],
        features: [
          "Role-based access control (RBAC) system",
          "Custom user profile fields and meta data",
          "Advanced user registration workflows",
          "Bulk user management operations",
          "Multi-level permission hierarchies",
          "Integration with WordPress REST API",
          "Secure authentication and authorization",
          "User activity logging and monitoring",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/UserManagment",
      },
      {
        id: "property-management",
        title: "Property Management Plugin",
        description:
          "Full-featured property listing and management system for real estate websites with advanced search and filtering.",
        category: "WordPress Plugin",
        fullDescription: `A powerful property management plugin designed for real estate platforms, enabling comprehensive property listing, search, and management capabilities.

The plugin provides a complete solution for managing real estate listings with custom post types for properties, advanced taxonomy for property features, and sophisticated search and filtering mechanisms. Supports multiple property types, locations, and custom attributes.

Built for the VisaVerde real estate platform, it handles property listings, agent assignments, property status workflows, and client inquiries. Features include interactive property galleries, Google Maps integration, and lead generation forms.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "MySQL",
          "JavaScript",
          "AJAX",
          "Google Maps API",
        ],
        features: [
          "Custom post types for property listings",
          "Advanced property search and filtering",
          "Property status workflow management",
          "Agent-to-property assignment system",
          "Interactive property image galleries",
          "Google Maps location integration",
          "Lead generation and inquiry forms",
          "Property comparison functionality",
          "Export and import property data",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/PropertyManagment",
      },
      {
        id: "universal-print",
        title: "Universal Print Plugin",
        description:
          "Flexible print management system for generating PDF documents and printable property listings from WordPress.",
        category: "WordPress Plugin",
        fullDescription: `A versatile print management plugin that provides comprehensive PDF generation and print formatting capabilities for WordPress content.

The plugin enables automatic generation of print-optimized layouts for posts, pages, and custom post types. Features template-based PDF generation with customizable headers, footers, and styling options.

Designed for the VisaVerde platform to generate professional property brochures, listing sheets, and documentation. Supports batch printing, watermarking, and brand customization for real estate marketing materials.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "PDF Libraries",
          "CSS",
          "JavaScript",
        ],
        features: [
          "Automated PDF generation from WordPress content",
          "Customizable print templates",
          "Batch printing for multiple listings",
          "Watermark and branding support",
          "Print-optimized layouts",
          "Header and footer customization",
          "Professional property brochure generation",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/universal-print",
      },
      {
        id: "social-media-contact",
        title: "Social Media Contact Plugin",
        description:
          "Social media integration and contact management plugin with WhatsApp, email, and social platform connectivity.",
        category: "WordPress Plugin",
        fullDescription: `A comprehensive social media integration plugin that connects WordPress sites with multiple social platforms and communication channels.

The plugin provides seamless integration with WhatsApp, Facebook Messenger, email systems, and other communication platforms. Features click-to-call, click-to-message, and social sharing functionality.

Built for the VisaVerde real estate platform to facilitate direct communication between potential buyers and property agents through their preferred channels. Includes lead tracking and contact analytics.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "WhatsApp API",
          "JavaScript",
          "REST API",
        ],
        features: [
          "WhatsApp click-to-message integration",
          "Multi-platform social media connectivity",
          "Click-to-call and click-to-email functionality",
          "Social sharing for property listings",
          "Contact form with social platform options",
          "Lead tracking and analytics",
          "Mobile-optimized contact buttons",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/SocialMediaContact",
      },
      {
        id: "visaverde-pwa",
        title: "VisaVerde PWA Plugin",
        description:
          "Progressive Web App functionality for WordPress, enabling offline access and mobile app-like experience.",
        category: "WordPress Plugin",
        fullDescription: `A Progressive Web App (PWA) plugin that transforms WordPress sites into installable, app-like experiences with offline capabilities.

The plugin implements service workers, manifest files, and caching strategies to enable offline browsing, push notifications, and home screen installation. Provides native app-like performance and user experience.

Developed for the VisaVerde real estate platform to allow users to browse properties offline, save favorites, and receive notifications about new listings. Improves mobile engagement and conversion rates.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "Service Workers",
          "JavaScript",
          "PWA APIs",
        ],
        features: [
          "Service worker implementation",
          "Offline content caching",
          "Home screen installation",
          "Push notification support",
          "App-like navigation experience",
          "Background sync for saved items",
          "Progressive image loading",
          "Mobile-optimized performance",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-PWA",
      },
      {
        id: "visaverde-maps",
        title: "VisaVerde Maps Plugin",
        description:
          "Advanced Google Maps integration with custom markers, property location visualization, and interactive map search.",
        category: "WordPress Plugin",
        fullDescription: `A feature-rich maps integration plugin providing advanced location-based property search and visualization capabilities.

The plugin extends Google Maps functionality with custom markers for property types, clustering for dense areas, and interactive map-based search. Supports drawing tools for area selection and proximity-based filtering.

Built for the VisaVerde real estate platform to enable users to search properties by location, view nearby amenities, and explore neighborhoods. Features include geolocation, route planning, and street view integration.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "Google Maps API",
          "JavaScript",
          "AJAX",
        ],
        features: [
          "Interactive property map with custom markers",
          "Map-based property search and filtering",
          "Property clustering for dense areas",
          "Drawing tools for area selection",
          "Proximity-based search functionality",
          "Street view integration",
          "Geolocation for nearby properties",
          "Neighborhood and amenity visualization",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-Maps",
      },
      {
        id: "image-watermark",
        title: "Image Watermark Protection",
        description:
          "Automated image watermarking and protection system to prevent unauthorized use of property photos.",
        category: "WordPress Plugin",
        fullDescription: `An intelligent image protection plugin that automatically applies watermarks to uploaded images and implements right-click protection.

The plugin processes images during upload to apply customizable watermarks with agency branding, preventing unauthorized use of property photography. Features bulk watermarking for existing media libraries.

Developed for the VisaVerde real estate platform to protect high-quality property images from being copied by competitors. Includes configurable watermark positioning, opacity, and brand customization options.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "GD Library",
          "ImageMagick",
          "JavaScript",
        ],
        features: [
          "Automatic watermark on image upload",
          "Bulk watermark existing media library",
          "Customizable watermark positioning and opacity",
          "Right-click protection for images",
          "Brand logo and text watermarks",
          "Selective watermarking by post type",
          "High-quality image processing",
          "Performance-optimized batch operations",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/Image-Watermark-Protection",
      },
    ],
  },
  {
    id: "wordpress-themes",
    title: "WordPress Themes",
    description: "Custom high-performance themes for real estate platforms",
    subcategories: [
      {
        id: "visaverde-theme",
        title: "VisaVerde Custom Theme",
        description:
          "Fully responsive WordPress theme designed for real estate platforms with optimized performance and modern design.",
        category: "WordPress Theme",
        fullDescription: `A custom-built WordPress theme specifically designed for the VisaVerde real estate platform, combining modern aesthetics with high performance.

The theme was inherited from a legacy system and completely refactored to improve site speed, usability, and workflow efficiency. Features a mobile-first responsive design with optimized asset loading and caching strategies.

Built with performance as a priority, the theme achieves excellent Core Web Vitals scores through lazy loading, critical CSS inlining, and optimized JavaScript execution. Integrates seamlessly with all custom VisaVerde plugins.

The design maintains the original visual identity while modernizing the user experience with improved navigation, faster search functionality, and streamlined property browsing workflows.`,
        image: "/peview-image.jpg",
        technologies: [
          "PHP",
          "WordPress",
          "JavaScript",
          "CSS3",
          "HTML5",
          "jQuery",
        ],
        features: [
          "Fully responsive mobile-first design",
          "Optimized Core Web Vitals performance",
          "Lazy loading for images and assets",
          "Critical CSS inlining",
          "Advanced property search integration",
          "Custom page templates for listings",
          "SEO-optimized structure",
          "Cross-browser compatibility",
          "Improved workflow and usability from legacy system",
          "Seamless integration with custom plugins",
        ],
        liveUrl: "https://www.visaverde.com",
        githubUrl: "https://github.com/Peter-Eloy/VisaVerde-Theme",
      },
    ],
  },
  {
    id: "api",
    title: "API Central",
    description: "API orchestration platforms and development tools",
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
];

const PortfolioSubcategoryView = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const category = categories.find((cat) => cat.id === categoryId);

  // Calculate pagination
  const totalItems = category?.subcategories?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSubcategories = category?.subcategories?.slice(startIndex, endIndex) || [];

  if (!category) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Category not found
        </Typography>
      </Box>
    );
  }

  const handleBackClick = () => {
    navigate("/portfolio");
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedProject(subcategory);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  // Reset to page 1 when category changes
  const previousCategoryId = React.useRef(categoryId);
  React.useEffect(() => {
    if (previousCategoryId.current !== categoryId) {
      setCurrentPage(1);
      previousCategoryId.current = categoryId;
    }
  }, [categoryId]);

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with back button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          gap: 2,
        }}
      >
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: isDarkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          {category.title}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          overflow: "hidden",
        }}
      >
        {paginatedSubcategories.map((subcategory, index) => (
          <GlassContainer
            key={subcategory.id}
            onClick={() => handleSubcategoryClick(subcategory)}
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              opacity: 0,
              animation: `subcategoryFadeIn 0.6s ease-out ${
                index * 0.1
              }s forwards`,
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: isDarkMode
                  ? "0 12px 40px rgba(255, 255, 255, 0.15)"
                  : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
              "@keyframes subcategoryFadeIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(30px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                color: isDarkMode ? "#fff" : "#000",
              }}
            >
              {subcategory.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(0, 0, 0, 0.8)",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                px: 1,
              }}
            >
              {subcategory.description}
            </Typography>
          </GlassContainer>
        ))}
      </Box>

      {/* Custom Pagination with Navigation Arrows */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showArrows={true}
      />

      <ProjectDetailModal
        open={modalOpen}
        onClose={handleModalClose}
        project={selectedProject}
      />
    </Box>
  );
};

export default PortfolioSubcategoryView;
