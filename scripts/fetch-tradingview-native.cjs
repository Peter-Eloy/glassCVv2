const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const TRADINGVIEW_PROFILE_URL = 'https://www.tradingview.com/u/mr_uponly/';
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data', 'tradingview-ideas.json');

// Headers to mimic a real browser
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Connection': 'keep-alive',
};

function extractIdFromUrl(url) {
  // Extract ID from TradingView URL format
  const match = url.match(/\/([a-zA-Z0-9]+)-/);
  return match ? match[1] : Math.random().toString(36).substr(2, 9);
}

function extractSymbolFromText(text) {
  // Common crypto symbols
  const cryptoSymbols = ['BTC', 'ETH', 'LTC', 'DOGE', 'SOL', 'ADA', 'DOT', 'LINK', 'UNI', 'AVAX'];
  const fiatPairs = ['USD', 'USDT', 'EUR', 'GBP'];
  
  for (const symbol of cryptoSymbols) {
    for (const fiat of fiatPairs) {
      if (text.includes(`${symbol}${fiat}`) || text.includes(`${symbol}/${fiat}`)) {
        return `${symbol}${fiat}`;
      }
    }
  }
  
  // Fallback: look for any mention of crypto symbols
  for (const symbol of cryptoSymbols) {
    if (text.toUpperCase().includes(symbol)) {
      return `${symbol}USD`;
    }
  }
  
  return 'BTCUSD'; // Default fallback
}

function determineDirection(text) {
  const bullishKeywords = ['bull', 'long', 'buy', 'bullish', 'up', 'higher', 'breakout', 'pump'];
  const bearishKeywords = ['bear', 'short', 'sell', 'bearish', 'down', 'lower', 'breakdown', 'dump'];
  
  const lowerText = text.toLowerCase();
  
  const bullishCount = bullishKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const bearishCount = bearishKeywords.filter(keyword => lowerText.includes(keyword)).length;
  
  return bullishCount >= bearishCount ? 'Long' : 'Short';
}

function extractTimeframe(text) {
  const timeframes = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d', '3d', '1w', '1M'];
  const lowerText = text.toLowerCase();
  
  for (const tf of timeframes) {
    if (lowerText.includes(tf.toLowerCase())) {
      return tf.toUpperCase().replace('M', 'MO'); // Adjust month format
    }
  }
  
  // Look for time-related words
  if (lowerText.includes('daily') || lowerText.includes('day')) return '1D';
  if (lowerText.includes('weekly') || lowerText.includes('week')) return '1W';
  if (lowerText.includes('hourly') || lowerText.includes('hour')) return '1H';
  if (lowerText.includes('monthly') || lowerText.includes('month')) return '1M';
  
  return '1D'; // Default
}

async function scrapeTradingViewIdeas() {
  try {
    console.log('Fetching TradingView profile...');
    
    // Use Node.js built-in fetch (available in Node 18+)
    const response = await fetch(TRADINGVIEW_PROFILE_URL, {
      headers,
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const ideas = [];

    // Try multiple selectors to find ideas
    const selectors = [
      'a[href*="/chart/"]',
      '.tv-widget-idea__title-row a',
      '.tv-feed-layout__content a[href*="/chart/"]',
      '[data-name="ideas"] a[href*="/chart/"]'
    ];

    let foundIdeas = [];
    
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} potential ideas with selector: ${selector}`);
        elements.each((i, element) => {
          const href = $(element).attr('href');
          const text = $(element).text().trim();
          
          if (href && href.includes('/chart/') && text) {
            foundIdeas.push({
              url: href.startsWith('http') ? href : `https://www.tradingview.com${href}`,
              title: text,
              element: element
            });
          }
        });
        
        if (foundIdeas.length > 0) break;
      }
    }

    if (foundIdeas.length === 0) {
      console.log('No ideas found with standard selectors, trying broader search...');
      
      // Broader search for any chart links
      $('a').each((i, element) => {
        const href = $(element).attr('href');
        if (href && href.includes('/chart/') && href.includes('mr_uponly')) {
          const text = $(element).text().trim();
          if (text && text.length > 3) {
            foundIdeas.push({
              url: href.startsWith('http') ? href : `https://www.tradingview.com${href}`,
              title: text,
              element: element
            });
          }
        }
      });
    }

    console.log(`Processing ${Math.min(foundIdeas.length, 10)} ideas...`);

    // Process found ideas (limit to 10 most recent)
    for (let i = 0; i < Math.min(foundIdeas.length, 10); i++) {
      const ideaData = foundIdeas[i];
      const fullText = $(ideaData.element).closest('div').text() || ideaData.title;
      
      const idea = {
        id: extractIdFromUrl(ideaData.url),
        symbol: extractSymbolFromText(fullText),
        title: ideaData.title.length > 50 ? ideaData.title.substring(0, 50) + '...' : ideaData.title,
        timeframe: extractTimeframe(fullText),
        direction: determineDirection(fullText),
        description: `Analysis for ${extractSymbolFromText(fullText)}. ${ideaData.title}`,
        likes: Math.floor(Math.random() * 50) + 5, // Placeholder
        comments: Math.floor(Math.random() * 20) + 2, // Placeholder
        publishedDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        url: ideaData.url,
        image: `https://www.tradingview.com/x/${extractIdFromUrl(ideaData.url)}/`,
      };

      ideas.push(idea);
    }

    // If no real ideas found, create a fallback entry
    if (ideas.length === 0) {
      console.log('No ideas found, creating fallback entry...');
      ideas.push({
        id: 'fallback-' + Date.now(),
        symbol: 'BTCUSD',
        title: 'Latest TradingView Analysis',
        timeframe: '1D',
        direction: 'Long',
        description: 'Check out the latest trading ideas and analysis.',
        likes: 10,
        comments: 3,
        publishedDate: new Date().toISOString().split('T')[0],
        url: TRADINGVIEW_PROFILE_URL + '#published-charts',
        image: 'https://www.tradingview.com/favicon.ico',
      });
    }

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to file
    const outputData = {
      lastUpdated: new Date().toISOString(),
      total: ideas.length,
      ideas: ideas
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
    console.log(`✅ Successfully saved ${ideas.length} TradingView ideas to ${OUTPUT_FILE}`);
    
    // Log the ideas for debugging
    ideas.forEach((idea, index) => {
      console.log(`${index + 1}. ${idea.symbol} - ${idea.title} (${idea.direction})`);
    });

  } catch (error) {
    console.error('❌ Error scraping TradingView:', error.message);
    
    // Create fallback data on error
    const fallbackData = {
      lastUpdated: new Date().toISOString(),
      total: 1,
      ideas: [{
        id: 'error-fallback',
        symbol: 'BTCUSD',
        title: 'TradingView Profile - Check for Latest Ideas',
        timeframe: '1D',
        direction: 'Long',
        description: 'Visit the TradingView profile for the latest trading ideas and analysis.',
        likes: 0,
        comments: 0,
        publishedDate: new Date().toISOString().split('T')[0],
        url: TRADINGVIEW_PROFILE_URL + '#published-charts',
        image: 'https://www.tradingview.com/favicon.ico',
      }],
      error: error.message
    };

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fallbackData, null, 2));
    console.log('📝 Created fallback data due to scraping error');
  }
}

// Run the scraper
scrapeTradingViewIdeas();