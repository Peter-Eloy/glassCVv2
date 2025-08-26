// TradingView service for fetching published ideas
const TRADINGVIEW_BASE_URL = 'https://www.tradingview.com';
const PROFILE_USERNAME = 'mr_uponly';
const DATA_FILE_URL = '/data/tradingview-ideas.json';

// Fallback data in case JSON file is not available
const fallbackIdeas = [
  {
    id: 'h8eZypT1',
    symbol: 'LTCUSD',
    title: 'LTC working on the breakout',
    timeframe: '1D',
    direction: 'Long',
    description: 'Litecoin is forming a strong bullish pattern with potential breakout above key resistance levels.',
    likes: 15,
    comments: 8,
    publishedDate: '2025-01-10',
    url: 'https://www.tradingview.com/chart/LTCUSD/h8eZypT1-LTC-working-on-the-breakout/',
    image: `${TRADINGVIEW_BASE_URL}/x/h8eZypT1/`,
  },
];

class TradingViewService {
  constructor() {
    this.baseUrl = TRADINGVIEW_BASE_URL;
    this.username = PROFILE_USERNAME;
    this.cachedData = null;
    this.lastFetch = null;
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  }

  // Fetch ideas from JSON file (updated by GitHub Actions)
  async fetchIdeasFromFile() {
    try {
      console.info("📈 Fetching TradingView ideas from static JSON file - this site is 100% serverless and proud of it!");
      console.table({ "Data Source": "Static JSON", "Update Method": "GitHub Actions", "Architecture": "JAMstack" });
      
      // Add cache busting to ensure fresh data
      const cacheBuster = Date.now();
      const response = await fetch(`${DATA_FILE_URL}?t=${cacheBuster}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!data.ideas || !Array.isArray(data.ideas)) {
        throw new Error('Invalid data structure in JSON file');
      }
      
      console.info("💡 TradingView ideas loaded!", { 
        totalIdeas: data.ideas.length, 
        lastUpdated: data.lastUpdated,
        source: "GitHub Actions automation"
      });
      
      return data;
    } catch (error) {
      console.warn('Failed to fetch TradingView data from file:', error.message);
      console.info("🛡️ No worries! Falling back to hardcoded data - resilience is our middle name!");
      
      // Return fallback data
      return {
        lastUpdated: new Date().toISOString(),
        total: fallbackIdeas.length,
        ideas: fallbackIdeas,
        error: 'Using fallback data',
      };
    }
  }

  // Get published ideas with caching
  async getPublishedIdeas(page = 1, limit = 6) {
    try {
      // Check cache first
      const now = Date.now();
      if (this.cachedData && this.lastFetch && (now - this.lastFetch) < this.cacheTimeout) {
        console.info("🏎️ TradingView cache is still fresh! Serving trading ideas at lightning speed!");
        return this.paginateIdeas(this.cachedData, page, limit);
      }

      // Fetch fresh data
      const data = await this.fetchIdeasFromFile();
      
      // Update cache
      this.cachedData = data;
      this.lastFetch = now;
      
      return this.paginateIdeas(data, page, limit);
    } catch (error) {
      console.error('Error fetching TradingView ideas:', error);
      
      // Return fallback data on error
      const fallbackData = {
        ideas: fallbackIdeas,
        total: fallbackIdeas.length,
      };
      
      return this.paginateIdeas(fallbackData, page, limit);
    }
  }

  // Paginate ideas data
  paginateIdeas(data, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedIdeas = data.ideas.slice(startIndex, endIndex);

    return {
      ideas: paginatedIdeas,
      total: data.total || data.ideas.length,
      page,
      totalPages: Math.ceil((data.total || data.ideas.length) / limit),
      lastUpdated: data.lastUpdated,
    };
  }

  // Get a specific idea by ID
  async getIdeaById(ideaId) {
    try {
      const data = await this.fetchIdeasFromFile();
      const idea = data.ideas.find(idea => idea.id === ideaId);
      return idea || null;
    } catch (error) {
      console.error('Error fetching TradingView idea:', error);
      return fallbackIdeas.find(idea => idea.id === ideaId) || null;
    }
  }

  // Get user profile URL
  getUserProfileUrl() {
    return `${this.baseUrl}/u/${this.username}/#published-charts`;
  }

  // Open idea in new tab
  openIdea(ideaUrl) {
    window.open(ideaUrl, '_blank', 'noopener,noreferrer');
  }

  // Format idea data for display
  formatIdeaForDisplay(idea) {
    return {
      id: idea.id,
      title: `${idea.symbol} - ${idea.title}`,
      excerpt: idea.description,
      cleanExcerpt: idea.description,
      url: idea.url,
      image: idea.image,
      metadata: {
        symbol: idea.symbol,
        timeframe: idea.timeframe,
        direction: idea.direction,
        likes: idea.likes,
        comments: idea.comments,
        publishedDate: idea.publishedDate,
      },
    };
  }

  // Clear cache (useful for testing)
  clearCache() {
    this.cachedData = null;
    this.lastFetch = null;
  }
}

export const tradingViewService = new TradingViewService();